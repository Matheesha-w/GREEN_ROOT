const express = require("express");
const {
  getUsersByRole,
  createUser,
  updateUser,
  deleteUser,
  getSingleUser,
  getUserCounts,
} = require("../controller/user.controller");
const router = express.Router();



router.get('/allusers', getUserCounts);


// get all admins
router.get("/admins", (req, res) => getUsersByRole(req, res, "admin"));
// get all farmers
router.get("/farmers", (req, res) => getUsersByRole(req, res, "farmer"));
// get all sellers
router.get("/sellers", (req, res) => getUsersByRole(req, res, "seller"));
// get all customers
router.get("/customers", (req, res) => getUsersByRole(req, res, "customer"));
// get all researchers
router.get("/researchers", (req, res) =>
  getUsersByRole(req, res, "researcher")
);
// get all deliveryPerson
router.get("/deliveryPerson", (req, res) =>
  getUsersByRole(req, res, "deliveryPerson")
);
// get single user
router.get("/:id", getSingleUser);
// create a user
router.post("/create", createUser);
// update user
router.put("/update/:id", updateUser);
// delete user
router.delete("/delete/:id", deleteUser);



module.exports = router;
