import { Button, ButtonGroup } from '@heroui/react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className='flex flex-col justify-center items-center gap-4 min-h-screen'>
      Pay Hive
      <ButtonGroup className='flex flex-col gap-2'>
        <Link href='/v1/login'>
          <Button>Login</Button>
        </Link>
        <Link href='/v1/signup'>
          <Button>Sign Up</Button>
        </Link>
      </ButtonGroup>
    </div>
  );
}
