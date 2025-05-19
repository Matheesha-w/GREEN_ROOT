const mongoose = require("mongoose");

const TICKET = require("../model/ticketModel");

//Get all tickets

const allTickets = async (req, res) => {
  try {
    const ticket = await TICKET.find({});

    if (!ticket) {
      res.status(404).json({ msg: "unsuccess" });
      return;
    }

    res.status(200).json({ msg: "Success", data: ticket });
  } catch (e) {
    res.status(500).json({ msg: "Server error", error: e.message });
  }
};

//get tickets accoding to the parameters

const ticketsByParams = async (req, res) => {
  try {
    const tickets = await TICKET.find(req.body);

    if (tickets.length <= 0) {
      res.status(404).json({ msg: "Not found!" });
      return;
    }

    res.status(200).json({ msg: "Success", data: tickets });
  } catch (e) {
    res.status(500).json({ msg: "Server error", error: e.message });
  }
};

//Get a TICKET By ID

const ticketbyId = async (req, res) => {
  const { id } = req.params;

  try {
    const tickets = await TICKET.findById(id);
    if (!tickets) {
      res.status(404).json({ msg: "tickets not found!" });

      return;
    }

    res.status(200).json({ msg: "Success", data: tickets });
  } catch (e) {
    res.status(500).json({ msg: "Server error", error: e.message });
  }
};

//Insert a TICKET

const insertTICKET = async (req, res) => {
  try {
    const tickets = await TICKET.create(req.body);
    if (!tickets) {
      res.status(404).json({ msg: "field not created!" });

      return;
    }

    res.status(200).json({ msg: "Success", data: tickets });
  } catch (e) {
    res.status(500).json({ msg: "Server error", error: e.message });
  }
};

//Update TICKET

const updateTICKET = async (req, res) => {
  try {
    const { id } = req.params;
    const tickets = await TICKET.findByIdAndUpdate(id, req.body, { new: true });
    if (!tickets) {
      res.status(404).json({ msg: "field not Updated!" });

      return;
    }

    res.status(200).json({ msg: "Update Successful", data: tickets });
  } catch (e) {
    res.status(500).json({ msg: "Server error", error: e.message });
  }
};

//delete TICKET

const deleteTICKET = async (req, res) => {
  try {
    const { id } = req.params;
    const tickets = await TICKET.findByIdAndDelete(id);
    if (!tickets) {
      res.status(404).json({ msg: "field not Deleted!" });

      return;
    }

    res.status(200).json({ msg: "Delete Successfully!", data: tickets });
  } catch (e) {
    res.status(500).json({ msg: "Server error", error: e.message });
  }
};

module.exports = {
  allTickets,
  ticketbyId,
  insertTICKET,
  updateTICKET,
  deleteTICKET,
  ticketsByParams,
};
