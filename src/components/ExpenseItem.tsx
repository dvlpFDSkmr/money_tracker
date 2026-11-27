import type { Expense } from "../types/index";

type ExpenseItemProps = {
  expense: Expense;
};

export function ExpenseItem({ expense }: ExpenseItemProps) {
  return (
    <div className="card">
      <h1>{expense.title}</h1>
      <p>{expense.category}</p>
      <p>
        <b>₹ {expense.amount}</b>
      </p>
      <p>
        <i>{expense.date}</i>
      </p>
    </div>
  );
}
