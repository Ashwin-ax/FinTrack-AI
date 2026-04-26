const Budget = require("../models/Budget");

// @desc    Set or Update a budget for a category
// @route   POST /api/budget
exports.setBudget = async (req, res) => {
  try {
    const { category, limit } = req.body;

    // findOneAndUpdate with upsert: true handles both Create and Update
    const budget = await Budget.findOneAndUpdate(
      { user: req.user.id, category },
      { limit },
      { returnDocument: "after", upsert: true, runValidators: true }, // Updated option
    );

    res.status(200).json(budget);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get all budgets for a user
// @route   GET /api/budget
exports.getBudgets = async (req, res) => {
  try {
    const budgets = await Budget.find({ user: req.user.id });
    res.json(budgets);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.deleteBudget = async (req, res) => {
  try {
    const budget = await Budget.findById(req.params.id);

    if (!budget) {
      return res.status(404).json({ message: "Budget limit not found" });
    }

    // Verify ownership
    if (budget.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await budget.deleteOne();
    res.json({ message: "Budget limit removed" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
