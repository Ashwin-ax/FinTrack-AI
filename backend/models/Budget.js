const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        "Food",
        "Housing",
        "Entertainment",
        "Transport",
        "Shopping",
        "Others",
      ],
    },
    limit: {
      type: Number,
      required: true,
      min: [0, "Budget limit cannot be negative"],
    },
  },
  { timestamps: true },
);

// Prevent duplicate categories for the same user
budgetSchema.index({ user: 1, category: 1 }, { unique: true });

module.exports = mongoose.model("Budget", budgetSchema);
