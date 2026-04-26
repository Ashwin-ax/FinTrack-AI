const mongoose = require("mongoose");
const User = require("../models/User");
const Transaction = require("../models/Transaction");
const Budget = require("../models/Budget");
const Investment = require("../models/Investment");

const getDashboardStats = async (req, res) => {
  try {
    const uid = req.user._id || req.user.id;
    const userId = new mongoose.Types.ObjectId(uid);

    // 1. Fetching all data matching the 'user' field in your schemas
    const [user, transactions, budgets, investments] = await Promise.all([
      User.findById(userId).select("username"),
      Transaction.find({ user: userId }),
      Budget.find({ user: userId }),
      Investment.find({ user: userId }),
    ]);

    // 2. Summary Card Calculations
    const totalIncome = transactions
      .filter((t) => t.type?.toLowerCase() === "income")
      .reduce((acc, curr) => acc + (curr.amount || 0), 0);

    const totalExpenses = transactions
      .filter((t) => t.type?.toLowerCase() === "expense")
      .reduce((acc, curr) => acc + (curr.amount || 0), 0);

    // 3. INVESTMENT CALCULATION (Using your exact Model fields)
    const processedInvestments = investments.map((inv) => {
      // Logic: Total = 100 shares * ₹1200 current price
      const totalCurrentValue = (inv.quantity || 0) * (inv.currentPrice || 0);

      // Logic: Profit/Loss Percentage
      const profitPercent =
        inv.buyPrice > 0
          ? (((inv.currentPrice - inv.buyPrice) / inv.buyPrice) * 100).toFixed(
              1,
            )
          : "0.0";

      return {
        name: inv.assetName, // From your Schema
        balance: totalCurrentValue, // This goes to the frontend
        change: `${profitPercent >= 0 ? "+" : ""}${profitPercent}%`,
        assetType: inv.assetType,
      };
    });

    const totalInvestedValue = processedInvestments.reduce(
      (acc, curr) => acc + curr.balance,
      0,
    );

    // 4. Spending Trend (Last 7 Days)
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setHours(0, 0, 0, 0);
      d.setDate(d.getDate() - i);
      const dayTotal = transactions
        .filter((t) => {
          const tDate = new Date(t.date);
          tDate.setHours(0, 0, 0, 0);
          return (
            t.type?.toLowerCase() === "expense" &&
            tDate.getTime() === d.getTime()
          );
        })
        .reduce((acc, curr) => acc + (curr.amount || 0), 0);
      last7Days.push({
        day: d.toLocaleDateString("en-US", { weekday: "short" }),
        amount: dayTotal,
      });
    }

    // 5. Final Response Structure
    res.status(200).json({
      userName: user ? user.username : "User",
      stats: {
        totalBalance: totalIncome - totalExpenses,
        monthlyIncome: totalIncome,
        monthlyExpenses: totalExpenses,
        totalInvested: totalInvestedValue, // Sum of all (quantity * currentPrice)
        netWorthChange: "+4.2%",
      },
      spendingTrend: last7Days,
      budgetAlerts: budgets.map((b) => ({
        category: b.category,
        spent: transactions
          .filter(
            (t) =>
              t.category === b.category && t.type?.toLowerCase() === "expense",
          )
          .reduce((acc, curr) => acc + (curr.amount || 0), 0),
        limit: b.limit || b.amount,
      })),
      investments: processedInvestments.slice(0, 3), // Top 3 to show in snapshot
    });
  } catch (error) {
    console.error("Dashboard Aggregation Error:", error);
    res.status(500).json({ message: "Failed to fetch dashboard data" });
  }
};

module.exports = { getDashboardStats };
