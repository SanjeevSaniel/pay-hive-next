import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Group from '@/models/groupModel';

export async function GET(request: NextRequest) {
  await connectDB();
  // Extract the groupId from the URL path
  const { pathname } = new URL(request.url);
  const groupId = pathname.split('/').pop();

  if (!groupId) {
    return NextResponse.json({ error: 'Missing group ID' }, { status: 400 });
  }

  try {
    const group = await Group.findOne({ groupId });
    if (!group) {
      return NextResponse.json({ error: 'Group not found' }, { status: 404 });
    }
    return NextResponse.json(group, { status: 200 });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred';

    return NextResponse.json(
      {
        error: 'Failed to fetch group',
        details: errorMessage,
      },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest) {
  // Extract the groupId from the URL path
  const { pathname } = new URL(request.url);
  const groupId = pathname.split('/').pop();

  if (!groupId) {
    return NextResponse.json(
      { message: 'Group ID is required' },
      { status: 400 },
    );
  }

  try {
    await connectDB();
    const result = await Group.deleteOne({ groupId });

    if (result.deletedCount === 0) {
      return NextResponse.json({ message: 'Group not found' }, { status: 404 });
    }

    return NextResponse.json(
      { message: 'Group deleted successfully' },
      { status: 200 },
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred';
    console.error('Group deletion failed: ', errorMessage);

    return NextResponse.json(
      { message: 'Unable to delete group', error: errorMessage },
      { status: 500 },
    );
  }
}
