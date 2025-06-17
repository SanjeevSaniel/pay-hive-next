'use client';

import Header from '@/components/Header';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import useLenis from '@/hooks/useLenis';
import { getFinancialRecords } from '@/services/financialRecordService';
import { getGroups } from '@/services/groupService';
import { fetchGroupTypes } from '@/services/groupTypeService';
import { getUsers } from '@/services/userService';
import useAppStore from '@/stores/useAppStore';
import { Group } from '@/types/types';
import { createDefaultGroup } from '@/utils/groupUtils'; // Import the function
import axios from 'axios';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';

const AppPageLayout = ({ children }: { children: React.ReactNode }) => {
  useLenis();
  const addGroup = useAppStore((state) => state.addGroup);
  const setGroups = useAppStore((state) => state.setGroups);
  const setGroupTypes = useAppStore((state) => state.setGroupTypes);
  const setDefaultGroup = useAppStore((state) => state.setDefaultGroup);
  const setUsers = useAppStore((state) => state.setUsers);
  const setFinancialRecords = useAppStore((state) => state.setFinancialRecords);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          groupsResponse,
          usersResponse,
          groupTypesResponse,
          financialRecordsResponse,
        ] = await Promise.all([
          getGroups(),
          getUsers(),
          fetchGroupTypes(), // Fetch group types
          getFinancialRecords(), // Fetch financial records
        ]);

        setGroups(groupsResponse.data);
        setUsers(usersResponse.data);
        setGroupTypes(groupTypesResponse); // Store group types in Zustand
        setFinancialRecords(financialRecordsResponse.data); // Store financial records in Zustand

        // Ensure Default Group
        const ensureDefaultGroup = async (groups: Group[]) => {
          // Explicitly type 'groups' parameter
          // Check if the default group exists
          const defaultGroupExists = groups.some(
            (group: Group) => group.groupType === 'default',
          );

          // Create default group if it doesn't exist
          if (!defaultGroupExists) {
            const userId = 'defaultUserId'; // Replace this with the actual user ID
            const newDefaultGroup = createDefaultGroup(userId);
            try {
              const response = await axios.post(
                '/api/groups/create',
                newDefaultGroup,
              );
              addGroup(response.data); // Use addGroup method to add the group
              setDefaultGroup(response.data);
              console.log('Default group created:', response.data);
            } catch (createError) {
              console.error('Failed to create default group:', createError);
            }
          }
        };

        await ensureDefaultGroup(groupsResponse.data); // Check and create default group if needed
      } catch (error) {
        console.error('Failed to fetch data', error);
      }
    };

    fetchData(); // Fetch data on layout initialization
  }, [
    addGroup,
    setGroups,
    setGroupTypes,
    setDefaultGroup,
    setUsers,
    setFinancialRecords,
  ]);

  return (
    <div className='min-h-screen p-2 dark bg-[#0e161e] text-white'>
      <div className='md:w-[80%] mx-auto grid grid-rows-layout'>
        <Header />
        <div className=' h-fit w-full mb-20 grid grid-cols-4 overflow-auto relative'>
          <div className='col-span-1 w-full'>
            <Sidebar />
          </div>
          <div className='col-span-3'>{children}</div>
        </div>
        <Navbar />
        <Toaster />
      </div>
    </div>
  );
};

export default AppPageLayout;
