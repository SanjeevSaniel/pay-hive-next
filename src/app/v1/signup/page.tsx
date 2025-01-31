'use client';

import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const SignupPage = () => {
  const router = useRouter();
  const [user, setUser] = useState({ name: '', email: '', password: '' });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post('/api/users/signup', user);

      console.log('Signup success', response.data);
      router.push('/login');
    } catch (error: unknown) {
      // Use `unknown` instead of `any`
      console.error('Signup failed', error); // Log the error

      // Handle the error safely
      if (error instanceof Error) {
        // If the error is an instance of Error, display its message
        toast.error(error.message);
      } else {
        // If the error is not an Error object, display a generic message
        toast.error('Signup failed');
      }
    } finally {
      setLoading(false);
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
    <div className='flex flex-col items-center justify-center gap-3 min-h-screen py-2'>
      <h1>{loading ? 'Processing' : 'Signup'}</h1>
      <hr />
      <div className='flex flex-col justify-between gap-1'>
        <label htmlFor='name'>Name</label>
        <input
          className='border border-gray-300 p-2 rounded text-black'
          type='text'
          id='name'
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          placeholder='User Name'
        />
      </div>

      <div className='flex flex-col justify-between gap-1'>
        <label htmlFor='email'>Email</label>
        <input
          className='border border-gray-300 p-2 rounded text-black'
          type='email'
          id='email'
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder='Email'
        />
      </div>

      <div className='flex flex-col justify-end gap-1'>
        <label htmlFor='password'>Password</label>
        <input
          className='border border-gray-300 p-2 rounded text-black'
          type='password'
          id='password'
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder='Password'
        />
      </div>

      <button
        onClick={onSignup}
        className='px-2 py-1 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'>
        {buttonDisabled ? 'No signup' : 'Signup'}
      </button>
      <Link href='/v1/login'>Visit login page</Link>
    </div>
  );
};

export default SignupPage;
