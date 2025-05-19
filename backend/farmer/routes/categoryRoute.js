const express = require("express");
const Route = express.Router();

const {
  allCategories,
  categoryById,
  CATEGORYByParams,
  insertCategory,
  deleteCategory,
  updateCategory,
} = require("../controller/categoryController");

Route.get("/", allCategories);
Route.get("/:id", categoryById);
Route.post("/parameters", CATEGORYByParams);
Route.post("/", insertCategory);
Route.patch("/:id", updateCategory);
Route.delete("/:id", deleteCategory);

module.exports = Route;
