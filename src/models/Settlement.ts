import { CurrencyCode, ObjectId } from "@/lib/validators";
import { z } from "zod";
export const SettlementSchema = z.object({
  _id: ObjectId.optional(),
  fromUser: ObjectId,
  toUser: ObjectId,
  amount: z.number().positive(),
  currency: CurrencyCode,
  settledAt: z.date().default(new Date()),
  transactionId: z.string().optional(),
  createdAt: z.date().optional()
});

export type Settlement = z.infer<typeof SettlementSchema>;