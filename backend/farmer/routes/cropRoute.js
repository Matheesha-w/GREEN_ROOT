const express = require("express");
const Route = express.Router();

const {
  allCrops,
  findbyId,
  insertCrop,
  updateCrop,
  deleteCrop,
  cropsByParams,
} = require("../controller/cropController");

Route.get("/", allCrops);
Route.get("/:id", findbyId);
Route.post("/parameters", cropsByParams);
Route.post("/", insertCrop);
Route.patch("/:id", updateCrop);
Route.delete("/:id", deleteCrop);

module.exports = Route;
