import { connectDB } from '@/dbConfig/dbConfig';
import Group from '@/models/GroupModel';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  await connectDB();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Missing group ID' }, { status: 400 });
  }

  try {
    const group = await Group.findOne({ groupId: id });
    if (!group) {
      return NextResponse.json({ error: 'Group not found' }, { status: 404 });
    }
    return NextResponse.json(group, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Failed to fetch group',
        details:
          error instanceof Error ? error.message : 'An unknown error occurred',
      },
      { status: 500 },
    );
  }
}
