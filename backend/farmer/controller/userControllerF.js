const mongoose = require("mongoose");

const USER = require("../../admin/model/userModel");
const { hashPassword } = require("../../admin/utils/passwordUtils");

//get users accoding to the parameters

const userByParams = async (req, res) => {
  try {
    const user = await USER.find(req.body);

    if (user.length <= 0) {
      res.status(404).json({ msg: "Not found!" });
      return;
    }

    res.status(200).json({ msg: "Success", data: user });
  } catch (e) {
    res.status(500).json({ msg: "Server error", error: e.message });
  }
};

//Update password

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { password } = req.body;
    const hashedPassword = await hashPassword(password);
    req.body.password = hashedPassword;
    const user = await USER.findByIdAndUpdate(id, req.body, { new: true });
    if (!user) {
      res.status(404).json({ msg: "user not Updated!" });

      return;
    }

    res.status(200).json({ msg: "Update Successful", data: user });
  } catch (e) {
    res.status(500).json({ msg: "Server error", error: e.message });
  }
};

module.exports = {
  userByParams,
  updateUser,
};
