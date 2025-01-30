import { connectDB } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';

// Connect to the database
connectDB();

// Define the type for the request body
interface SignupRequest {
  name: string;
  email: string;
  password: string;
}

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const reqBody: SignupRequest = await request.json();
    const { name, email, password } = reqBody;

    console.log(reqBody);

    // Check if user already exists
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 },
      );
    }

    // Hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Create user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    const savedUser = await newUser.save();
    console.log(savedUser);

    // Return a success response
    return NextResponse.json({
      message: 'User created successfully',
      success: true,
      savedUser,
    });
  } catch (error: unknown) {
    // Use `unknown` instead of `any`
    // Log the error for debugging purposes
    console.error('Signup error:', error);

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
