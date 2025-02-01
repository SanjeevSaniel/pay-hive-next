'use client';

import { Button } from '@/components/ui/button';
import { ChevronLeft, Pencil } from 'lucide-react';
import Link from 'next/link';
import useBasePath from '@/hooks/useBasePath';

interface AccountSectionHeaderProps {
  heading: string;
}

const AccountSectionHeader = ({ heading }: AccountSectionHeaderProps) => {
  const basePath = useBasePath();

  if (!basePath) {
    return <div>Loading...</div>; // Display loading indicator until basePath is available
  }

  return (
    <div className='flex flex-col space-y-2'>
      <div className='flex justify-between items-center mb-4'>
        <Button
          asChild
          size='default'
          variant='secondary'
          className='rounded-xl'>
          <Link href={`${basePath}/account`}>
            <ChevronLeft /> Back
          </Link>
        </Button>

        {/* <Button
          size='default'
          variant='default'
          className='rounded-xl'>
          <Pencil /> Edit
        </Button> */}
      </div>
      <h1 className='text-2xl font-bold'>{heading}</h1>
    </div>
  );
};

export default AccountSectionHeader;
