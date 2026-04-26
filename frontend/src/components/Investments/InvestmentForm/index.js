import React, { useState } from "react";
import axios from "axios";
import { X, Save, AlertCircle } from "lucide-react";
import "./index.css";
const API_URL =
  process.env.REACT_APP_BACKEND_URL || "http://localhost:5000/api";
const InvestmentForm = ({ onAdd, onClose }) => {
  const [formData, setFormData] = useState({
    assetName: "",
    symbol: "",
    assetType: "Stock",
    quantity: "",
    buyPrice: "",
    currentPrice: "", // NEW FIELD
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await axios.post(`${API_URL}/investments`, formData, {
        withCredentials: true,
      });
      onAdd();
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save investment");
    }
  };

  return (
    <div className="form-card-mobile">
      <div className="form-header">
        <h3>Add New Asset</h3>
        <button className="close-btn" onClick={onClose}>
          <X size={20} />
        </button>
      </div>

      {error && (
        <div className="form-error">
          <AlertCircle size={16} /> {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="investment-form-fields">
        <div className="input-group">
          <label>Asset Name</label>
          <input
            type="text"
            placeholder="e.g. Tata Motors"
            value={formData.assetName}
            onChange={(e) =>
              setFormData({ ...formData, assetName: e.target.value })
            }
            required
          />
        </div>

        <div className="row-inputs">
          <div className="input-group">
            <label>Symbol</label>
            <input
              type="text"
              placeholder="TATAMOTORS"
              value={formData.symbol}
              onChange={(e) =>
                setFormData({ ...formData, symbol: e.target.value })
              }
              required
            />
          </div>
          <div className="input-group">
            <label>Type</label>
            <select
              value={formData.assetType}
              onChange={(e) =>
                setFormData({ ...formData, assetType: e.target.value })
              }
            >
              <option value="Stock">Stock</option>
              <option value="Crypto">Crypto</option>
              <option value="Mutual Fund">MF</option>
              <option value="Gold">Gold</option>
            </select>
          </div>
        </div>

        <div className="row-inputs">
          <div className="input-group">
            <label>Quantity</label>
            <input
              type="number"
              value={formData.quantity}
              onChange={(e) =>
                setFormData({ ...formData, quantity: e.target.value })
              }
              required
            />
          </div>
          <div className="input-group">
            <label>Buy Price</label>
            <input
              type="number"
              value={formData.buyPrice}
              onChange={(e) =>
                setFormData({ ...formData, buyPrice: e.target.value })
              }
              required
            />
          </div>
        </div>

        {/* NEW INPUT FIELD FOR P&L CALCULATION */}
        <div className="input-group">
          <label>Current Market Price (Optional)</label>
          <input
            type="number"
            placeholder="Defaults to Buy Price if empty"
            value={formData.currentPrice}
            onChange={(e) =>
              setFormData({ ...formData, currentPrice: e.target.value })
            }
          />
        </div>

        <button type="submit" className="submit-btn">
          <Save size={18} /> Save Asset
        </button>
      </form>
    </div>
  );
};

export default InvestmentForm;
