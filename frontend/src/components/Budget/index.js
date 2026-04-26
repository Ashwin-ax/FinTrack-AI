import React, { useState, useEffect } from "react";
import axios from "axios";
import { HiPlus, HiOutlineEmojiSad } from "react-icons/hi";
import BudgetSummary from "./BudgetSummary";
import BudgetCard from "./BudgetCard";
import SetBudgetModal from "./SetBudgetModal";
import AIInsights from "../AIInsights";
import { TailSpin } from "react-loader-spinner";
import "./index.css";
const API_URL = process.env.REACT_APP_BACKEND_URL;

const Budget = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [budgets, setBudgets] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch all necessary data
  const fetchData = async () => {
    try {
      const [budgetRes, transRes] = await Promise.all([
        axios.get(`${API_URL}/budget`, {
          withCredentials: true,
        }),
        axios.get(`${API_URL}/transactions`, {
          withCredentials: true,
        }),
      ]);
      setBudgets(budgetRes.data);
      setTransactions(transRes.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching budget data:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 2. Save Budget (Handles both New and Update)
  const handleSaveBudget = async (formData) => {
    try {
      await axios.post(`${API_URL}/budget`, formData, {
        withCredentials: true,
      });
      fetchData(); // Refresh everything after saving
    } catch (err) {
      console.error("Error saving budget:", err);
    }
  };

  const handleDeleteBudget = async (id) => {
    if (window.confirm("Are you sure you want to remove this budget limit?")) {
      try {
        await axios.delete(`${API_URL}/budget/${id}`, {
          withCredentials: true,
        });
        fetchData(); // Refresh totals and cards
        console.log("✅ Budget removed");
      } catch (err) {
        console.error("❌ Delete failed:", err);
      }
    }
  };

  // 3. Helper: Calculate spending for a specific category in the CURRENT month
  const calculateSpent = (category) => {
    const now = new Date();
    return transactions
      .filter((t) => {
        const tDate = new Date(t.date);
        return (
          t.category === category &&
          t.type === "expense" &&
          tDate.getMonth() === now.getMonth() &&
          tDate.getFullYear() === now.getFullYear()
        );
      })
      .reduce((acc, curr) => acc + Number(curr.amount), 0);
  };

  // 4. Global totals for the Summary component
  const totalBudgetLimit = budgets.reduce((acc, curr) => acc + curr.limit, 0);
  const totalMonthlySpent = budgets.reduce(
    (acc, curr) => acc + calculateSpent(curr.category),
    0,
  );

  return (
    <div className="budget-page">
      <main className="budget-container">
        <AIInsights type="budget" transactionCount={transactions.length} />
        {/* HEADER SECTION */}
        <header className="budget-main-header">
          <div className="title-group">
            <h1>Budget Planner</h1>
            <p>Master your money with precision</p>
          </div>
          <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
            <HiPlus /> <span>Set Budget</span>
          </button>
        </header>

        {loading ? (
          <div className="budget-loading">
            <TailSpin
              height="80"
              width="80"
              color="#10B981"
              ariaLabel="loading"
            />
          </div>
        ) : (
          <>
            {/* TOP SUMMARY SECTION */}
            <BudgetSummary
              totalBudget={totalBudgetLimit}
              totalSpent={totalMonthlySpent}
            />

            {/* CATEGORY GRID SECTION */}
            <div className="budget-section-title">
              <h3>Category Breakdown</h3>
              <div className="title-line"></div>
            </div>

            {budgets.length === 0 ? (
              <div className="no-budget-state">
                <HiOutlineEmojiSad />
                <h4>No Budgets Found</h4>
                <p>
                  Click "Set Budget" to start tracking your spending categories.
                </p>
              </div>
            ) : (
              <div className="budget-grid">
                {budgets.map((b) => (
                  <BudgetCard
                    key={b._id}
                    id={b._id} // Pass the ID
                    category={b.category}
                    limit={b.limit}
                    spent={calculateSpent(b.category)}
                    onDelete={handleDeleteBudget} // Pass the function
                  />
                ))}
              </div>
            )}
          </>
        )}
      </main>

      {/* MODAL COMPONENT */}
      <SetBudgetModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveBudget}
      />
    </div>
  );
};

export default Budget;
