import { z } from "zod";

// Reusable validators
export const ObjectId = z.string().refine(val => /^[0-9a-fA-F]{24}$/.test(val), "Invalid ObjectId");
export const CurrencyCode = z.enum(["USD", "INR", "EUR", "GBP"]);
export type CurrencyCode = z.infer<typeof CurrencyCode>;

export const Password = z.string()
  .min(8, "Password must be at least 8 characters")
  .max(64, "Password too long")
  .regex(/[A-Z]/, "Must contain at least one uppercase letter")
  .regex(/[a-z]/, "Must contain at least one lowercase letter")
  .regex(/[0-9]/, "Must contain at least one number");