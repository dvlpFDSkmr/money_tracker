import type { NextApiRequest, NextApiResponse } from "next";
import { expensesDB } from "../../../utils/db";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "PATCH") {
    // 405 : Method not allowed
    return res.status(405).json({ message: "Method not found" });
  }

  const id = String(req.query.id);
  const expense = expensesDB.find((item) => item.id === id);

  if (!expense) {
    // 404 task does not exist
    return res.status(404).json({ message: "id not found" });
  }
  const amount = Number(req.body?.amount);
  if (Number.isNaN(amount) || amount <= 0) {
    return res.status(400).json({ message: "Amount should be bigger than 0" });
  }

  expense.amount = amount;
  return res.status(200).json(expense);
}
