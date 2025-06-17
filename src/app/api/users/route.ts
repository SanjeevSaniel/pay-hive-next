import { connectDB } from '@/lib/mongodb';
import User from '@/models/userModel';
import { NextResponse } from 'next/server';

// This is the key fix - prevents prerendering
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectDB();

    const users = await User.find();
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error('GET /api/users error:', error);
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

export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();
    const newUser = await User.create(body);

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error('POST /api/users error:', error);
    return NextResponse.json(
      {
        error: 'Failed to create user',
        details:
          error instanceof Error ? error.message : 'An unknown error occurred',
      },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request) {
  try {
    await connectDB();

    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'User ID is required for update' },
        { status: 400 },
      );
    }

    const updatedUser = await User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error('PUT /api/users error:', error);
    return NextResponse.json(
      {
        error: 'Failed to update user',
        details:
          error instanceof Error ? error.message : 'An unknown error occurred',
      },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'User ID is required for deletion' },
        { status: 400 },
      );
    }

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(
      { message: 'User deleted successfully', user: deletedUser },
      { status: 200 },
    );
  } catch (error) {
    console.error('DELETE /api/users error:', error);
    return NextResponse.json(
      {
        error: 'Failed to delete user',
        details:
          error instanceof Error ? error.message : 'An unknown error occurred',
      },
      { status: 500 },
    );
  }
}
