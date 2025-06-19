'use client';

// import { AppleCardsCarouselDemo } from '@/components/AppleCardsCarouselDemo';
import TabsContainer from '@/components/TabsContainer';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button, CircularProgress } from '@heroui/react';
import { Plus } from 'lucide-react';
import Link from 'next/link';

const categories = [
  {
    title: '$ 600',
    description: 'Since 1 Jan',
    percentage: 28,
    category: 'Shopping',
    value: 70,
    bgColor: '#826fda',
    headerBgColor: '#8d7bdf',
  },
  {
    title: '$ 200',
    description: 'Since 1 Jan',
    percentage: 10,
    category: 'Fuel',
    value: 40,
    bgColor: '#4caf50',
    headerBgColor: '#66bb6a',
  },
  {
    title: '$ 500',
    description: 'Since 1 Jan',
    percentage: 22,
    category: 'Bills',
    value: 60,
    bgColor: '#ff9800',
    headerBgColor: '#ffb74d',
  },
  // Add more categories as needed
];

const HomePage = () => {
  // const financialRecords = useAppStore((state) => state.financialRecords);

  return (
    <div>
      {/* <div className='px-1 top-0 z-30'>
        <Header />
      </div> */}

      {/* <AppleCardsCarouselDemo /> */}

      <div className='flex justify-between px-3 py-2 my-2'>
        <span className='text-2xl font-extrabold'>Expenses</span>
        <Button
          // size='icon'
          isIconOnly
          variant='ghost'
          className='p-0'
          aria-label='Add Expense'>
          <Plus size={26} />
        </Button>
      </div>
      <div
        className='flex overflow-x-scroll scroll-smooth space-x-4 p-2'
        aria-label='Expenses Categories'>
        {categories.map((item) => (
          <Card
            aria-label={`Expense Category: ${item.category}`}
            key={item.title}
            className='flex-shrink-0 w-fit text-card rounded-xl mb-4'
            style={{ backgroundColor: item.bgColor }}>
            <CardHeader
              className='py-3 rounded-t-xl'
              style={{ backgroundColor: item.headerBgColor }}>
              <CardTitle
                aria-label='Category Amount'
                className='text-xl'>
                {item.title}
              </CardTitle>
              <CardDescription
                aria-label='Category Timeframe'
                className='text-card'>
                {item.description}
              </CardDescription>
            </CardHeader>
            <CardContent className='flex justify-between items-center gap-4 py-2'>
              <div aria-label='Category Info'>
                <p className='text-lg'>{item.percentage}%</p>
                <p className='text-sm'>{item.category}</p>
              </div>
              <CircularProgress
                classNames={{
                  svg: 'w-16 h-16 drop-shadow-sm',
                  indicator: 'stroke-white',
                  track: 'stroke-white/10',
                  value: 'text-sm font-semibold text-white',
                }}
                showValueLabel={true}
                strokeWidth={4}
                value={item.value}
                aria-label={`Progress for ${item.category}`}
              />
            </CardContent>
          </Card>
        ))}
      </div>

      <div>
        <div className='flex justify-between p-4'>
          <h1>Transactions</h1>
          <Link
            href='/v1'
            className='text-sm'>
            View All
          </Link>
        </div>

        {/* <div className='flex flex-col gap-2 p-2'>
          {financialRecords.map((record) => (
            <Card key={record.recordId}>
              <CardHeader className='flex justify-between items-center'>
                <CardTitle>
                  <div className='flex justify-between items-center w-full'>
                    <div>{record.description}</div>
                    <div>{record.amount}</div>
                  </div>
                </CardTitle>

              </CardHeader>
            </Card>
          ))}
        </div> */}
      </div>

      <TabsContainer />
    </div>
  );
};

export default HomePage;
