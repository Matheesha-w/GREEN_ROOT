const mongoose = require("mongoose");

const SCHEDULE = require("../model/scheduleModel");

//Get all categories

const allSCHEDULE = async (req, res) => {
  try {
    const CAT = await SCHEDULE.find({});

    if (!CAT) {
      res.status(404).json({ msg: "unsuccess" });
      return;
    }

    res.status(200).json({ msg: "Success", data: CAT });
  } catch (e) {
    res.status(500).json({ msg: "Server error", error: e.message });
  }
};

//get SCHEDULE accoding to the parameters

const SCHEDULEByParams = async (req, res) => {
  try {
    const CAT = await SCHEDULE.find(req.body);

    if (CAT.length <= 0) {
      res.status(404).json({ msg: "Not found!" });
      return;
    }

    res.status(200).json({ msg: "Success", data: CAT });
  } catch (e) {
    res.status(500).json({ msg: "Server error", error: e.message });
  }
};

//Get a single SCHEDULE

const SCHEDULEById = async (req, res) => {
  const { id } = req.params;

  try {
    const CAT = await SCHEDULE.findById(id);
    if (!CAT) {
      res.status(404).json({ msg: "SCHEDULE not found!" });

      return;
    }

    res.status(200).json({ msg: "Success", data: CAT });
  } catch (e) {
    res.status(500).json({ msg: "Server error", error: e.message });
  }
};

//Insert a SCHEDULE

const insertSCHEDULE = async (req, res) => {
  try {
    const CAT = await SCHEDULE.create(req.body);
    if (!CAT) {
      res.status(404).json({ msg: "SCHEDULE not created!" });

      return;
    }

    res.status(200).json({ msg: "Success", data: CAT });
  } catch (e) {
    res.status(500).json({ msg: "Server error", error: e.message });
  }
};

//Update SCHEDULE

const updateSCHEDULE = async (req, res) => {
  try {
    const { id } = req.params;
    const CAT = await SCHEDULE.findByIdAndUpdate(id, req.body, { new: true });
    if (!CAT) {
      res.status(404).json({ msg: "SCHEDULE not Updated!" });

      return;
    }

    res.status(200).json({ msg: "Update Successful", data: CAT });
  } catch (e) {
    res.status(500).json({ msg: "Server error", error: e.message });
  }
};

//delete SCHEDULE

const deleteSCHEDULE = async (req, res) => {
  try {
    const { id } = req.params;
    const CAT = await SCHEDULE.findByIdAndDelete(id);
    if (!CAT) {
      res.status(404).json({ msg: "SCHEDULE not Deleted!" });

      return;
    }

    res.status(200).json({ msg: "Delete Successfully!", data: CAT });
  } catch (e) {
    res.status(500).json({ msg: "Server error", error: e.message });
  }
};

module.exports = {
  allSCHEDULE,
  SCHEDULEById,
  SCHEDULEByParams,
  insertSCHEDULE,
  deleteSCHEDULE,
  updateSCHEDULE,
};
