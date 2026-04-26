import React, { useState, useEffect } from "react";
import { HiX } from "react-icons/hi";
import "./index.css";

const AddTransactionModal = ({ isOpen, onClose, onAdd, editingTx }) => {
  // 1. Initial State
  const initialFormState = {
    desc: "",
    amount: "",
    category: "Food",
    type: "expense",
    date: new Date().toISOString().split("T")[0],
  };

  const [formData, setFormData] = useState(initialFormState);

  // 2. Sync Form with editingTx prop
  useEffect(() => {
    if (editingTx) {
      // If editing, populate with existing data
      setFormData({
        desc: editingTx.desc || "",
        amount: editingTx.amount || "",
        category: editingTx.category || "Food",
        type: editingTx.type || "expense",
        // MongoDB dates need to be sliced to YYYY-MM-DD for the HTML input
        date: editingTx.date
          ? new Date(editingTx.date).toISOString().split("T")[0]
          : initialFormState.date,
      });
    } else {
      // If adding new, reset to empty
      setFormData(initialFormState);
    }
  }, [editingTx, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (formData.amount <= 0) return alert("Please enter a valid amount");

    // Send data back to the parent (Transactions/index.js)
    onAdd(formData);

    // Reset form for next use
    setFormData(initialFormState);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-card">
        <div className="modal-head">
          <h2>{editingTx ? "Edit Transaction" : "Add Transaction"}</h2>
          <button className="close-icon-btn" onClick={onClose}>
            <HiX />
          </button>
        </div>

        <form className="modal-body" onSubmit={handleSubmit}>
          <div className="input-box full">
            <label>Description</label>
            <input
              name="desc"
              type="text"
              placeholder="e.g. Salary, Rent, Dinner"
              required
              value={formData.desc}
              onChange={handleChange}
            />
          </div>

          <div className="input-row">
            <div className="input-box">
              <label>Amount (₹)</label>
              <input
                name="amount"
                type="number"
                placeholder="0.00"
                required
                value={formData.amount}
                onChange={handleChange}
              />
            </div>
            <div className="input-box">
              <label>Type</label>
              <select name="type" value={formData.type} onChange={handleChange}>
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>
          </div>

          <div className="input-row">
            <div className="input-box">
              <label>Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="Food">Food</option>
                <option value="Salary">Salary</option>
                <option value="Housing">Housing</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Shopping">Shopping</option>
                <option value="Transport">Transport</option>
                <option value="Others">Others</option>
              </select>
            </div>
            <div className="input-box">
              <label>Date</label>
              <input
                name="date"
                type="date"
                required
                value={formData.date}
                onChange={handleChange}
              />
            </div>
          </div>

          <button type="submit" className="save-btn">
            {editingTx ? "Update Transaction" : "Save Transaction"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTransactionModal;
