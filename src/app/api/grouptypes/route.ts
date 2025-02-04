import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import GroupType from '@/models/groupModel';

connectDB();

export async function GET() {
  try {
    const groupTypes = await GroupType.find();
    return NextResponse.json(groupTypes, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Failed to fetch group types',
        details:
          error instanceof Error ? error.message : 'An unknown error occurred',
      },
      { status: 500 },
    );
  }
}
