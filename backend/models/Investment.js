const mongoose = require("mongoose");

const investmentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  assetName: { type: String, required: true },
  symbol: { type: String, required: true },
  assetType: {
    type: String,
    required: true,
    enum: ["Stock", "Crypto", "Mutual Fund", "Gold"],
  },
  quantity: { type: Number, required: true },
  buyPrice: { type: Number, required: true },
  // ADD THIS FIELD
  currentPrice: {
    type: Number,
    required: true,
    default: function () {
      return this.buyPrice;
    },
  },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Investment", investmentSchema);
