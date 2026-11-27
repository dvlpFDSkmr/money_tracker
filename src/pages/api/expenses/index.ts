import type { NextApiRequest, NextApiResponse } from "next";
import { expensesDB, deleteElementbyID } from "../../../utils/db";
import type { Expense } from "../../../types/index";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    // 200 : Get successfull
    return res.status(200).json(expensesDB);
  }

  const { title, amount, category } = req.body;

  if (req.method === "POST") {
    if (!title || title.trim() === "") {
      // 400 : Bad status
      return res.status(400).json({ message: "Invalid title" });
    } else if (isNaN(Number(amount)) || Number(amount) < 0) {
      return res.status(400).json({ message: "Invalid amount" });
    }

    const newExpense: Expense = {
      id: Date.now().toString(),
      title: String(title).trim(),
      amount: amount,
      category,
      date: Date.now().toString(),
    };

    expensesDB.push(newExpense);

    // 201 : Successfull post
    return res.status(201).json(expensesDB);
  }

  if (req.method === "DELETE") {
    const { id } = req.body;
    if (!id || id.trim() === "") {
      // 400 : Bad status
      return res.status(400).json({ message: "Invalid title" });
    }
    const deleted = deleteElementbyID(id);
    if (!deleted) {
      return res.status(400).json({ message: "Invalid Deletion Operation" });
    }

    return res.status(201).json({ deletedID: id });
  }

  // 405 : Method not allowed
  return res.status(405).json({ message: "Method not found" });
}
