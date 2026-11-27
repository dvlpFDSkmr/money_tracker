import type { Expense, CategoryType } from "../types/index";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { expensesDB } from "../utils/db";
import { ExpenseList } from "@/components/ExpenseList";
import { useState } from "react";
import { CategoryFilter } from "@/components/CategoryFilter";

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
      const response = await fetch("/api/expenses", { cache: "no-store" });
      if (!response.ok) throw new Error("Failed to load responses");

      const data: Expense[] = await response.json();
      setMoneyExpense(data);
    } catch {
      setError(`Error while fetching`);
    } finally {
      setIsLoading(false);
    }
  }

  const filteredExpenses = moneyExpense.filter((expense) => {
    return category === "All" || category === expense.category;
  });

  if (isLoading) {
    return <h1>...Loading</h1>;
  }
  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <div>
      <h1>Expense Tracker</h1>
      <button onClick={handlerefresh}>Refresh</button>
      <CategoryFilter onDropDown={setCategory} />
      <ExpenseList expenses={filteredExpenses} />
    </div>
  );
}
