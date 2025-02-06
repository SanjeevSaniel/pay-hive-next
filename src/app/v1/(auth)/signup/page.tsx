'use client';

import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@heroui/react';
import { neodaFont } from '@/fonts/Neoda/neodaFont';

const SignupPage = () => {
  const router = useRouter();
  const [user, setUser] = useState({ name: '', email: '', password: '' });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false); // New state for loading

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post('/api/users/signup', user);

      console.log('Signup success', response.data);
      router.push('/login');
    } catch (error: unknown) {
      console.error('Signup failed', error); // Log the error

      if (error instanceof Error) {
        toast.error(error.message); // Display the error message
      } else {
        toast.error('Signup failed'); // Display a generic message
      }
    } finally {
      setLoading(false); // Set loading to false after the request is complete
    }
  };

  useEffect(() => {
    if (
      user.name.length > 0 &&
      user.email.length > 0 &&
      user.password.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className='flex min-h-svh flex-col items-center justify-center gap-6 bg-[#161616] p-6 md:p-10 dark'>
      <div className='flex w-full max-w-sm flex-col gap-6'>
        <Link
          href='/'
          className='flex items-center gap-2 self-center font-medium text-white'>
          <span className={`${neodaFont.className} text-2xl mb-1.5`}>S</span>
          <span className='text-2xl text-[#d1d3d7] font-extrabold'>
            Splitly.
          </span>
        </Link>
        <Card>
          <CardHeader className='text-center'>
            <CardTitle className='text-xl'>Create an account</CardTitle>
            <CardDescription>
              Sign up with your email and password
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSignup}>
              <div className='grid gap-6'>
                <div className='grid gap-2'>
                  <Label htmlFor='name'>Name</Label>
                  <Input
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                    id='name'
                    type='text'
                    placeholder='Your Name'
                    required
                  />
                </div>
                <div className='grid gap-2'>
                  <Label htmlFor='email'>Email</Label>
                  <Input
                    onChange={(e) =>
                      setUser({ ...user, email: e.target.value })
                    }
                    id='email'
                    type='email'
                    placeholder='you@example.com'
                    required
                  />
                </div>
                <div className='grid gap-2'>
                  <Label htmlFor='password'>Password</Label>
                  <Input
                    onChange={(e) =>
                      setUser({ ...user, password: e.target.value })
                    }
                    id='password'
                    type='password'
                    required
                  />
                </div>
                <Button
                  isLoading={loading} // Pass the loading state to the button
                  disabled={buttonDisabled}
                  type='submit'
                  className='w-full'>
                  Sign up
                </Button>
                <div className='flex justify-center gap-2 text-sm '>
                  Already have an account?
                  <Link
                    href='/v1/login'
                    className='bg-transparent border-none underline underline-offset-4'>
                    Log in
                  </Link>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignupPage;
