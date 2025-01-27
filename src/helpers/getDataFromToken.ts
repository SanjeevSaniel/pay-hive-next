import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

// Define the structure of the decoded token
interface DecodedToken {
  id: string;
  // Add other fields if necessary
}

export const getDataFromToken = (request: NextRequest): string => {
  // Get the token from cookies
  const token = request.cookies.get('token')?.value;

  // Throw an error if the token is missing
  if (!token) {
    throw new Error('No token found in cookies');
  }

  // Ensure the TOKEN_SECRET environment variable is defined
  const tokenSecret = process.env.TOKEN_SECRET;
  if (!tokenSecret) {
    throw new Error('TOKEN_SECRET environment variable is not defined');
  }

  try {
    // Verify the token and assert the type of the decoded payload
    const decodedToken = jwt.verify(token, tokenSecret) as DecodedToken;
    return decodedToken.id;
  } catch (error) {
    // Handle errors and ensure the error is of type Error
    if (error instanceof Error) {
      throw new Error(`Token verification failed: ${error.message}`);
    } else {
      throw new Error('Token verification failed: Unknown error');
    }
  }
};
