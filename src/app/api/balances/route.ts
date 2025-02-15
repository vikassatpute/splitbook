import { Balance } from "@/models/Balance";


export async function calculateBalances(expense: ExpenseDocument) {
  const totalAmount = expense.amount;
  const splitCount = expense.splitBetween.length;
  const perPersonShare = totalAmount / splitCount;

  // Update balances for all involved users
  for (const userId of expense.splitBetween) {
    if (userId.toString() !== expense.paidBy.toString()) {
      await Balance.findOneAndUpdate(
        {
          $or: [
            { creditor: expense.paidBy, debtor: userId },
            { creditor: userId, debtor: expense.paidBy }
          ]
        },
        {
          $inc: {
            amount: userId.toString() === expense.paidBy.toString()
              ? -perPersonShare
              : perPersonShare
          }
        },
        { upsert: true, new: true }
      );
    }
  }
}