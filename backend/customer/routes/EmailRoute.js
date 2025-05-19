const express = require("express");
const router = express.Router();
const sendEmail = require("../controller/MailSend.js");

router.post("/email", async (req, res) => {

    console.log("Received email request:", req.body); // LOG INPUT

  const { email, subject, message } = req.body;

  if (!email || !subject || !message) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    await sendEmail(email, subject, message);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (err) {
    console.error("Email Error:", err);
    res.status(500).json({ error: "Failed to send email" });
  }
});

module.exports = router;
