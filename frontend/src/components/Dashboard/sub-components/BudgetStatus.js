import React from "react";

const BudgetStatus = ({ budgets }) => {
  return (
    <div className="budget-card">
      <div className="budget-header">
        <h3>Budget Guardrails</h3>
        <p>Top categories this month</p>
      </div>

      <div className="budget-list">
        {budgets.map((budget, index) => {
          const percentage = Math.min((budget.spent / budget.limit) * 100, 100);

          // Dynamic color logic: Green -> Yellow (80%) -> Red (95%)
          let statusColor = "#10b981";
          if (percentage >= 95) statusColor = "#ef4444";
          else if (percentage >= 80) statusColor = "#fbbf24";

          return (
            <div key={index} className="budget-item">
              <div className="budget-info">
                <span className="category-name">{budget.category}</span>
                <span className="budget-ratio">
                  ₹{budget.spent.toLocaleString()} /{" "}
                  <strong>₹{budget.limit.toLocaleString()}</strong>
                </span>
              </div>

              <div className="progress-container">
                <div
                  className="progress-bar"
                  style={{
                    width: `${percentage}%`,
                    backgroundColor: statusColor,
                    boxShadow: `0 0 10px ${statusColor}40`,
                  }}
                />
              </div>

              <div className="budget-footer">
                <span className="percent-label">
                  {percentage.toFixed(0)}% used
                </span>
                {percentage >= 100 && (
                  <span className="over-budget-tag">Over Limit</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BudgetStatus;
