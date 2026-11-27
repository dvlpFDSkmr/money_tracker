
import type { Expense } from "../types/index";

type ExpenseItemProps = {
  expense: Expense;
  onDelete: (id: string) => void;
};

export function ExpenseItem({ expense, onDelete }: ExpenseItemProps) {

  async function handleDelete() {
    const response = await fetch("/api/expenses", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: expense.id }),
    });

    if (!response.ok) {
      alert("Failed to delete expense");
      return;
    }

    onDelete(expense.id);
  }

  return (
    <div className="card">
      <h1>{expense.title}</h1>
      <p>{expense.category}</p>
      <p>₹ {expense.amount}</p>
      <p>{expense.date}</p>

      <button onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
}
