const express = require("express");
const Route = express.Router();

const {
  allSCHEDULE,
  SCHEDULEById,
  SCHEDULEByParams,
  insertSCHEDULE,
  deleteSCHEDULE,
  updateSCHEDULE,
} = require("../controller/scheduleController");

Route.get("/", allSCHEDULE);
Route.get("/:id", SCHEDULEById);
Route.post("/parameters", SCHEDULEByParams);
Route.post("/", insertSCHEDULE);
Route.patch("/:id", updateSCHEDULE);
Route.delete("/:id", deleteSCHEDULE);

module.exports = Route;
