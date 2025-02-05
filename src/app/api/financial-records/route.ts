import { connectDB } from '@/lib/mongodb';
import FinancialRecord from '@/models/FinancialRecord';
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

// GET Method
export async function GET() {
  await connectDB();

  try {
    const records = await FinancialRecord.find();
    return NextResponse.json(records, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Failed to fetch financial records',
        details:
          error instanceof Error ? error.message : 'An unknown error occurred',
      },
      { status: 500 },
    );
  }
}

// POST Method
export async function POST(request: Request) {
  await connectDB();

  try {
    const body = await request.json();
    const newRecord = new FinancialRecord({
      recordId: `FR-${uuidv4()}`,
      ...body,
    });
    await newRecord.save();

    return NextResponse.json(newRecord, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Failed to create financial record',
        details:
          error instanceof Error ? error.message : 'An unknown error occurred',
      },
      { status: 500 },
    );
  }
}
