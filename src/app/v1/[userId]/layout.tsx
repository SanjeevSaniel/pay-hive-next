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
    <div className='grid grid-rows-layout min-h-screen p-2 bg-gradient-to-tl from-zinc-300 to-zinc-300'>
      <div className='px-1 top-0 z-30'>
        <Header />
      </div>
      <div className='mb-20 overflow-auto'>{children}</div>
      <Navbar />
      <Toaster />
    </div>
  );
};

export default AppPageLayout;
