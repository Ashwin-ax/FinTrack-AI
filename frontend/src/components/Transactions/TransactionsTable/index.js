import React from "react";
import {
  HiOutlinePencilAlt,
  HiOutlineTrash,
  HiTrendingUp,
  HiTrendingDown,
} from "react-icons/hi";
import "./index.css";

const TransactionsTable = ({ data, onDelete, onEdit }) => {
  // If no search results are found
  if (data.length === 0) {
    return (
      <div className="empty-state">
        <p>No transactions found matching your search or filters.</p>
      </div>
    );
  }

  return (
    <div className="table-wrapper">
      <table className="tx-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((tx) => (
            <tr key={tx._id} className="tx-row">
              <td data-label="Date">
                {new Date(tx.date).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </td>
              <td data-label="Description" className="tx-desc">
                {tx.desc}
              </td>
              <td data-label="Category">
                <span className="category-badge">{tx.category}</span>
              </td>
              <td
                data-label="Amount"
                className={`tx-amount ${
                  tx.type === "income" ? "text-green" : "text-red"
                }`}
              >
                <div className="amount-wrapper">
                  {tx.type === "income" ? <HiTrendingUp /> : <HiTrendingDown />}
                  <span>
                    {tx.type === "income" ? "+" : "-"}₹
                    {Number(tx.amount).toLocaleString()}
                  </span>
                </div>
              </td>
              <td data-label="Actions" className="actions-cell">
                <div className="action-btns">
                  <button
                    className="action-icon edit"
                    onClick={() => onEdit(tx)} // Passing the full object (including _id)
                    title="Edit Transaction"
                  >
                    <HiOutlinePencilAlt />
                  </button>
                  <button
                    className="action-icon delete"
                    onClick={() => onDelete(tx._id)} // Passing only the ID for deletion
                    title="Delete Transaction"
                  >
                    <HiOutlineTrash />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionsTable;
