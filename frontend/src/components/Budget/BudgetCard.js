import React from "react";
import {
  HiOutlineInformationCircle,
  HiOutlineTrash,
  HiOutlineTag,
} from "react-icons/hi";

const BudgetCard = ({ id, category, limit, spent, onDelete }) => {
  const percentage = Math.min((spent / limit) * 100, 100);
  const isOverBudget = spent > limit;
  const remaining = limit - spent;

  const getStatusClass = () => {
    if (percentage >= 100) return "bg-danger";
    if (percentage >= 80) return "bg-warning";
    return "bg-success";
  };

  return (
    <div className={`budget-item-card ${isOverBudget ? "border-danger" : ""}`}>
      <div className="budget-card-header">
        <div className="category-section">
          <div className="category-icon-wrapper">
            <HiOutlineTag className="main-cat-icon" />
            <button
              className="delete-budget-badge"
              onClick={() => onDelete(id)}
              title="Remove Limit"
            >
              <HiOutlineTrash />
            </button>
          </div>
          <div className="category-info">
            <h4>{category}</h4>
            <p>Monthly Target</p>
          </div>
        </div>

        <div className="amount-info">
          <span className="spent-amt">₹{spent.toLocaleString()}</span>
          <span className="limit-amt"> / ₹{limit.toLocaleString()}</span>
        </div>
      </div>

      <div className="progress-track">
        <div
          className={`progress-fill ${getStatusClass()}`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>

      <div className="budget-card-footer">
        <div className="status-meta">
          <HiOutlineInformationCircle />
          <span>
            {isOverBudget
              ? `Over by ₹${Math.abs(remaining).toLocaleString()}`
              : `₹${remaining.toLocaleString()} left to spend`}
          </span>
        </div>
        <span className="percent-text">{percentage.toFixed(0)}%</span>
      </div>
    </div>
  );
};

export default BudgetCard;
