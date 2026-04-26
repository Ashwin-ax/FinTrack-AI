import React, { useState, useEffect } from "react";
import axios from "axios";
import SummaryCards from "./sub-components/SummaryCards";
import SpendingChart from "./sub-components/SpendingChart";
import BudgetStatus from "./sub-components/BudgetStatus";
import AssetSnapshot from "./sub-components/AssetSnapshot";
import AIInsights from "../AIInsights";
import { TailSpin } from "react-loader-spinner";

import "./index.css";
const API_URL = process.env.REACT_APP_BACKEND_URL;

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await axios.get(`${API_URL}/dashboard`, {
          withCredentials: true,
        });
        setData(response.data);
      } catch (error) {
        console.error("Error loading dashboard:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading)
    return (
      <div className="dashboard-loading-container">
        <TailSpin height="80" width="80" color="#10B981" ariaLabel="loading" />
      </div>
    );
  if (!data)
    return (
      <div className="error">
        Failed to load dashboard. Please check your connection.
      </div>
    );
  const Name = data.userName.toUpperCase();
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="greeting">
          <h1>Namaste, {Name}!</h1>
          <p>
            Your net worth is ₹
            {(
              data.stats.totalBalance + data.stats.totalInvested
            ).toLocaleString("en-IN")}
          </p>{" "}
        </div>
        <div className="date-display">
          {new Date().toLocaleDateString("en-IN", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      </header>

      <SummaryCards stats={data.stats} />

      <div className="dashboard-main-grid">
        <div className="chart-section">
          <SpendingChart data={data.spendingTrend} />
          {/* You can add a Recent Transactions table here later */}
        </div>

        <div className="ai-side-section">
          <AIInsights type="dashboard" />
          <BudgetStatus budgets={data.budgetAlerts} />
          <AssetSnapshot investments={data.investments} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
