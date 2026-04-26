import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

import { HiSparkles, HiRefresh, HiLightBulb } from "react-icons/hi";
import "./index.css";
const API_URL = process.env.REACT_APP_BACKEND_URL;
const AIInsights = ({ type = "transactions", transactionCount = 0 }) => {
  const [insight, setInsight] = useState("");
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  const fetchInsight = useCallback(async () => {
    setLoading(true);
    try {
      // refreshKey forces a fresh call, v ensures no browser caching
      const { data } = await axios.get(
        `${API_URL}/ai/get-insights?type=${type}&refresh=${refreshKey}&v=${Date.now()}`,
        { withCredentials: true },
      );
      setInsight(data.insight);
    } catch (err) {
      console.error("Insight Error:", err);
      setInsight(
        "Keep tracking your daily goals for a smarter financial future!",
      );
    } finally {
      setLoading(false);
    }
  }, [type, refreshKey]);

  useEffect(() => {
    fetchInsight();
  }, [fetchInsight, transactionCount]);

  return (
    <div className="ai-insight-card">
      <div className="ai-card-header">
        <div className="ai-header-left">
          <div className="ai-icon-bg">
            <HiSparkles className="ai-sparkle-icon" />
          </div>
          <div className="ai-title-group">
            <h3>Smart Insights</h3>
            <p>Gemini 2.5 AI</p>
          </div>
        </div>
        <button
          onClick={() => setRefreshKey((prev) => prev + 1)}
          className="refresh-tip-btn"
          disabled={loading}
          aria-label="Refresh insight"
        >
          <HiRefresh className={loading ? "spinning" : ""} size={18} />
        </button>
      </div>

      <div className="ai-card-body">
        <div className="insight-content">
          <HiLightBulb className="insight-bulb-icon" />
          <p className="power-tip-text">
            {loading ? "Analyzing your data..." : insight}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIInsights;
