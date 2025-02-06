'use client';

// import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import useAppStore from '@/stores/useAppStore';
import { Button } from '@heroui/react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

// Default Group Definition
export const createDefaultGroup = (userId: string) => ({
  groupName: 'General Expenses',
  description: 'Expenses not associated with any specific group',
  groupType: 'default',
  memberIds: [userId],
});

const LoginForm = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) => {
  const router = useRouter();
  const [user, setUser] = useState({ email: '', password: '' });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false); // New state for loading

  const addGroup = useAppStore((state) => state.addGroup);
  const setDefaultGroup = useAppStore((state) => state.setDefaultGroup);

  const fetchDataAfterLogin = async (userId: string) => {
    try {
      const groupsResponse = await axios.get('/api/groups'); // Fetch groups from API

      // Check if the default group exists
      const defaultGroupExists = groupsResponse.data.some(
        (group: { groupType: string }) => group.groupType === 'default',
      );

      // Create default group if it doesn't exist
      if (!defaultGroupExists) {
        const newDefaultGroup = createDefaultGroup(userId);
        try {
          const response = await axios.post(
            '/api/groups/create',
            newDefaultGroup,
          );
          addGroup(response.data); // Use addGroup method to add the group
          setDefaultGroup(response.data);
          //? console.log('Default group created:', response.data);
        } catch (createError) {
          console.error('Failed to create default group:', createError);
        }
      }
    } catch (error) {
      console.error('Failed to fetch data after login', error);
    }
  };

  const onLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission behavior
    setLoading(true); // Set loading to true

    try {
      // Make a POST request to the login API endpoint
      const response = await axios.post('/api/users/login', user);

      const userId = response.data.userId; // Extract the userId from the response

      //? console.log('Login success', response.data);
      toast.success('Login successful'); // Display a success toast

      await fetchDataAfterLogin(userId); // Fetch data after successful login

      // Redirect to the user-specific page
      router.push(`/v1/${userId}`);
    } catch (error: unknown) {
      console.error('Login failed', error); // Log the error

      if (error instanceof Error) {
        toast.error(`Login failed: ${error.message}`); // Display the error message
      } else {
        toast.error('Login failed'); // Display a generic error message
      }
    } finally {
      setLoading(false); // Set loading to false after the request is complete
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div
      className={cn('flex flex-col gap-6 dark', className)}
      {...props}>
      <Card>
        <CardHeader className='text-center'>
          <CardTitle className='text-xl'>Welcome back</CardTitle>
          <CardDescription>Login with your Google account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onLogin}>
            <div className='grid gap-6'>
              <div className='flex flex-col gap-4'>
                <Button
                  variant='solid'
                  className='w-full'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 30 30'>
                    <path
                      d='M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z'
                      fill='currentColor'
                    />
                  </svg>
                  Login with Google
                </Button>
              </div>
              <div className='relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border'>
                <span className='relative z-10 bg-background px-2 text-muted-foreground'>
                  Or continue with
                </span>
              </div>
              <div className='grid gap-6'>
                <div className='grid gap-2'>
                  <Label htmlFor='email'>Email</Label>
                  <Input
                    onChange={(e) =>
                      setUser({ ...user, email: e.target.value })
                    }
                    id='email'
                    type='email'
                    placeholder='m@example.com'
                    required
                  />
                </div>
                <div className='grid gap-2'>
                  <div className='flex items-center'>
                    <Label htmlFor='password'>Password</Label>
                  </div>
                  <Input
                    onChange={(e) =>
                      setUser({ ...user, password: e.target.value })
                    }
                    id='password'
                    type='password'
                    required
                  />
                  <div>
                    <Link
                      href='#'
                      className='ml-auto text-xs underline-offset-4 hover:underline'>
                      Forgot your password?
                    </Link>
                  </div>
                </div>
                <Button
                  isLoading={loading} // Pass the loading state to the button
                  disabled={buttonDisabled}
                  type='submit'
                  className='w-full'>
                  Login
                </Button>
              </div>
              <div className='flex justify-center gap-2 text-sm '>
                Don&apos;t have an account?
                <Link
                  href='/v1/signup'
                  className='bg-transparent border-none underline underline-offset-4'>
                  Sign up
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className='text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  '>
        By clicking continue, you agree to our <a href='#'>Terms of Service</a>
        and <a href='#'>Privacy Policy</a>.
      </div>
    </div>
  );
};

export default LoginForm;
