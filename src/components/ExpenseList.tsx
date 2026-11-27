import type { Expense } from "../types/index";
import { ExpenseItem } from "./ExpenseItem";

type ExpenseListProps = {
  expenses: Expense[];
  onDelete: (id: string) => void;
  onEdit: (id: string, amount: number) => void;
};

export function ExpenseList({ expenses, onDelete, onEdit }: ExpenseListProps) {
  return (
    <div className="list">
      {expenses.length === 0 ? (
        <h1>No expenses left...</h1>
      ) : (
        expenses.map((item) => <ExpenseItem key={item.id} expense={item} onDelete={onDelete} onEdit={onEdit} />)
      )}
    </div>
  );
}
