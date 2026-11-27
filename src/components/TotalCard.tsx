import type { Expense } from "../types/index";

type TotalCardProps = {
  expenses: Expense[];
};

export function TotalCard({ expenses }: TotalCardProps) {
  const totalExpenses = expenses.reduce((acc, curr) => {
    return acc + curr.amount;
  }, 0);

  return (
    <div style={{ border: "1px solid #ccc", padding: "12px", margin: "12px 0", borderRadius: "6px" }}>
      <p style={{ margin: 0, fontSize: "14px", color: "#555" }}>Total Expenses</p>
      {totalExpenses === 0 ? (
        <h1>No expenses all cleared</h1>
      ) : (
        <div style={{ margin: "4px 0 0 0" }}>₹ {totalExpenses}</div>
      )}
    </div>
  );
}
