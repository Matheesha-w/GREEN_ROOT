const express = require("express");
const Route = express.Router();

const { checkout, paymentInfo } = require("../controller/paymentController");

Route.post("/", checkout);
Route.get("/:id", paymentInfo);

module.exports = Route;
