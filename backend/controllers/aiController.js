const Transaction = require("../models/Transaction");
const Budget = require("../models/Budget");
const Investment = require("../models/Investment");

const getAIInsights = async (req, res) => {
  try {
    const { type } = req.query;
    const userId = req.user.id;
    let dataSummary = "";
    let promptPrefix = "";

    // GATHERING DATA
    if (type === "budget") {
      const budgets = await Budget.find({ user: userId });
      const transactions = await Transaction.find({ user: userId });
      dataSummary = budgets
        .map((b) => {
          const spent = transactions
            .filter((t) => t.category === b.category && t.type === "expense")
            .reduce((acc, curr) => acc + curr.amount, 0);
          return `${b.category}: Limit ₹${b.limit}, Spent ₹${spent}`;
        })
        .join(", ");
      promptPrefix = "Budget Context: ";
    } else if (type === "investment") {
      const investments = await Investment.find({ user: userId });
      dataSummary = investments
        .map((i) => `${i.assetName}: ${i.quantity} @ ₹${i.buyPrice}`)
        .join(", ");
      promptPrefix = "Portfolio Context: ";
    } else {
      const transactions = await Transaction.find({ user: userId })
        .sort({ date: -1 })
        .limit(10);
      dataSummary = transactions
        .map((t) => `${t.type}: ₹${t.amount} (${t.category})`)
        .join(", ");
      promptPrefix = "Transaction Context: ";
    }

    if (!dataSummary)
      return res
        .status(200)
        .json({ insight: "Add data to unlock AI insights!" });

    const apiKey = process.env.GEMINI_API_KEY;
    // UPDATED MODEL: Use 2.5-flash for the 1,500 RPD student-friendly limit
    const url = `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash-lite:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `${promptPrefix} ${dataSummary}. Provide ONE short, clever financial tip (max 15 words) using ₹. No generic advice.`,
              },
            ],
          },
        ],
        generationConfig: { temperature: 1.0, maxOutputTokens: 80 },
      }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error?.message || "API Error");

    const aiText = data.candidates[0].content.parts[0].text;
    res.status(200).json({ insight: aiText.trim() });
  } catch (error) {
    console.error("AI Insight Error:", error.message);
    res
      .status(200)
      .json({ insight: "Analyze your spending to find hidden savings today!" });
  }
};

module.exports = { getAIInsights };
