import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Plus } from 'lucide-react';

interface GroupHeaderProps {
  basePath: string;
}

const GroupHeader = ({ basePath }: GroupHeaderProps) => {
  const router = useRouter();

  return (
    <div className='flex justify-between items-center'>
      <Button
        size='lg'
        variant='secondary'
        onClick={() => router.push(`${basePath}/groups`)}
        className='px-4 rounded-xl'>
        <ChevronLeft /> Back
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
