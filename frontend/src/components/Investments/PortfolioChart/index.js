import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import "./index.css";

const PortfolioChart = ({ data = [] }) => {
  // Default to empty array

  // SAFETY CHECK: If data is null or undefined, don't run the reduce function
  if (!data || data.length === 0) {
    return <div className="empty-state">No investment data available</div>;
  }

  const chartData = data.reduce((acc, curr) => {
    const existing = acc.find((item) => item.name === curr.assetType);
    const value = Number(curr.quantity || 0) * Number(curr.buyPrice || 0);

    if (existing) {
      existing.value += value;
    } else {
      acc.push({ name: curr.assetType, value: value });
    }
    return acc;
  }, []);

  const COLORS = ["#10b981", "#6366f1", "#f59e0b", "#ef4444", "#8b5cf6"];

  return (
    <div className="portfolio-chart-container">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius="60%"
            outerRadius="80%"
            paddingAngle={5}
            dataKey="value"
            stroke="none"
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `₹${value.toLocaleString("en-IN")}`} />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PortfolioChart;
