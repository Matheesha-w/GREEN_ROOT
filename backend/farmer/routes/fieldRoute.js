const express = require("express");
const Route = express.Router();

const {
  allFields,
  fieldbyId,
  insertfield,
  updateField,
  deleteField,
  fieldsByParams,
} = require("../controller/fieldController");

Route.get("/", allFields);
Route.get("/:id", fieldbyId);
Route.post("/parameters", fieldsByParams);
Route.post("/", insertfield);

Route.patch("/:id", updateField);
Route.delete("/:id", deleteField);

module.exports = Route;
