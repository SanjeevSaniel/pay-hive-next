'use client';

import { Button } from '@heroui/react';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import AddExpenseForm from '../transactions/AddExpenseForm';

interface GroupHeaderProps {
  basePath: string;
}

const GroupNavigationHeader = ({ basePath }: GroupHeaderProps) => {
  // const router = useRouter();
  // const pathname = usePathname();

  // const handleAddExpense = () => {
  //   router.push(`${pathname}/add-expense`);
  // };

  return (
    <div className='flex justify-between items-center sticky top-2'>
      <Button
        isIconOnly
        as={Link}
        size='md'
        variant='flat'
        className='rounded-xl'
        href={`${basePath}/groups`}>
        <ChevronLeft />
      </Button>

      <AddExpenseForm />

      {/* <Button
        size='md'
        variant='solid'
        className='rounded-xl'
        onPress={handleAddExpense}>
        <Plus />
        Add Expense
      </Button> */}
    </div>
  );
};

export default GroupNavigationHeader;
