'use client';

import { Button } from '@heroui/react';
// import { Button } from '@/components/ui/button';
import { ChevronLeft, Plus } from 'lucide-react';
import Link from 'next/link';

interface GroupHeaderProps {
  basePath: string;
}

const GroupHeader = ({ basePath }: GroupHeaderProps) => {
  return (
    <div className='flex justify-between items-center'>
      <Button
        isIconOnly
        as={Link}
        size='md'
        variant='flat'
        className='rounded-xl'
        href={`${basePath}/groups`}>
        <ChevronLeft />
      </Button>

      <Button
        size='md'
        variant='solid'
        className='rounded-xl'>
        <Plus />
        Add Expense
      </Button>
    </div>
  );
};

export default GroupHeader;
