const mongoose = require("mongoose");

const FIELD = require("../model/fieldModel");

//Get all fields

const allFields = async (req, res) => {
  try {
    const field = await FIELD.find({});

    if (!field) {
      res.status(404).json({ msg: "unsuccess" });
      return;
    }

    res.status(200).json({ msg: "Success", data: field });
  } catch (e) {
    res.status(500).json({ msg: "Server error", error: e.message });
  }
};

//get fields accoding to the parameters

const fieldsByParams = async (req, res) => {
  try {
    const fields = await FIELD.find(req.body);

    if (fields.length <= 0) {
      res.status(404).json({ msg: "Not found!" });
      return;
    }

    res.status(200).json({ msg: "Success", data: fields });
  } catch (e) {
    res.status(500).json({ msg: "Server error", error: e.message });
  }
};

//Get a field By ID

const fieldbyId = async (req, res) => {
  const { id } = req.params;

  try {
    const fields = await FIELD.findById(id);
    if (!fields) {
      res.status(404).json({ msg: "Field not found!" });

      return;
    }

    res.status(200).json({ msg: "Success", data: fields });
  } catch (e) {
    res.status(500).json({ msg: "Server error", error: e.message });
  }
};

//Insert a field

const insertfield = async (req, res) => {
  try {
    const fields = await FIELD.create(req.body);
    if (!fields) {
      res.status(404).json({ msg: "field not created!" });

      return;
    }

    res.status(200).json({ msg: "Success", data: fields });
  } catch (e) {
    res.status(500).json({ msg: "Server error", error: e.message });
  }
};

//Update field

const updateField = async (req, res) => {
  try {
    const { id } = req.params;
    const fields = await FIELD.findByIdAndUpdate(id, req.body, { new: true });
    if (!fields) {
      res.status(404).json({ msg: "field not Updated!" });

      return;
    }

    res.status(200).json({ msg: "Update Successful", data: fields });
  } catch (e) {
    res.status(500).json({ msg: "Server error", error: e.message });
  }
};

//delete field

const deleteField = async (req, res) => {
  try {
    const { id } = req.params;
    const fields = await FIELD.findByIdAndDelete(id);
    if (!fields) {
      res.status(404).json({ msg: "field not Deleted!" });

      return;
    }

    res.status(200).json({ msg: "Delete Successfully!", data: fields });
  } catch (e) {
    res.status(500).json({ msg: "Server error", error: e.message });
  }
};

module.exports = {
  allFields,
  fieldbyId,
  insertfield,
  updateField,
  deleteField,
  fieldsByParams,
};
