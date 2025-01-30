import TabsContainer from '@/components/TabsContainer';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CircularProgress } from '@heroui/react';
import { Plus } from 'lucide-react';

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
  return (
    <div>
      <div className='flex justify-between p-2 my-2'>
        <span className='text-3xl font-extrabold'>Expenses</span>
        <Button
          asChild
          size='icon'
          variant='ghost'
          className='p-0'>
          <Plus size={28} />
        </Button>
      </div>
      <div className='flex overflow-x-scroll scroll-smooth space-x-4 p-2'>
        {categories.map((item) => (
          <Card
            key={item.title}
            className='flex-shrink-0 w-fit text-card rounded-xl mb-4'
            style={{ backgroundColor: item.bgColor }}>
            <CardHeader
              className='py-4 rounded-t-xl'
              style={{ backgroundColor: item.headerBgColor }}>
              <div>
                <CardTitle className='text-2xl'>{item.title}</CardTitle>
                <CardDescription className='text-card'>
                  {item.description}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className='flex justify-between items-center gap-4 py-4'>
              <div>
                <p className='text-lg'>{item.percentage}%</p>
                <p className='text-sm'>{item.category}</p>
              </div>

              <div>
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
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <TabsContainer />
    </div>
  );
};

export default HomePage;
