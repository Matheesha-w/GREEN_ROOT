const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const PDFDocument = require("pdfkit");
const path = require("path");

const ORDER = require("../../seller/model/bulkOrderModel");

//Get all Orders

const allOrders = async (req, res) => {
  try {
    const order = await ORDER.find({});

    if (!order) {
      res.status(404).json({ msg: "unsuccess" });
      return;
    }

    res.status(200).json({ msg: "Success", data: order });
  } catch (e) {
    res.status(500).json({ msg: "Server error", error: e.message });
  }
};

//get Orders accoding to the parameters

const OrdersByParams = async (req, res) => {
  try {
    const order = await ORDER.find(req.body);

    if (order.length <= 0) {
      res.status(404).json({ msg: "Not found!" });
      return;
    }

    res.status(200).json({ msg: "Success", data: order });
  } catch (e) {
    res.status(500).json({ msg: "Server error", error: e.message });
  }
};

//Get a single Orders

const OrdersById = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await ORDER.findById(id);
    if (!order) {
      res.status(404).json({ msg: "Category not found!" });

      return;
    }

    res.status(200).json({ msg: "Success", data: order });
  } catch (e) {
    res.status(500).json({ msg: "Server error", error: e.message });
  }
};

//Update Orders

const updateOrders = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await ORDER.findByIdAndUpdate(id, req.body, { new: true });
    if (!order) {
      res.status(404).json({ msg: "Order not Updated!" });

      return;
    }

    res.status(200).json({ msg: "Update Successful", data: order });
  } catch (e) {
    res.status(500).json({ msg: "Server error", error: e.message });
  }
};

//email conformation
const emailSender = (req, res) => {
  try {
    const { id, status, email } = req.body;

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "greenrootp@gmail.com",
        pass: "weifglbjhwgzofym",
      },
    });

    let mailOptions = {
      from: "greenrootp@gmail.com",
      to: email,
      subject: "Greenroot Bulk order management",
      text: `orderID: ${id}     status: ${status}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        res.status(400).json({ state: "Not sent", msg: error });
      } else {
        console.log("Email sent: " + info.response);
        res.status(200).json({ state: "Email sent", msg: info.response });
      }
    });
  } catch (e) {
    res.status(500).json({ msg: "Server error", error: e.message });
  }
};

//PDF invoice

const docInvoice = async (req, res) => {
  const { orderId } = req.params;
  const { customerF, customerL, orderItems, TotalPrice } = req.body;

  // Replace with real DB query
  const invoiceData = {
    orderId,
    customer: `${customerF}  ${customerL}`,
    date: new Date().toLocaleDateString(),
    items: orderItems,
    totalPr: TotalPrice,
  };

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `inline; filename=invoice-${orderId}.pdf`
  );

  const doc = new PDFDocument({ margin: 50 });

  doc.pipe(res);

  // === Logo ===
  const logoPath = path.join(__dirname, "../assets/Greenroots-logo-color.png");
  doc.image(logoPath, 50, 45, { width: 100 });

  // === Title ===
  doc
    .fontSize(20)
    .text("Invoice", 200, 50, { align: "right" })
    .fontSize(10)
    .text(`Order ID: ${invoiceData.orderId}`, { align: "right" })
    .text(`Date: ${invoiceData.date}`, { align: "right" });

  doc.moveDown(2);

  // === Customer Info ===
  doc
    .fontSize(12)
    .text(`Customer Name: ${invoiceData.customer}`, { align: "left" });

  doc.moveDown();

  // === Table Header ===
  doc
    .fontSize(12)
    .fillColor("#000")
    .text("Item", 50, doc.y, { width: 200 })
    .text("Qty", 250, doc.y, { width: 100, align: "right" })
    .text("Price", 350, doc.y, { width: 100, align: "right" })
    .text("Total", 450, doc.y, { width: 100, align: "right" })
    .moveDown();

  doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();

  // === Table Rows ===
  invoiceData.items.forEach((item) => {
    const total = item.price;

    doc
      .fontSize(12)
      .text(item.name, 50, doc.y + 10)
      .text(item.quantity, 250, doc.y, { width: 100, align: "right" })
      .text(`Rs. ${item.price.toFixed(2)}`, 350, doc.y, {
        width: 100,
        align: "right",
      })
      .text(`Rs. ${total.toFixed(2)}`, 450, doc.y, {
        width: 100,
        align: "right",
      });
  });

  doc.moveDown();
  doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();

  // === Total ===
  const totalAmount = invoiceData.items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );
  doc
    .fontSize(14)
    .fillColor("#000")
    .text(`Total: Rs. ${invoiceData.totalPr.toFixed(2)}`, 450, doc.y + 20, {
      align: "right",
    });

  // === Footer ===
  doc
    .fontSize(10)
    .fillColor("gray")
    .text("Thank you for your purchase!", 50, 720, {
      align: "center",
      width: 500,
    });

  doc.end();
};

module.exports = {
  allOrders,
  OrdersById,
  OrdersByParams,
  updateOrders,
  emailSender,
  docInvoice,
};
