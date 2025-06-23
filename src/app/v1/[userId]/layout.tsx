'use client';

import { AppSidebar } from '@/components/app-sidebar';
import Navbar from '@/components/Navbar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
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

const AppLayout = ({ children }: { children: React.ReactNode }) => {
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
    <div className='dark bg-[#1C1C1C] text-white'>
      <SidebarProvider>
        <AppSidebar />

        <SidebarInset className='bg-transparent relative flex flex-col '>
          <header className='flex h-10 shrink-0 items-center gap-2 sticky top-2 z-10 bg-opaque backdrop-blur-sm'>
            <div className='flex items-center gap-2 px-4'>
              <SidebarTrigger className='-ml-1' />
              <Separator
                orientation='vertical'
                className='mr-2 data-[orientation=vertical]:h-4'
              />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className='hidden md:block'>
                    <BreadcrumbLink href='#'>
                      Building Your Application
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className='hidden md:block' />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          <div className='flex-1 overflow-auto relative'>{children}</div>
        </SidebarInset>
      </SidebarProvider>

      <Navbar />
      <Toaster />
      {/* </div> */}
    </div>
  );
};

export default AppLayout;
