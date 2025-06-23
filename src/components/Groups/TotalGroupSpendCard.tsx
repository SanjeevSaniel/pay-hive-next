'use client';

import { Card, CardBody, CardHeader } from '@heroui/card';
import { Sigma } from 'lucide-react'; // Importing the Sigma icon

interface TotalGroupSpendCardProps {
  totalSpend: number;
}

const TotalGroupSpendCard = ({ totalSpend }: TotalGroupSpendCardProps) => {
  return (
    <Card
      isBlurred
      className='grid grid-cols-[auto_1fr] gap-0 p-3 border-none bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800/60 dark:bg-default-100/50 backdrop-blur-md'
      shadow='sm'>
      <div className='flex items-center justify-center pl-2 pr-4 py-4'>
        <Sigma
          size={30}
          className='text-white'
        />{' '}
        {/* Sigma Icon */}
      </div>
      <div>
        <CardHeader className='p-1'>
          <div className='flex items-center justify-center w-full h-full'>
            <span className='text-white text-3xl font-bold'>
              ₹{totalSpend.toLocaleString()}
            </span>
          </div>
        </CardHeader>
        <CardBody className='p-0'>
          <div className='flex flex-col gap-0'>
            <h3 className='font-semibold text-small text-white'>
              Total Group Spend
            </h3>
            <p className='text-small text-white/80'>
              Combined total spend across all groups
            </p>
          </div>
        </CardBody>
      </div>
    </Card>
  );
};

export default TotalGroupSpendCard;
