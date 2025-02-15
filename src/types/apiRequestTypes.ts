import { ObjectId, Password } from "@/lib/validators";
import { ExpenseSchema } from "@/models/Expense";
import { UserSchema } from "@/models/User";
import { z } from "zod";

// Expense Requests
export const CreateExpenseRequest = ExpenseSchema.pick({
  description: true,
  amount: true,
  currency: true,
  splitBetween: true,
  group: true,
  splitType: true,
  splits: true
}).extend({
  splitBetween: z.array(ObjectId).min(1)
});

export type CreateExpenseRequest = z.infer<typeof CreateExpenseRequest>;

// User Requests
export const RegisterUserRequest = UserSchema.pick({
  name: true,
  email: true,
  password: true,
  currencyPreference: true
}).extend({
  password: Password
});

export type RegisterUserRequest = z.infer<typeof RegisterUserRequest>;

// Friend Request
export const FriendRequestSchema = z.object({
  email: z.string().email()
});

export type FriendRequest = z.infer<typeof FriendRequestSchema>;