import { connectDB } from "@/lib/mongodb";
import { Friendship } from "@/models/Friendship";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return new NextResponse('Unauthorized', { status: 401 });

    const { email } = await req.json();

    await connectDB();

    // Find user by email
    const friend = await User.findOne({ email });
    if (!friend) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    // Check existing friendship
    const existingFriendship = await Friendship.findOne({
      $or: [
        { requester: session.user.id, recipient: friend._id },
        { requester: friend._id, recipient: session.user.id }
      ]
    });

    if (existingFriendship) {
      return NextResponse.json({ error: 'Friend request already exists' }, { status: 400 });
    }

    // Create new friendship
    const newFriendship = new Friendship({
      requester: session.user.id,
      recipient: friend._id,
      status: 'pending'
    });

    await newFriendship.save();

    return NextResponse.json(newFriendship, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to send friend request' },
      { status: 500 }
    );
  }
}