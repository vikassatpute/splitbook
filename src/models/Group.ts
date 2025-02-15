import { CurrencyCode, ObjectId } from "@/lib/validators";
import { z } from "zod";

export const GroupSchema = z.object({
  _id: ObjectId.optional(),
  name: z.string().min(2).max(50),
  members: z.array(ObjectId).min(1, "Group must have at least one member"),
  createdBy: ObjectId,
  defaultCurrency: CurrencyCode.default("USD"),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional()
});

export type Group = z.infer<typeof GroupSchema>;