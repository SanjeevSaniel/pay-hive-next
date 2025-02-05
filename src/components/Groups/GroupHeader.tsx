'use client';

import { Button } from '@heroui/react';
import { ChevronLeft, Plus } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

interface GroupHeaderProps {
  basePath: string;
}

const GroupHeader = ({ basePath }: GroupHeaderProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleAddExpense = () => {
    router.push(`${pathname}/add-expense`);
  };

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
        className='rounded-xl'
        onPress={handleAddExpense}>
        <Plus />
        Add Expense
      </Button>
    </div>
  );
};

export default GroupHeader;
