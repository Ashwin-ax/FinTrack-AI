import React, { useState, useEffect } from "react";
import axios from "axios";
import { TrendingUp, TrendingDown, PlusCircle } from "lucide-react";
import InvestmentForm from "../InvestmentForm";
import PortfolioChart from "../PortfolioChart";
import InvestmentTable from "../InvestmentTable";
import AIInsights from "../../AIInsights";
import "./index.css";
const API_URL = process.env.REACT_APP_BACKEND_URL;
const InvestmentDashboard = () => {
  const [investments, setInvestments] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const fetchInvestments = async () => {
    try {
      const res = await axios.get(`${API_URL}/investments`, {
        withCredentials: true,
      });
      if (res.data.success) setInvestments(res.data.data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchInvestments();
  }, []);

  // --- P&L CALCULATIONS ---
  const totalInvested = investments.reduce(
    (acc, inv) => acc + inv.buyPrice * inv.quantity,
    0,
  );
  const totalCurrent = investments.reduce(
    (acc, inv) => acc + inv.currentPrice * inv.quantity,
    0,
  );
  const totalPnL = totalCurrent - totalInvested;
  const pnlPercent = totalInvested > 0 ? (totalPnL / totalInvested) * 100 : 0;
  const isProfit = totalPnL >= 0;

  return (
    <div className="invest-page-wrapper">
      <main className="invest-main-content">
        <AIInsights type="investment" transactionCount={investments.length} />
        <header className="invest-header">
          <div className="invest-title-area">
            <h1>Investment Portfolio</h1>
            <p>Monitor your wealth growth</p>
          </div>
          <button
            className="btn-toggle-form"
            onClick={() => setShowForm(!showForm)}
          >
            <PlusCircle size={20} />
            <span>{showForm ? "Close" : "Add Asset"}</span>
          </button>
        </header>
        {showForm && (
          <InvestmentForm
            onAdd={fetchInvestments}
            onClose={() => setShowForm(false)}
          />
        )}
        <section className="invest-grid">
          {/* Card 1: Total Invested */}
          <div className="inv-stat-card">
            <span className="label">Total Invested</span>
            <h2 className="value">₹{totalInvested.toLocaleString("en-IN")}</h2>
          </div>

          {/* Card 2: Profit/Loss */}
          <div
            className={`inv-stat-card pnl-card ${isProfit ? "profit" : "loss"}`}
          >
            <span className="label">Total Profit/Loss</span>
            <h2 className="value">
              {isProfit ? "+" : ""}₹{Math.abs(totalPnL).toLocaleString("en-IN")}
            </h2>
            <div className="pnl-badge">
              {isProfit ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
              {pnlPercent.toFixed(2)}%
            </div>
          </div>

          {/* Card 3: Chart */}
          <div className="chart-card">
            <h3 className="chart-title">Asset Allocation</h3>
            <div className="chart-wrapper">
              <PortfolioChart data={investments} />
            </div>
          </div>
        </section>
        <section className="list-section">
          <h3>Detailed Holdings</h3>
          <InvestmentTable data={investments} onRefresh={fetchInvestments} />
        </section>
      </main>
    </div>
  );
};

export default InvestmentDashboard;
