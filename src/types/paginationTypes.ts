import { z } from "zod";

export const PaginationSchema = z.object({
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(100).default(10),
  search: z.string().optional()
});

export type Pagination = z.infer<typeof PaginationSchema>;