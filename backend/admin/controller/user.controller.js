const User = require("../model/userModel.js");
const { hashPassword } = require("../utils/passwordUtils.js");
// nodemailer
const nodemailer = require('nodemailer');

// get all users by role(Admin / Farmer / Seller)
const getUsersByRole = async (req, res, role) => {
  try {
    const users = await User.find({ role });
    res.status(200).json({ data: users });
  } catch (error) {
    res.status(500).json({ message: `Error while fetching data `, error });
  }
};

// get single user data
const getSingleUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({ message: `User not found!` });
    }

    res.status(200).json({ data: user });
  } catch (error) {
    res.status(500).json({ message: `Something went wrong! `, err: error });
  }
};

// create users
const createUser = async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;

    // check the password is match
    if (password !== confirmPassword) {
      return res.status(400).json({ msg: `Password is not match...` });
    }

    // check if the user already exists
    const isUserexists = await User.findOne({ email });
    if (isUserexists) {
      return res.status(400).json({ err: `User already exists...` });
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);
    req.body.password = hashedPassword;

    // Create new user
    const user = await User.create(req.body);

    res.status(201).json({
      msg: `User registered successfully`,
      data: user,
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// update user
const updateUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      address,
      phone,
      email,
      password,
      role,
      image,
      status,
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !address ||
      !phone ||
      !email ||
      !password ||
      !role
    ) {
      return res.status(400).json({ message: `All fields are required...` });
    }

    if (!image) {
      req.body.image = "../extras/avetar.png";
    }

    if (!status) {
      req.body.status = "active";
    }

    // send a welcome email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'greenrootp@gmail.com',
        pass: 'weifglbjhwgzofym',
      }
    });

    const mailOptions = {
      from: 'greenrootp@gmail.com',
      to: email,
      subject: 'Your Information Has Been Updated',
      html: `
            <h1>Welcome to GreenRoots!</h1>
            <p>Hello ${firstName} ${lastName},</p>
            <p>We are delighted to have you onboard. Your credentials have been successfully updated.</p>
            <p>Here are your updated details:</p>
            <ul>
                <li><strong>First Name:</strong> ${firstName}</li>
                <li><strong>Last Name:</strong> ${lastName}</li>
                <li><strong>password:</strong>1234567</li>
                <li><strong>Email:</strong> ${email}</li>
                <li><strong>Status:</strong> ${status}</li>
                <li><strong>Address:</strong> ${address}</li>
                <li><strong>Phone:</strong> ${phone}</li>
            </ul>
            <p>Thank you for being a part of our community!</p>
            <p>Best regards,</p>
            <p><strong>The GreenRoots Team</strong></p>
            `
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });


    // hash the password
    const hashedPassword = await hashPassword(password);
    req.body.password = hashedPassword;

    const { id } = req.params;

    // update user
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(400).json({ message: `User update faild...` });
    }

    res
      .status(200)
      .json({ message: "User Updated successfully...", data: updatedUser });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// delete user
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(400).json({ message: `User not found...` });
    }

    res.status(200).json({ message: `User deleted Successfully!` });
  } catch (error) {
    res.status(500).json({ message: `Something went wrong `, error });
  }
};

// get user count
const getUserCounts = async (req, res) => {

  try {
    const userCounts = await User.aggregate([
      { $group: { _id: "$role", count: { $sum: 1 } } }
    ]);

    res.status(200).json(userCounts);

  } catch (err) {
    res.status(500).json({ msg: err.message });

  }

};

module.exports = {
  getUsersByRole,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  getUserCounts,
};
