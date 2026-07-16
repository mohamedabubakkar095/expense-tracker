import { useState, useEffect } from "react";
import API from "../api/axios";

function ExpenseForm({
  fetchExpenses,
  editingExpense,
  setEditingExpense,
}) {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
    transaction_type: "Expense",
    transaction_date: "",
  });

  useEffect(() => {
    if (editingExpense) {
      setFormData({
        title: editingExpense.title,
        amount: editingExpense.amount,
        category: editingExpense.category,
        transaction_type: editingExpense.transaction_type,
        transaction_date: editingExpense.transaction_date,
      });
    }
  }, [editingExpense]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData({
      title: "",
      amount: "",
      category: "",
      transaction_type: "Expense",
      transaction_date: "",
    });

    setEditingExpense(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingExpense) {
        await API.put(
          `expenses/${editingExpense.id}/`,
          formData
        );

        alert("Expense Updated Successfully");
      } else {
        await API.post("expenses/", formData);

        alert("Expense Added Successfully");
      }

      resetForm();
      fetchExpenses();

    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="card p-4 mb-4 shadow">
      <h3 className="mb-3">
        {editingExpense ? "Edit Expense" : "Add Expense"}
      </h3>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="title"
          className="form-control mb-3"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="amount"
          className="form-control mb-3"
          placeholder="Amount"
          value={formData.amount}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="category"
          className="form-control mb-3"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          required
        />

        <select
          name="transaction_type"
          className="form-select mb-3"
          value={formData.transaction_type}
          onChange={handleChange}
        >
          <option value="Expense">Expense</option>
          <option value="Income">Income</option>
        </select>

        <input
          type="date"
          name="transaction_date"
          className="form-control mb-3"
          value={formData.transaction_date}
          onChange={handleChange}
          required
        />

        <button className="btn btn-success w-100">
          {editingExpense ? "Update Expense" : "Add Expense"}
        </button>

      </form>
    </div>
  );
}

export default ExpenseForm;