import React, { useState } from "react";
import { HiX, HiOutlineCurrencyRupee, HiOutlineTag } from "react-icons/hi";
import "./index.css";

const SetBudgetModal = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    category: "Food",
    limit: "",
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.limit <= 0) return alert("Please enter a valid amount");

    onSave(formData);
    setFormData({ category: "Food", limit: "" }); // Reset form
    onClose();
  };

  return (
    <div className="budget-modal-overlay">
      <div className="budget-modal-container">
        {/* Header */}
        <div className="budget-modal-header">
          <div className="header-text">
            <h2>Set Category Budget</h2>
            <p>Define your monthly spending limit</p>
          </div>
          <button className="close-btn" onClick={onClose}>
            <HiX />
          </button>
        </div>

        {/* Form */}
        <form className="budget-modal-form" onSubmit={handleSubmit}>
          <div className="budget-input-group">
            <label>
              <HiOutlineTag /> Category
            </label>
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="budget-select"
            >
              <option value="Food">Food & Dining</option>
              <option value="Housing">Housing & Rent</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Transport">Transport</option>
              <option value="Shopping">Shopping</option>
              <option value="Others">Miscellaneous</option>
            </select>
          </div>

          <div className="budget-input-group">
            <label>
              <HiOutlineCurrencyRupee /> Monthly Limit
            </label>
            <div className="input-with-prefix">
              <span className="prefix">₹</span>
              <input
                type="number"
                placeholder="0.00"
                required
                value={formData.limit}
                onChange={(e) =>
                  setFormData({ ...formData, limit: e.target.value })
                }
                className="budget-input"
              />
            </div>
          </div>

          <div className="budget-modal-footer">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="confirm-btn">
              Set Limit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SetBudgetModal;
