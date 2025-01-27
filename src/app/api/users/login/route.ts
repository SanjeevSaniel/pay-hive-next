import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Connect to the database
connect();

// Define the type for the request body
interface LoginRequest {
  email: string;
  password: string;
}

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const reqBody: LoginRequest = await request.json();
    const { email, password } = reqBody;
    console.log(reqBody);

    // Check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: 'User does not exist' },
        { status: 400 },
      );
    }

    // Check if password is correct
    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 400 });
    }

    // Create token data
    const tokenData = {
      id: user._id,
      name: user.name,
      email: user.email,
    };

    // Create token
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: '1d',
    });

    // Create a response object
    const response = NextResponse.json({
      message: 'Login successful',
      success: true,
    });

    // Set the token in a cookie
    response.cookies.set('token', token, {
      httpOnly: true,
    });

    return response;
  } catch (error: unknown) {
    // Use `unknown` instead of `any`
    // Log the error
    console.error('Login error:', error);

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
