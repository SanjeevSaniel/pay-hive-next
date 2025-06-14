import { connectDB } from '@/lib/mongodb';
import User from '@/models/userModel';
import { NextResponse } from 'next/server';

export async function GET() {
  await connectDB();

  try {
    const users = await User.find();
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Failed to fetch users',
        details:
          error instanceof Error ? error.message : 'An unknown error occurred',
      },
      { status: 500 },
    );
  }
}
