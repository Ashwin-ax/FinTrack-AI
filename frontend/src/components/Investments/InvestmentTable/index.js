import React from "react";
import axios from "axios";
import { Trash2 } from "lucide-react";
import "./index.css";
const API_URL =
  process.env.REACT_APP_BACKEND_URL || "http://localhost:5000/api";
const InvestmentTable = ({ data, onRefresh }) => {
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to remove this asset?")) {
      try {
        await axios.delete(`${API_URL}/investments/${id}`, {
          withCredentials: true,
        });
        onRefresh(); // Trigger dashboard refresh
      } catch (err) {
        console.error("Delete failed:", err);
        alert("Could not delete the asset. Check console.");
      }
    }
  };

  if (data.length === 0) {
    return (
      <div className="empty-table-state">
        <p>No assets found. Start by adding your first investment!</p>
      </div>
    );
  }

  return (
    <div className="table-responsive-wrapper">
      <table className="asset-table">
        <thead>
          <tr>
            <th>Asset</th>
            <th>Type</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Total</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item._id}>
              <td>
                <div className="asset-info">
                  <span className="asset-name">{item.assetName}</span>
                  <span className="asset-symbol">{item.symbol}</span>
                </div>
              </td>
              <td>
                <span
                  className={`badge badge-${item.assetType.toLowerCase().replace(" ", "")}`}
                >
                  {item.assetType}
                </span>
              </td>
              <td>{item.quantity}</td>
              <td>₹{Number(item.buyPrice).toLocaleString("en-IN")}</td>
              <td className="font-bold">
                ₹{(item.quantity * item.buyPrice).toLocaleString("en-IN")}
              </td>
              <td>
                <button
                  className="delete-icon-btn"
                  onClick={() => handleDelete(item._id)}
                  title="Delete Asset"
                >
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvestmentTable;
