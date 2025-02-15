import { CurrencyCode, ObjectId } from "@/lib/validators";
import { z } from "zod";
export const BalanceSchema = z.object({
  _id: ObjectId.optional(),
  creditor: ObjectId,
  debtor: ObjectId,
  amount: z.number().refine(n => Math.abs(n) >= 0.01, {
    message: "Amount must be at least 0.01"
  }),
  currency: CurrencyCode,
  updatedAt: z.date().optional()
});

export type Balance = z.infer<typeof BalanceSchema>;