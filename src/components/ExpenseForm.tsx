import { useState, SubmitEvent } from "react";
import type { Category } from "../types/index";

type NewExpenseInput = {
  title: string;
  amount: number;
  category: Category;
};
type ExpenseFormProps = {
  onAdd: (expense: NewExpenseInput) => void;
};
const CATEGORIES: Category[] = ["Food", "Travel", "Bills", "Shopping", "Other"];

export function ExpenseForm({ onAdd }: ExpenseFormProps) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState<Category>("Food");
  const [formError, setFormError] = useState<string | null>(null);

  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault(); // stop page reload
    setFormError(null); // clear old error

    const trimmedTitle = title.trim();
    const numericAmount = Number(amount);

    // simple checks
    if (trimmedTitle === "") {
      setFormError("Please enter a title.");
      return;
    }

    if (Number.isNaN(numericAmount) || numericAmount <= 0) {
      setFormError("Please enter an amount greater than 0.");
      return;
    }

    // send to parent
    onAdd({
      title: trimmedTitle,
      amount: numericAmount,
      category,
    });

    // reset the form
    setTitle("");
    setAmount("");
    setCategory("Food");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="...Title" value={title} onChange={(e) => setTitle(e.target.value)} />

      <input type="number" placeholder="...(e.g., 350)" value={amount} onChange={(e) => setAmount(e.target.value)} />

      <select value={category} onChange={(e) => setCategory(e.target.value as Category)}>
        {CATEGORIES.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <button type="submit">Add</button>

      {formError && (
        <p role="alert" style={{ color: "red" }}>
          {formError}
        </p>
      )}
    </form>
  );
}
