import type { Expense, CategoryType, Category } from "../types/index";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { expensesDB } from "../utils/db";
import { ExpenseList } from "@/components/ExpenseList";
import { useState } from "react";
import { CategoryFilter } from "@/components/CategoryFilter";
import { ExpenseForm } from "@/components/ExpenseForm";
import { TotalCard } from "@/components/TotalCard";

type NewExpenseInput = {
  title: string;
  amount: number;
  category: Category;
};
type HomeProps = {
  expenses: Expense[];
};

// SSR : Server side rendering is out initial value
export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  return { props: { expenses: expensesDB } };
};

export default function Home({ expenses }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [category, setCategory] = useState<CategoryType>("All");
  const [moneyExpense, setMoneyExpense] = useState<Expense[]>(expenses);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function handlerefresh() {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/expenses");
      if (!response.ok) {
        throw new Error("Failed to fetch expenses");
      }
      const data: Expense[] = await response.json();
      setMoneyExpense(data);
    } catch {
      setError("Error while fetching expenses");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleAddExpense(expense: NewExpenseInput) {
    setError(null);
    try {
      const response = await fetch("/api/expenses", {
        method: "POST",
          headers: {
    "Content-Type": "application/json",
  },
        body: JSON.stringify(expense),
      });
      if (!response.ok) throw new Error("Failed to add expense");
      await handlerefresh();
    } catch {
      setError("Error while adding expense");
    }
  }

  function handleDelete(id: string) {
    setMoneyExpense((prev) => prev.filter((expense) => expense.id !== id));
  }

  function handleEdit(id: string, amount: number) {
    setMoneyExpense((prev) => prev.map((expense) => (expense.id === id ? { ...expense, amount: amount } : expense)));
  }

  const filteredExpenses = moneyExpense.filter((expense) => {
    return category === "All" || category === expense.category;
  });

  return (
    <div>
      <h1>Expense Tracker</h1>

      <button onClick={handlerefresh} disabled={isLoading}>
        {isLoading ? "Refreshing..." : "Refresh"}
      </button>

      {error && <p>{error}</p>}

      <TotalCard expenses={moneyExpense} />
      <ExpenseForm onAdd={handleAddExpense} />
      <CategoryFilter onDropDown={setCategory} />
      <ExpenseList expenses={filteredExpenses} onDelete={handleDelete} onEdit={handleEdit} />
    </div>
  );
}
