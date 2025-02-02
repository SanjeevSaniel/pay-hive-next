import { connectDB } from '@/lib/mongodb';
import Group from '@/models/groupModel';
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

// Connect to MongoDB
connectDB();

export async function POST(request: Request) {
  const body = await request.json();
  const { groupName, description, memberIds, groupType } = body;

  // Validate input
  if (!groupName || !groupType) {
    return NextResponse.json({ error: 'Invalid input data' }, { status: 400 });
  }

  try {
    const newGroup = new Group({
      groupId: uuidv4(), // Generate a unique ID for the group
      groupName,
      description,
      memberIds: memberIds || [], // Use an empty array if memberIds is undefined
      groupType,
    });

    // Save the new group to the database
    const savedGroup = await newGroup.save();

    return NextResponse.json(savedGroup, { status: 201 });
  } catch (error: unknown) {
    // Safely handle the error and return a JSON response with appropriate details
    return NextResponse.json(
      {
        error: 'Failed to create group',
        details:
          error instanceof Error ? error.message : 'An unknown error occurred',
      },
      { status: 500 },
    );
  }
}
