'use client';

import { useEffect } from 'react';
import Header from '@/components/Header';
import Navbar from '@/components/Navbar';
import useLenis from '@/hooks/useLenis';
import { Toaster } from 'react-hot-toast';
import { getFinancialRecords } from '@/services/financialRecordService';
import { getGroups } from '@/services/groupService';
import { fetchGroupTypes } from '@/services/groupTypeService';
import { getUsers } from '@/services/userService';
import useAppStore from '@/stores/useAppStore';
import { Group } from '@/types/types';
import axios from 'axios';
import { createDefaultGroup } from '@/utils/groupUtils'; // Import the function

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
        const groupsResponse = await getGroups();
        const usersResponse = await getUsers();
        const groupTypesResponse = await fetchGroupTypes(); // Fetch group types
        const financialRecordsResponse = await getFinancialRecords(); // Fetch financial records

        setGroups(groupsResponse.data);
        setUsers(usersResponse.data);
        setGroupTypes(groupTypesResponse); // Store group types in Zustand
        setFinancialRecords(financialRecordsResponse.data); // Store financial records in Zustand

        // Check if the default group exists
        const defaultGroupExists = groupsResponse.data.some(
          (group: Group) => group.groupType === 'default',
        );

        // Create default group if it doesn't exist
        if (!defaultGroupExists) {
          // Assuming you have a user ID for the logged-in user
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
    <div className='grid grid-rows-layout min-h-screen p-2 bg-gradient-to-t from-stone-200 via-stone-200 to-stone-50'>
      <div className='top-0 z-30'>
        <Header />
      </div>
      <div className='mb-20 overflow-auto'>{children}</div>
      <Navbar />
      <Toaster />
    </div>
  );
};

export default AppPageLayout;
