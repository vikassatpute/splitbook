import { CurrencyCode, ObjectId } from "@/lib/validators";
import { z } from "zod";

const SplitType = z.enum(["EQUAL", "PERCENTAGE", "CUSTOM"]);

const Split = z.object({
  user: ObjectId,
  amount: z.number().positive(),
  percentage: z.number().min(0).max(100).optional(),
});

export const ExpenseSchema = z.object({
  description: z.string().min(3).max(100),
  amount: z.number().positive().multipleOf(0.01),
  currency: CurrencyCode.default("USD"),
  paidBy: ObjectId,
  splitBetween: z.array(ObjectId).min(1, "At least one participant required"),
  group: ObjectId.optional(),
  splitType: SplitType.default("EQUAL"),
  splits: z.array(Split).optional()
    .refine(splits => splits?.every(s => s.amount > 0), {
      message: "All split amounts must be positive"
    }),
});
export type Expense = z.infer<typeof ExpenseSchema>;