import { connectDB } from '@/dbConfig/dbConfig';
import FinancialRecord from '@/models/FinancialRecord';
import { NextResponse } from 'next/server';

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
