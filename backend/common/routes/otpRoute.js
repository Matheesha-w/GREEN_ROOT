const express = require("express");
const Route = express.Router();

const { otpVerify } = require("../controller/otpController");

Route.post("/", otpVerify);

module.exports = Route;
