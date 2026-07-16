import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

function BarChart({ expenses }) {
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
        label: "Amount",
        data: [income, expense],
        backgroundColor: [
          "#198754",
          "#dc3545",
        ],
      },
    ],
  };

  return (
    <div className="card shadow mt-4 p-4">
      <h3 className="text-center mb-3">
        Income vs Expense
      </h3>

      <Bar data={data} />
    </div>
  );
}

export default BarChart;