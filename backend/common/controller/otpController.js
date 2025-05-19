//email conformation
const nodemailer = require("nodemailer");

const otpVerify = (req, res) => {
  try {
    const { otpCode, email } = req.body;

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
      subject: "Greenroot OTP verification",
      text: `OTP: ${otpCode}`,
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

module.exports = { otpVerify };
