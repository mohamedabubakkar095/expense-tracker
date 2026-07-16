import API from "../api/axios";

function ExpenseList({
  expenses,
  fetchExpenses,
  setEditingExpense,
}) {
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this expense?")) return;

    try {
      await API.delete(`expenses/${id}/`);
      alert("Expense Deleted Successfully");
      fetchExpenses();
    } catch (error) {
      console.log(error);
      alert("Delete Failed");
    }
  };

  return (
    <div className="card p-4 mt-4 shadow">
      <h3 className="mb-3">Expense List</h3>

      <div className="table-responsive">
        <table className="table table-bordered table-hover">

          <thead className="table-dark">
            <tr>
              <th>Title</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Type</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {expenses.length > 0 ? (
              expenses.map((expense) => (
                <tr key={expense.id}>
                  <td>{expense.title}</td>
                  <td>₹ {expense.amount}</td>
                  <td>{expense.category}</td>
                  <td>{expense.transaction_type}</td>
                  <td>{expense.transaction_date}</td>

                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => setEditingExpense(expense)}
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(expense.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No Expenses Found
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
}

export default ExpenseList;