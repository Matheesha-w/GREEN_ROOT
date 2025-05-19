const express = require("express");
const router = express.Router();

const { checkout } = require("../model/PaymentModel");//change

router.post("/", checkout);







module.exports = router;
