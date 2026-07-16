import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import ExportPDF from "../components/ExportPDF";

import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import PieChart from "../components/PieChart";
import BarChart from "../components/BarChart";

function Dashboard() {
  const navigate = useNavigate();

  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("");

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const res = await API.get("expenses/");
      setExpenses(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    navigate("/");
  };

  const totalIncome = expenses
    .filter((item) => item.transaction_type === "Income")
    .reduce((sum, item) => sum + Number(item.amount), 0);

  const totalExpense = expenses
    .filter((item) => item.transaction_type === "Expense")
    .reduce((sum, item) => sum + Number(item.amount), 0);

  const balance = totalIncome - totalExpense;

  const filteredExpenses = expenses.filter((expense) => {
    const matchesSearch =
      expense.title.toLowerCase().includes(search.toLowerCase()) ||
      expense.category.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      categoryFilter === "All" ||
      expense.category === categoryFilter;

    const matchesDate =
      dateFilter === "" ||
      expense.transaction_date === dateFilter;

    return matchesSearch && matchesCategory && matchesDate;
  });

  return (
    <div className="container mt-5">

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Expense Dashboard</h2>

        <button
          className="btn btn-danger"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      {/* Summary Cards */}

      <div className="row g-3 mb-4">

        <div className="col-md-4">
          <div className="card bg-success text-white">
            <div className="card-body">
              <h5>Total Income</h5>
              <h3>₹ {totalIncome}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card bg-danger text-white">
            <div className="card-body">
              <h5>Total Expense</h5>
              <h3>₹ {totalExpense}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card bg-primary text-white">
            <div className="card-body">
              <h5>Balance</h5>
              <h3>₹ {balance}</h3>
            </div>
          </div>
        </div>

      </div>

      <ExpenseForm
        fetchExpenses={fetchExpenses}
        editingExpense={editingExpense}
        setEditingExpense={setEditingExpense}
      />

      <div className="row mt-4 mb-3">

        <div className="col-md-4 mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="col-md-4 mb-2">
          <select
            className="form-select"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="Food">Food</option>
            <option value="Travel">Travel</option>
            <option value="Shopping">Shopping</option>
            <option value="Salary">Salary</option>
            <option value="Bills">Bills</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="col-md-4 mb-2">
          <input
            type="date"
            className="form-control"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          />
        </div>

      </div>
       
       <ExportPDF expenses={filteredExpenses} />

      <PieChart expenses={expenses} />

      <BarChart expenses={expenses} />

      <ExpenseList
        expenses={filteredExpenses}
        fetchExpenses={fetchExpenses}
        setEditingExpense={setEditingExpense}
      />

    </div>
  );
}

export default Dashboard;