const getStock = async (req, res) => {
  res.status(200).json({ msg: "Success" });
};

module.exports = { getStock };
