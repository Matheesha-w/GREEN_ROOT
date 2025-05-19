const express = require("express");
const Route = express.Router();

const { getStock } = require("../controller/stockController");

Route.get("/", getStock);

module.exports = Route;
