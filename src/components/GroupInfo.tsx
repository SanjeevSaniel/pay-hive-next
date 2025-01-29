import { Group } from '@/types/types';

interface GroupInfoProps {
  group: Group;
}

const GroupInfo = ({ group }: GroupInfoProps) => {
  return (
    <div className='flex flex-col gap-2 p-2'>
      <div className='flex flex-col space-y-2 mt-4'>
        <div className='flex items-center space-x-2'>
          <span className='font-bold'>Created Date:</span>
          <span>{new Date(group.createdDate).toLocaleDateString()}</span>
        </div>
        <div className='flex items-center space-x-2'>
          <span className='font-bold'>Members Count:</span>
          <span>{group.membersCount}</span>
        </div>
        {group.borrowedAmount > 0 && (
          <div className='flex items-center space-x-2'>
            <span className='font-bold'>Borrowed Amount:</span>
            <span>₹{group.borrowedAmount}</span>
          </div>
        )}
        {group.owedAmount > 0 && (
          <div className='flex items-center space-x-2'>
            <span className='font-bold'>Owed Amount:</span>
            <span>₹{group.owedAmount}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default GroupInfo;
