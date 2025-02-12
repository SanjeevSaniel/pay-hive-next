import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Component, House, ListTree, User } from 'lucide-react';
import Account from './Account/AccountCards';
import Expenses from './Expenses';
import Groups from './groups/Groups';
import Home from './home/Home';

const TabsContainer = () => {
  return (
    <Tabs
      defaultValue='Home'
      className='w-full p-1'>
      <div className='px-2 pt-3 sticky top-0 z-20'>
        <TabsList className='grid w-full h-full grid-cols-4 p-2 border drop-shadow-sm rounded-xl backdrop-blur-xl'>
          <TabsTrigger value='dashboard'>
            <div className='p-1'>
              <House size={22} />
            </div>
          </TabsTrigger>
          <TabsTrigger value='groups'>
            <div className='p-1'>
              <Component size={22} />
            </div>
          </TabsTrigger>
          <TabsTrigger value='expenses'>
            <div className='p-1'>
              <ListTree size={22} />
            </div>
          </TabsTrigger>
          <TabsTrigger value='account'>
            <div className='p-1'>
              <User size={22} />
            </div>
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent
        value='home'
        className='p-2'>
        <Home />
      </TabsContent>
      <TabsContent
        value='groups'
        className='p-2'>
        <Groups />
      </TabsContent>
      <TabsContent
        value='expenses'
        className='p-2'>
        <Expenses />
      </TabsContent>
      <TabsContent
        value='account'
        className='p-2'>
        <Account />
      </TabsContent>
    </Tabs>
  );
};

export default TabsContainer;
