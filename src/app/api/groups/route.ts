import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Group from '@/models/groupModel';

connectDB();

export async function GET() {
  try {
    const groups = await Group.find();
    return NextResponse.json(groups, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Failed to fetch groups',
        details:
          error instanceof Error ? error.message : 'An unknown error occurred',
      },
      { status: 500 },
    );
  }
}
