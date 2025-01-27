import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Create a response object with a success message
    const response = NextResponse.json({
      message: 'User logged out successfully',
      success: true,
    });

    // Clear the token cookie by setting it to an empty value and an expired date
    response.cookies.set('token', '', {
      httpOnly: true,
      expires: new Date(0), // Expire the cookie immediately
    });

    return response;
  } catch (error: unknown) {
    // Use `unknown` instead of `any`
    // Log the error for debugging purposes
    console.error('Logout error:', error);

    // Handle the error safely
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json(
        { error: 'An unknown error occurred' },
        { status: 500 },
      );
    }
  }
}
