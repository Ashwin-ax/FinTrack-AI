const Investment = require("../models/Investment");

// @desc    Get all investments for logged in user
exports.getInvestments = async (req, res) => {
  try {
    const investments = await Investment.find({ user: req.user._id });
    res.status(200).json({
      success: true,
      data: investments,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Add new investment
exports.addInvestment = async (req, res) => {
  try {
    // UPDATED: Destructure currentPrice from req.body
    const { assetName, symbol, assetType, quantity, buyPrice, currentPrice } =
      req.body;

    const investment = await Investment.create({
      user: req.user._id,
      assetName,
      symbol,
      assetType,
      quantity,
      buyPrice,
      currentPrice: currentPrice || buyPrice, // Fallback if user leaves it blank
    });

    res.status(201).json({ success: true, data: investment });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Delete investment
exports.deleteInvestment = async (req, res) => {
  try {
    const investment = await Investment.findById(req.params.id);
    if (!investment) {
      return res
        .status(404)
        .json({ success: false, message: "Asset not found" });
    }
    if (investment.user.toString() !== req.user._id.toString()) {
      return res
        .status(401)
        .json({ success: false, message: "Not authorized" });
    }
    await investment.deleteOne();
    res.status(200).json({ success: true, message: "Asset removed" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
