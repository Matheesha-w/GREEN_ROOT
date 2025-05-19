const mongoose = require("mongoose");

const CATEGORY = require("../model/categoryModel");

//Get all categories

const allCategories = async (req, res) => {
  try {
    const CAT = await CATEGORY.find({});

    if (!CAT) {
      res.status(404).json({ msg: "unsuccess" });
      return;
    }

    res.status(200).json({ msg: "Success", data: CAT });
  } catch (e) {
    res.status(500).json({ msg: "Server error", error: e.message });
  }
};

//get cat accoding to the parameters

const CATEGORYByParams = async (req, res) => {
  try {
    const CAT = await CATEGORY.find(req.body);

    if (CAT.length <= 0) {
      res.status(404).json({ msg: "Not found!" });
      return;
    }

    res.status(200).json({ msg: "Success", data: CAT });
  } catch (e) {
    res.status(500).json({ msg: "Server error", error: e.message });
  }
};

//Get a single category

const categoryById = async (req, res) => {
  const { id } = req.params;

  try {
    const CAT = await CATEGORY.findById(id);
    if (!CAT) {
      res.status(404).json({ msg: "Category not found!" });

      return;
    }

    res.status(200).json({ msg: "Success", data: CAT });
  } catch (e) {
    res.status(500).json({ msg: "Server error", error: e.message });
  }
};

//Insert a category

const insertCategory = async (req, res) => {
  try {
    const CAT = await CATEGORY.create(req.body);
    if (!CAT) {
      res.status(404).json({ msg: "Category not created!" });

      return;
    }

    res.status(200).json({ msg: "Success", data: CAT });
  } catch (e) {
    res.status(500).json({ msg: "Server error", error: e.message });
  }
};

//Update category

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const CAT = await CATEGORY.findByIdAndUpdate(id, req.body, { new: true });
    if (!CAT) {
      res.status(404).json({ msg: "Category not Updated!" });

      return;
    }

    res.status(200).json({ msg: "Update Successful", data: CAT });
  } catch (e) {
    res.status(500).json({ msg: "Server error", error: e.message });
  }
};

//delete category

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const CAT = await CATEGORY.findByIdAndDelete(id);
    if (!CAT) {
      res.status(404).json({ msg: "Category not Deleted!" });

      return;
    }

    res.status(200).json({ msg: "Delete Successfully!", data: CAT });
  } catch (e) {
    res.status(500).json({ msg: "Server error", error: e.message });
  }
};

module.exports = {
  allCategories,
  categoryById,
  CATEGORYByParams,
  insertCategory,
  deleteCategory,
  updateCategory,
};
