const express = require("express");
const Route = express.Router();

const { userByParams, updateUser } = require("../controller/userControllerF");

Route.post("/parameters", userByParams);
Route.patch("/:id", updateUser);

module.exports = Route;
