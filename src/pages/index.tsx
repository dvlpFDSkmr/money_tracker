import type { Expense, CategoryType } from "../types/index";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { expensesDB } from "../utils/db";
import { ExpenseList } from "@/components/ExpenseList";
import { useState } from "react";
import { CategoryFilter } from "@/components/CategoryFilter";

type HomeProps = {
  expenses: Expense[];
};

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  return { props: { expenses: expensesDB } };
};

export default function Home({ expenses }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [category, setCategory] = useState<CategoryType>("All");

  const filteredExpenses: Expense[] = expenses.filter((expense) => {
    const CategoryFilter: boolean = category === "All" ? true : category === expense.category;
    return CategoryFilter;
  });

  return (
    <div>
      <h1>Expense Tracker</h1>
      <CategoryFilter onDropDown={setCategory} />
      <ExpenseList expenses={filteredExpenses} />
    </div>
  );
}
