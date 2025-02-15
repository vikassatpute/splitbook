import { ObjectId } from "@/lib/validators";
import { z } from "zod";


const FriendshipStatus = z.enum(["pending", "accepted", "rejected"]);
export type FriendshipStatus = z.infer<typeof FriendshipStatus>;

export const FriendshipSchema = z.object({
  _id: ObjectId.optional(),
  requester: ObjectId,
  recipient: ObjectId,
  status: FriendshipStatus.default("pending"),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional()
});

export type Friendship = z.infer<typeof FriendshipSchema>;