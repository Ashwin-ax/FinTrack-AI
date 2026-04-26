import React from "react";
import { Wallet, TrendingUp, TrendingDown, Landmark } from "lucide-react";

const SummaryCards = ({ stats }) => {
  const percentAmt = stats.monthlyIncome * 0.1;
  const cardData = [
    {
      title: "Total Balance",
      amount: stats.totalBalance,
      icon: <Wallet size={24} />,
      color: "#3b82f6", // Blue
      trend: stats.netWorthChange,
    },
    {
      title: "Monthly Income",
      amount: stats.monthlyIncome,
      icon: <TrendingUp size={24} />,
      color: "#10b981",
      trend: `Goal: Save ${percentAmt}/month`,
    },
    {
      title: "Monthly Expenses",
      amount: stats.monthlyExpenses,
      icon: <TrendingDown size={24} />,
      color: "#ef4444", // Rose
      trend: "12% vs last month",
    },
    {
      title: "Total Invested",
      amount: stats.totalInvested,
      icon: <Landmark size={24} />,
      color: "#8b5cf6", // Violet
      trend: "Crypto/Stocks",
    },
  ];

  return (
    <div className="summary-grid">
      {cardData.map((item, index) => (
        <div key={index} className="stat-card">
          <div
            className="stat-icon"
            style={{ backgroundColor: `${item.color}20`, color: item.color }}
          >
            {item.icon}
          </div>
          <div className="stat-info">
            <p className="stat-label">{item.title}</p>
            <h2 className="stat-amount">
              ₹{item.amount.toLocaleString("en-IN")}
            </h2>
            <span
              className="stat-trend"
              style={{
                color: item.trend.includes("+") ? "#10b981" : "#94a3b8",
              }}
            >
              {item.trend}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;
