import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function PieChart({ expenses }) {
  const income = expenses
    .filter((item) => item.transaction_type === "Income")
    .reduce((sum, item) => sum + Number(item.amount), 0);

  const expense = expenses
    .filter((item) => item.transaction_type === "Expense")
    .reduce((sum, item) => sum + Number(item.amount), 0);

  const data = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        data: [income, expense],
        backgroundColor: [
          "#198754",
          "#dc3545",
        ],
      },
    ],
  };

  return (
    <div className="card p-4 mt-4 shadow">
      <h3 className="text-center mb-3">
        Income vs Expense
      </h3>

      <Pie data={data} />
    </div>
  );
}

export default PieChart;