import type { Expense } from "../types";

export let expensesDB: Expense[] = [
  {
    id: "1",
    title: "Lunch at cafe",
    amount: 250,
    category: "Food",
    date: "2024-06-05",
  },
  {
    id: "2",
    title: "Auto to office",
    amount: 80,
    category: "Travel",
    date: "2024-06-10",
  },
  {
    id: "3",
    title: "Electricity bill",
    amount: 1200,
    category: "Bills",
    date: "2024-06-15",
  },
];

export function deleteElementbyID(id: string) {
  const exist = expensesDB.some((item) => item.id === id);

  if (!exist) {
    return false;
  }

  expensesDB = expensesDB.filter((item) => item.id !== id);
  return true;
}
