import React from "react";
import {
  HiOutlineShieldCheck,
  HiOutlineChartPie,
  HiOutlineCalendar,
} from "react-icons/hi";
import "./index.css";

const BudgetSummary = ({ totalBudget, totalSpent }) => {
  // --- CALENDAR LOGIC ---
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  // Get last day of the current month
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const daysLeft = lastDayOfMonth - today.getDate() + 1; // Including today

  // --- FINANCIAL LOGIC ---
  const remainingTotal = totalBudget - totalSpent;
  const safeToSpendDaily =
    remainingTotal > 0 ? (remainingTotal / daysLeft).toFixed(0) : 0;
  const usedPercentage =
    totalBudget > 0 ? ((totalSpent / totalBudget) * 100).toFixed(1) : 0;

  return (
    <section className="budget-summary-container">
      {/* 1. Daily Safe-to-Spend Card */}
      <div className="summary-card highlight">
        <div className="summary-icon-box">
          <HiOutlineShieldCheck />
        </div>
        <div className="summary-details">
          <span>Daily Safe-to-Spend</span>
          <h3>₹{Number(safeToSpendDaily).toLocaleString()}</h3>
          <p>For the next {daysLeft} days</p>
        </div>
      </div>

      {/* 2. Monthly Utilization Card */}
      <div className="summary-card">
        <div className="summary-icon-box blue">
          <HiOutlineChartPie />
        </div>
        <div className="summary-details">
          <span>Budget Utilization</span>
          <h3>{usedPercentage}%</h3>
          <p>
            ₹{totalSpent.toLocaleString()} of ₹{totalBudget.toLocaleString()}
          </p>
        </div>
      </div>

      {/* 3. Month Progress Card */}
      <div className="summary-card">
        <div className="summary-icon-box orange">
          <HiOutlineCalendar />
        </div>
        <div className="summary-details">
          <span>Month Progress</span>
          <h3>{((today.getDate() / lastDayOfMonth) * 100).toFixed(0)}%</h3>
          <p>{daysLeft} days remaining</p>
        </div>
      </div>
    </section>
  );
};

export default BudgetSummary;
