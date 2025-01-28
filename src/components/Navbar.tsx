'use client';

import { Tab, Tabs } from '@heroui/tabs'; // Adjust the import according to your library
import { CircleUserRound, Component, History, Home } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const pathname = usePathname();
  const [selected, setSelected] = useState('');

  useEffect(() => {
    // Set the selected key based on the current pathname
    const currentPath = pathname.split('/').pop();
    setSelected(currentPath || 'home');
  }, [pathname]);

  const tabs = [
    { key: 'home', icon: <Home />, label: 'Home' },
    { key: 'groups', icon: <Component />, label: 'Groups' },
    { key: 'history', icon: <History />, label: 'History' },
    { key: 'account', icon: <CircleUserRound />, label: 'Account' },
  ];

  return (
    <div className='flex justify-center items-center w-full h-fit bg-gradient-to-t from-slate-300 via-slate-200 to-slate-50 fixed left-0 bottom-0 right-0'>
      <Tabs
        className='pt-4 px-4 pb-4'
        size='lg'
        aria-label='Options'
        color='primary'
        variant='bordered'
        selectedKey={selected}
        onSelectionChange={(key) => setSelected(key.toString())}>
        {tabs.map((tab) => (
          <Tab
            key={tab.key}
            className='px-4 py-5'
            title={
              <div className='flex items-center space-x-2'>
                {tab.icon}
                {selected === tab.key && <span>{tab.label}</span>}
              </div>
            }
          />
        ))}
      </Tabs>
    </div>
  );
};

export default Navbar;
