const mongoose = require("mongoose");

const CROP = require("../model/cropModel");

//Get all crops

const allCrops = async (req, res) => {
  try {
    const crops = await CROP.find({});

    if (!crops) {
      res.status(404).json({ msg: "unsuccess" });
      return;
    }

    res.status(200).json({ msg: "Success", data: crops });
  } catch (e) {
    res.status(500).json({ msg: "Server error", error: e.message });
  }
};

//get crop accoding to the parameters

const cropsByParams = async (req, res) => {
  try {
    const crops = await CROP.find(req.body);

    if (crops.length <= 0) {
      res.status(404).json({ msg: "Not found!" });
      return;
    }

    res.status(200).json({ msg: "Success", data: crops });
  } catch (e) {
    res.status(500).json({ msg: "Server error", error: e.message });
  }
};

//Get a single crop

const findbyId = async (req, res) => {
  const { id } = req.params;

  try {
    const crops = await CROP.findById(id);
    if (!crops) {
      res.status(404).json({ msg: "Crop not found!" });

      return;
    }

    res.status(200).json({ msg: "Success", data: crops });
  } catch (e) {
    res.status(500).json({ msg: "Server error", error: e.message });
  }
};

//Insert a crop

const insertCrop = async (req, res) => {
  try {
    const crops = await CROP.create(req.body);
    if (!crops) {
      res.status(404).json({ msg: "Crop not created!" });

      return;
    }

    res.status(200).json({ msg: "Success", data: crops });
  } catch (e) {
    res.status(500).json({ msg: "Server error", error: e.message });
  }
};

//Update crop

const updateCrop = async (req, res) => {
  try {
    const { id } = req.params;
    const crops = await CROP.findByIdAndUpdate(id, req.body, { new: true });
    if (!crops) {
      res.status(404).json({ msg: "Crop not Updated!" });

      return;
    }

    res.status(200).json({ msg: "Update Successful", data: crops });
  } catch (e) {
    res.status(500).json({ msg: "Server error", error: e.message });
  }
};

//delete crops

const deleteCrop = async (req, res) => {
  try {
    const { id } = req.params;
    const crops = await CROP.findByIdAndDelete(id);
    if (!crops) {
      res.status(404).json({ msg: "Crop not Deleted!" });

      return;
    }

    res.status(200).json({ msg: "Delete Successfully!", data: crops });
  } catch (e) {
    res.status(500).json({ msg: "Server error", error: e.message });
  }
};

module.exports = {
  allCrops,
  findbyId,
  insertCrop,
  updateCrop,
  deleteCrop,
  cropsByParams,
};
