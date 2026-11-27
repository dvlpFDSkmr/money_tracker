export type Expense = {
  id: string;
  title: string;
  amount: number;
  category: Category;
  date: string;
};

export type Category = "Food" | "Travel" | "Bills" | "Shopping" | "Other";

export type CategoryType = "All" | Category;
