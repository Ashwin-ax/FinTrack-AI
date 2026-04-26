const Transaction = require("../models/Transaction");

// Create Transaction
exports.addTransaction = async (req, res) => {
  try {
    const { desc, amount, category, type, date } = req.body;

    const transaction = await Transaction.create({
      user: req.user.id, // Provided by authMiddleware
      desc,
      amount,
      category,
      type,
      date,
    });

    res.status(201).json(transaction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Fetch Transactions
exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    // Ensure user owns transaction
    if (transaction.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "User not authorized" });
    }

    await transaction.deleteOne();
    res.json({ message: "Transaction removed" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.updateTransaction = async (req, res) => {
  try {
    const { desc, amount, category, type, date } = req.body;
    let transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    // Security Check: Ensure user owns this transaction
    if (transaction.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    // UPDATE the existing document
    transaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      { desc, amount, category, type, date },
      { new: true, runValidators: true }, // 'new: true' returns the updated doc
    );

    res.json(transaction);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
