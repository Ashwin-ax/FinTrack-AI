import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  HiPlus,
  HiDownload,
  HiSearch,
  HiFilter,
  HiTrendingUp,
  HiTrendingDown,
} from "react-icons/hi";
import { TailSpin } from "react-loader-spinner";
import TransactionsTable from "./TransactionsTable";
import AddTransactionModal from "./AddTransactionModal";
import AIInsights from "../AIInsights";
import "./index.css";
const API_URL = process.env.REACT_APP_BACKEND_URL;
const Transactions = () => {
  // --- STATE ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [editingTx, setEditingTx] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const recordsPerPage = 10;

  // --- 1. INITIAL FETCH ---
  const fetchTransactions = async () => {
    try {
      const response = await axios.get(`${API_URL}/transactions`, {
        withCredentials: true,
      });
      setTransactions(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching transactions:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  // --- 2. PAGINATION RESET ---
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filterType]);

  // --- 3. CRUD LOGIC (DEBUGGED) ---
  const handleSaveTransaction = async (formData) => {
    try {
      if (editingTx && editingTx._id) {
        // --- EDIT MODE (PUT) ---
        const response = await axios.put(
          `${API_URL}/transactions/${editingTx._id}`,
          formData,
          { withCredentials: true },
        );

        // Replace the specific item in state using the ID from MongoDB (_id)
        setTransactions((prev) =>
          prev.map((t) => (t._id === editingTx._id ? response.data : t)),
        );
        console.log("✅ Transaction Updated in Database");
      } else {
        // --- ADD MODE (POST) ---
        const response = await axios.post(`${API_URL}/transactions`, formData, {
          withCredentials: true,
        });
        setTransactions((prev) => [response.data, ...prev]);
        console.log("✅ New Transaction Created");
      }

      // CLOSE AND CLEANUP
      setIsModalOpen(false);
      setEditingTx(null);
    } catch (err) {
      console.error(
        "❌ Save failed:",
        err.response?.data?.message || err.message,
      );
      alert("Error saving transaction. Please check console.");
    }
  };

  const handleEditClick = (tx) => {
    setEditingTx(tx);
    setIsModalOpen(true);
  };

  const handleDeleteTransaction = async (id) => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      try {
        await axios.delete(`${API_URL}/transactions/${id}`, {
          withCredentials: true,
        });
        setTransactions((prev) => prev.filter((tx) => tx._id !== id));
        console.log("✅ Deleted");
      } catch (err) {
        console.error("Delete failed", err);
      }
    }
  };

  const handleExport = () => {
    if (transactions.length === 0) {
      alert("No transactions to export!");
      return;
    }

    // 1. Define CSV Headers
    const headers = ["Date,Description,Category,Type,Amount\n"];

    // 2. Format rows
    const rows = filteredTransactions.map((tx) => {
      const cleanDesc = tx.desc.replace(/,/g, ""); // Remove commas from description to avoid CSV errors
      return `${new Date(tx.date).toLocaleDateString()},${cleanDesc},${tx.category},${tx.type},${tx.amount}`;
    });

    // 3. Combine headers and rows
    const csvContent = headers.concat(rows.join("\n")).join("");

    // 4. Create a Blob (Binary Large Object) for the file
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    // 5. Create a temporary hidden link to trigger download
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",
      `FinTrack_Report_${new Date().toLocaleDateString()}.csv`,
    );
    document.body.appendChild(link);
    link.click();

    // 6. Cleanup
    document.body.removeChild(link);
  };

  // --- 4. DATA PROCESSING ---
  const filteredTransactions = transactions.filter((tx) => {
    const matchesSearch = tx.desc
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === "all" || tx.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, curr) => acc + Number(curr.amount), 0);

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, curr) => acc + Number(curr.amount), 0);

  const netBalance = totalIncome - totalExpense;

  // Pagination slicing
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredTransactions.slice(
    indexOfFirstRecord,
    indexOfLastRecord,
  );
  const totalPages = Math.ceil(filteredTransactions.length / recordsPerPage);

  return (
    <div className="tx-page">
      <main className="tx-container">
        <AIInsights
          type="transactions"
          transactionCount={transactions.length}
        />
        {/* HEADER */}
        <header className="tx-header">
          <div className="tx-title">
            <h1>Transactions</h1>
            <p>Track and manage your financial flow</p>
          </div>
          <div className="tx-header-btns">
            <button className="btn-secondary" onClick={handleExport}>
              <HiDownload /> <span>Export</span>
            </button>
            <button
              className="btn-primary"
              onClick={() => {
                setEditingTx(null);
                setIsModalOpen(true);
              }}
            >
              <HiPlus /> <span>Add Transaction</span>
            </button>
          </div>
        </header>

        {/* SUMMARY */}
        <section className="tx-summary">
          <div className="stat-card balance">
            <div className="stat-content">
              <span>Total Balance</span>
              <h3>₹{netBalance.toLocaleString()}</h3>
            </div>
            <div className="stat-icon">
              <HiTrendingUp />
            </div>
          </div>
          <div className="stat-card inc">
            <div className="stat-content">
              <span>Monthly Income</span>
              <h3 className="text-green">+₹{totalIncome.toLocaleString()}</h3>
            </div>
            <div className="stat-icon">
              <HiTrendingUp />
            </div>
          </div>
          <div className="stat-card expense">
            <div className="stat-content">
              <span>Monthly Expense</span>
              <h3 className="text-red">-₹{totalExpense.toLocaleString()}</h3>
            </div>
            <div className="stat-icon">
              <HiTrendingDown />
            </div>
          </div>
        </section>

        {/* FILTERS */}
        <section className="tx-filters">
          <div className="search-box">
            <HiSearch className="icon" />
            <input
              type="text"
              placeholder="Search by description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="filter-actions">
            <select
              className="date-select"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all">All Transactions</option>
              <option value="income">Income Only</option>
              <option value="expense">Expenses Only</option>
            </select>
            <button className="btn-filter">
              <HiFilter /> Filter
            </button>
          </div>
        </section>

        {/* TABLE & PAGINATION */}
        {loading ? (
          <div className="transactions-loading-spinner">
            <TailSpin color="#10b981" height={50} width={50} />
          </div>
        ) : (
          <>
            <TransactionsTable
              data={currentRecords}
              onDelete={handleDeleteTransaction}
              onEdit={handleEditClick}
            />

            {totalPages > 1 && (
              <div className="pagination-container">
                <button
                  className="page-btn"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                >
                  Previous
                </button>
                <div className="page-info">
                  Page <span>{currentPage}</span> of {totalPages}
                </div>
                <button
                  className="page-btn"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </main>

      <AddTransactionModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTx(null);
        }}
        onAdd={handleSaveTransaction}
        editingTx={editingTx}
      />
    </div>
  );
};

export default Transactions;
