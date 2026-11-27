import { useState } from "react";
import type { Expense } from "../types/index";

type ExpenseItemProps = {
  expense: Expense;
  onDelete: (id: string) => void;
  onEdit: (id: string, amount: number) => void;
};

export function ExpenseItem({ expense, onDelete, onEdit }: ExpenseItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [amount, setAmount] = useState(String(expense.amount));

  async function handleDelete() {
    const response = await fetch("/api/expenses", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: expense.id }),
    });

    if (!response.ok) {
      alert("Failed to delete expense");
      return;
    }

    onDelete(expense.id);
  }

  async function handleEdit() {
    const newAmount = Number(amount);

    if (!amount.trim() || !Number.isFinite(newAmount) || newAmount <= 0) {
      alert("Enter a valid amount");
      return;
    }

    const response = await fetch(`/api/expenses/${expense.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: newAmount }),
    });

    if (!response.ok) {
      alert("Failed to update expense");
      return;
    }

    onEdit(expense.id, newAmount);
    setIsEditing(false);
  }

  return (
    <div className="card">
      <h1>{expense.title}</h1>
      <p>{expense.category}</p>

      {isEditing ? (
        <div>
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />

          <button onClick={handleEdit}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div>
          <p>₹ {expense.amount}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </div>
      )}

      <p>{expense.date}</p>

      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}
