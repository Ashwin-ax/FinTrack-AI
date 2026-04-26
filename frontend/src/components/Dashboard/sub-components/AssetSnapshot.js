import React from "react";
import { useNavigate } from "react-router-dom";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import {
  TrendingUp,
  Coins,
  BarChart3,
  Gem,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
const AssetSnapshot = ({ investments }) => {
  const navigate = useNavigate();

  const getAssetIcon = (type) => {
    switch (type) {
      case "Stock":
        return <TrendingUp size={20} color="#60a5fa" />; // Bright Blue
      case "Crypto":
        return <Coins size={20} color="#f59e0b" />; // Gold/Amber
      case "Mutual Fund":
        return <BarChart3 size={20} color="#34d399" />; // Emerald
      case "Gold":
        return <Gem size={20} color="#fbbf24" />; // Yellow
      default:
        return <TrendingUp size={20} color="#94a3b8" />; // Slate
    }
  };
  return (
    <div className="asset-card">
      <div className="asset-header">
        <h3>Asset Snapshot</h3>
        <p>Portfolio Performance</p>
      </div>

      <div className="asset-list">
        {investments.map((asset, index) => {
          const isPositive = asset.change.includes("+");
          // Dummy sparkline data
          const sparkData = [
            { v: 10 },
            { v: 15 },
            { v: 13 },
            { v: 18 },
            { v: 22 },
            { v: 20 },
            { v: 25 },
          ];

          return (
            <div key={index} className="asset-item">
              <div className="asset-meta">
                <div className="asset-icon-wrapper">
                  {getAssetIcon(asset.assetType)}
                </div>
                <div className="asset-name-group">
                  <span className="assets-name">{asset.name}</span>
                  <span className="asset-value">₹{asset.balance}</span>
                </div>
              </div>

              <div className="asset-graph">
                <ResponsiveContainer width="100%" height={40}>
                  <LineChart data={sparkData}>
                    <Line
                      type="monotone"
                      dataKey="v"
                      stroke={isPositive ? "#10b981" : "#ef4444"}
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className={`asset-change ${isPositive ? "up" : "down"}`}>
                {isPositive ? (
                  <ArrowUpRight size={14} />
                ) : (
                  <ArrowDownRight size={14} />
                )}
                {asset.change}
              </div>
            </div>
          );
        })}
      </div>
      <button
        className="view-all-assets"
        onClick={() => navigate("/investments")}
      >
        View Full Portfolio
      </button>
    </div>
  );
};

export default AssetSnapshot;
