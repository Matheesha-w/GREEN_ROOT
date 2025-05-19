const nodemailer = require("nodemailer");


/*

user: 'greenrootp@gmail.com',
                pass: 'weifglbjhwgzofym',

*/
// Configure the email transporter
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: 'greenrootp@gmail.com',  
        pass: 'weifglbjhwgzofym',   
    },
});

// Function to send an email
const sendOrderUpdateEmail = async (email, orderID, messageBody) => {
    try {
        const mailOptions = {
            from: "greenrootp@gmail.com",
            to: email,
            subject: `Order #${orderID} Status Update`,
            html: `<p>Hello,</p>
                   <p>${messageBody}</p>
                   <p>If you have any questions, feel free to reach out.</p>
                   <p>Best regards,<br>GreenRoot Team</p>`
        };

        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully.");
    } catch (error) {
        console.error("Error sending email:", error);
    }
};



module.exports = { sendOrderUpdateEmail };

