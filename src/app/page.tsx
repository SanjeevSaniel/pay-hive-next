import { Button } from '@/components/ui/button';
import Link from 'next/link';

const Home = () => {
  return (
    <div className='flex flex-col justify-center items-center gap-4 min-h-screen'>
      Splitly
      <div className='flex flex-col gap-2'>
        <Button asChild>
          <Link href='/v1/login'>Login</Link>
        </Button>
        <Button asChild>
          <Link href='/v1/signup'>Sign Up</Link>
        </Button>
      </div>
    </div>
  );
};

export default Home;
