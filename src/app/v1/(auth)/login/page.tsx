import LoginForm from '@/components/Auth/login-form';
import Link from 'next/link';
import { neodaFont } from '@/fonts/Neoda/neodaFont';

const LoginPage = () => {
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
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
