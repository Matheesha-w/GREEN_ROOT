const Question = require('../model/QuestionModel');
const User = require('../model/userModel');
const Order = require('../../customer/model/orderModel');
// bulkOrder
const BulkOrder = require('../../seller/model/bulkOrderModel');

const XLSX = require('xlsx');

const getAllQuestionsForExcel = async (req, res) => {
    try {
        const questions = await Question.find()
            .populate('createdBy', 'firstName lastName email')
            .populate('replies.adminId', 'email') // Populate admin emails
            .lean();

        const formatted = [];

        questions.forEach(q => {
            if (q.replies.length === 0) {
                formatted.push({
                    Title: q.title,
                    Custom_Title: q.customTitle || '',
                    Message: q.message,
                    Created_By: `${q.createdBy?.firstName || ''} ${q.createdBy?.lastName || ''}`,
                    Email: q.createdBy?.email || '',
                    Created_At: new Date(q.createdAt).toLocaleString(),
                    Is_Closed: q.isClosed ? 'Yes' : 'No',
                    Admin_Reply: 'No replies',
                    Admin_Email: ''
                });
            } else {
                q.replies.forEach(reply => {
                    formatted.push({
                        Title: q.title,
                        Custom_Title: q.customTitle || '',
                        Message: q.message,
                        Created_By: `${q.createdBy?.firstName || ''} ${q.createdBy?.lastName || ''}`,
                        Email: q.createdBy?.email || '',
                        Created_At: new Date(q.createdAt).toLocaleString(),
                        Is_Closed: q.isClosed ? 'Yes' : 'No',
                        Admin_Reply: reply.message,
                        Admin_Email: reply.adminId?.email || ''
                    });
                });
            }
        });

        const worksheet = XLSX.utils.json_to_sheet(formatted);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'QuestionsWithReplies');

        const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });

        res.setHeader('Content-Disposition', 'attachment; filename="questions_with_replies.xlsx"');
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.send(buffer);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed' });
    }
};


// get user details for the excel sheet
const getUserForExcel = async (req, res) => {
    try {
        const users = await User.find().lean();

        // role count
        const roleCounts = {};
        users.forEach(user => {
            roleCounts[user.role] = (roleCounts[user.role] || 0) + 1;
        });

        const summaryCount = Object.entries(roleCounts).map(([role, count]) => ({
            Role: role.charAt(0).toUpperCase() + role.slice(1),
            Count: count
        }))

        // user infor
        const userInfo = users.map(user => ({
            First_Name: user.firstName,
            Last_Name: user.lastName,
            Email: user.email,
            Phone: user.phone,
            Address: user.address,
            Role: user.role.charAt(0).toUpperCase() + user.role.slice(1),
            Status: user.status,
            Created_At: new Date(user.createdAt).toLocaleString()
        }))

        // workbook
        const workbook = XLSX.utils.book_new();

        // role summary
        const roleSheet = XLSX.utils.json_to_sheet(summaryCount);
        XLSX.utils.book_append_sheet(workbook, roleSheet, "RoleSummary");

        // user info sheet
        const userInfroSheet = XLSX.utils.json_to_sheet(userInfo);
        XLSX.utils.book_append_sheet(workbook, userInfroSheet, "UserInfromation");

        // generate excel file
        const buffer = XLSX.write(workbook, {
            type: 'buffer',
            bookType: 'xlsx'
        });

        res.setHeader('Content-Disposition', 'attachment; filename="user_report.xlsx"');
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.send(buffer);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Faild to generate a report` });
    }
};

// order report
const getSalse = async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: 1 }).lean();

        const salesData = orders.map(order => ({
            date: new Date(order.createdAt).toISOString().split('T')[0],
            finalTotal: order.finalTotal || 0,
        }));

        res.status(200).json({ data: salesData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch sales data" });
    }
};

// get sales for excel 
const getSalesForExcel = async (req, res) => {
    try {
        const orders = await Order.find().lean();

        const sellerSales = {};

        orders.forEach(order => {
            if (Array.isArray(order.cartItems)) {
                order.cartItems.forEach(item => {
                    const sellerId = item.sellerId || 'Unknown';
                    const total = item.totalPrice || 0;

                    if (!sellerSales[sellerId]) {
                        sellerSales[sellerId] = 0;
                    }
                    sellerSales[sellerId] += total;
                });
            }
        })

        const excelData = Object.entries(sellerSales).map(([sellerId, totalSales]) => ({
            Seller_ID: sellerId,
            Total_Sales: parseFloat(totalSales.toFixed(2))
        }));

        const workbook = XLSX.utils.book_new();
        const sheet = XLSX.utils.json_to_sheet(excelData);
        XLSX.utils.book_append_sheet(workbook, sheet, 'SalesBySeller');

        const buffer = XLSX.write(workbook, {
            type: 'buffer',
            bookType: 'xlsx'
        });

        res.setHeader('Content-Disposition', 'attachment; filename="sales_by_seller.xlsx"');
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.send(buffer);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to generate Excel file' });
    }
}

// get bulck orders over time
const getBulkOrdersOverTime = async (req, res) => {
    try {
        const orders = await BulkOrder.aggregate([
            {
                $match: {
                    paymentStatus: 'Completed' // Only completed orders
                }
            },
            {
                $group: {
                    _id: {
                        year: { $year: '$createdAt' },
                        month: { $month: '$createdAt' }
                    },
                    totalPayment: { $sum: '$paymentAmount' },
                    totalOrders: { $sum: 1 }
                }
            },
            {
                $sort: { '_id.year': 1, '_id.month': 1 }
            }
        ]);

        const formatted = orders.map(item => ({
            month: `${item._id.year}-${String(item._id.month).padStart(2, '0')}`,
            totalOrders: item.totalOrders,
            totalPayment: item.totalPayment
        }));

        res.status(200).json({ data: formatted });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch bulk order report.' });
    }
};

// bulk orders for excel
const getBulkOrdersForExcel = async (req, res) => {
    try {
        const bulkOrders = await BulkOrder.find({ paymentStatus: 'Completed' }).lean();

        const formatted = bulkOrders.map(order => ({
            Order_ID: order._id.toString(),
            Seller_ID: order.sellerId?.toString() || 'N/A',
            Buyer_ID: order.buyerId?.toString() || 'N/A',
            Payment_Amount: order.paymentAmount || 0,
            Payment_Status: order.paymentStatus,
            Created_At: new Date(order.createdAt).toLocaleString(),
        }));

        const workbook = XLSX.utils.book_new();
        const sheet = XLSX.utils.json_to_sheet(formatted);
        XLSX.utils.book_append_sheet(workbook, sheet, 'BulkOrders');

        const buffer = XLSX.write(workbook, {
            type: 'buffer',
            bookType: 'xlsx',
        });

        res.setHeader('Content-Disposition', 'attachment; filename="bulk_orders.xlsx"');
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.send(buffer);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to generate bulk orders Excel report' });
    }
};

const getBulkOrdersForFilter = async (req, res) => {
    try {
        const now = new Date();
        const year = parseInt(req.query.year) || now.getFullYear();
        const month = parseInt(req.query.month) || now.getMonth() + 1;

        if (month < 1 || month > 12) {
            return res.status(400).json({ message: 'Invalid month. Must be between 1 and 12.' });
        }

        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0, 23, 59, 59, 999);

        const bulkOrders = await BulkOrder.find({
            paymentStatus: 'Completed',
            createdAt: {
                $gte: startDate,
                $lte: endDate
            }
        }).lean();

        const formatted = bulkOrders.map(order => ({
            Order_ID: order._id.toString(),
            Seller_ID: order.sellerId?.toString() || 'N/A',
            Buyer_ID: order.buyerId?.toString() || 'N/A',
            Payment_Amount: order.paymentAmount || 0,
            Payment_Status: order.paymentStatus,
            Created_At: new Date(order.createdAt).toLocaleString(),
        }));

        const workbook = XLSX.utils.book_new();
        const sheet = XLSX.utils.json_to_sheet(formatted);
        XLSX.utils.book_append_sheet(workbook, sheet, `BulkOrders_${year}_${month}`);

        const buffer = XLSX.write(workbook, {
            type: 'buffer',
            bookType: 'xlsx',
        });

        res.setHeader('Content-Disposition', `attachment; filename="bulk_orders_${year}_${month}.xlsx"`);
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.send(buffer);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to generate bulk orders Excel report' });
    }
};


module.exports = {
    getAllQuestionsForExcel,
    getUserForExcel,
    getSalse,
    getSalesForExcel,
    getBulkOrdersOverTime,
    getBulkOrdersForExcel,
    getBulkOrdersForFilter,

}