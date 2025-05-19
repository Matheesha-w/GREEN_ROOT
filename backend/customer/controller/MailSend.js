const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  secure: true,
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: "greenrootp@gmail.com",
    pass: "weifglbjhwgzofym",
  },
});

function sendEmail(to, subject, msg) {
  const mailOptions = {
     from: "greenrootp@gmail.com",
    to: to,
    subject: subject,
    html: msg,
  };

  return transporter.sendMail(mailOptions); // returns a promise
}

module.exports = sendEmail;
