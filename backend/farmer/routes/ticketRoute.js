const express = require("express");
const Route = express.Router();

const {
  allTickets,
  ticketbyId,
  insertTICKET,
  updateTICKET,
  deleteTICKET,
  ticketsByParams,
} = require("../controller/ticketController");

Route.get("/", allTickets);
Route.get("/:id", ticketbyId);
Route.post("/parameters", ticketsByParams);
Route.post("/", insertTICKET);
Route.patch("/:id", updateTICKET);
Route.delete("/:id", deleteTICKET);

module.exports = Route;
