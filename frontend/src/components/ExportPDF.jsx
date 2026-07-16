import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function ExportPDF({ expenses }) {

  const exportPDF = () => {

    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Expense Tracker Report", 14, 20);

    const tableColumn = [
      "Title",
      "Amount",
      "Category",
      "Type",
      "Date",
    ];

    const tableRows = [];

    expenses.forEach((expense) => {
      tableRows.push([
        expense.title,
        expense.amount,
        expense.category,
        expense.transaction_type,
        expense.transaction_date,
      ]);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 30,
    });

    doc.save("Expense_Report.pdf");
  };

  return (
    <button
      className="btn btn-danger mt-3"
      onClick={exportPDF}
    >
      Export PDF
    </button>
  );
}

export default ExportPDF;