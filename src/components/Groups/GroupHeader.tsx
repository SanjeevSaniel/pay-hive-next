'use client';

import { Button } from '@/components/ui/button';
import { ChevronLeft, Plus } from 'lucide-react';
import Link from 'next/link';

interface GroupHeaderProps {
  basePath: string;
}

const GroupHeader = ({ basePath }: GroupHeaderProps) => {
  return (
    <div className='flex justify-between items-center'>
      <Button
        asChild
        size='default'
        variant='secondary'
        className='rounded-xl'>
        <Link href={`${basePath}/groups`}>
          <ChevronLeft /> Back
        </Link>
      </Button>

      <Button
        size='default'
        variant='default'
        className='rounded-xl'>
        <Plus />
        Add Expense
      </Button>
    </div>
  );
};

export default GroupHeader;
