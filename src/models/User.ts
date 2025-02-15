import { CurrencyCode, ObjectId, Password } from "@/lib/validators";
import { z } from "zod";
export const UserSchema = z.object({
  _id: ObjectId.optional(),
  name: z.string().min(2, "Name too short").max(50, "Name too long"),
  email: z.string().email("Invalid email address"),
  password: Password.optional(),
  emailVerified: z.date().optional(),
  image: z.string().url("Invalid URL").optional(),
  currencyPreference: CurrencyCode.default("USD"),
  friends: z.array(ObjectId).default([]),
  groups: z.array(ObjectId).default([]),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional()
});

export type User = z.infer<typeof UserSchema>;