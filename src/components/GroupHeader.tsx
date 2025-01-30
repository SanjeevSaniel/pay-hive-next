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
        size='lg'
        variant='secondary'
        className='px-4 rounded-xl'>
        <Link href={`${basePath}/groups`}>
          <ChevronLeft /> Back
        </Link>
      </Button>

      <Button
        size='lg'
        variant='outline'
        className='px-4 text-md rounded-xl'>
        <Plus />
        New Expense
      </Button>
    </div>
  );
};

export default GroupHeader;
