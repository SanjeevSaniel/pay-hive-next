'use client';

import {
  Command,
  Frame,
  Group,
  LayoutDashboard,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  SquareTerminal,
} from 'lucide-react';
import * as React from 'react';

import { NavMain } from '@/components/nav-main';
import { NavProjects } from '@/components/nav-projects';
import { NavSecondary } from '@/components/nav-secondary';
import { NavUser } from '@/components/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import useFetchGroupsAndRecords from '@/hooks/useFetchGroupsAndRecords';
import useAppStore from '@/stores/useAppStore';
import { useEffect } from 'react';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { fetchGroups } = useFetchGroupsAndRecords();
  const groups = useAppStore((state) => state.groups);
  const formattedGroups = groups.map(({ id, title }) => ({
    id,
    title,
    url: `/group/${id}`,
  }));

  const data = {
    user: {
      name: 'shadcn',
      email: 'm@example.com',
      avatar: '/avatars/shadcn.jpg',
    },
    navMain: [
      {
        id: 'D',
        title: 'Dashboard',
        url: '#',
        icon: LayoutDashboard,
      },
      {
        id: 'G',
        title: 'Groups',
        url: '#',
        icon: Group,
        items: [...formattedGroups],
      },
      {
        id: 'P',
        title: 'Playground',
        url: '#',
        icon: SquareTerminal,
        isActive: true,
        items: [
          {
            id: 'H',
            title: 'History',
            url: '#',
          },
          {
            id: 'S',
            title: 'Starred',
            url: '#',
          },
          {
            id: 'Se',
            title: 'Settings',
            url: '#',
          },
        ],
      },
      // {
      //   id: 'M',
      //   title: 'Models',
      //   url: '#',
      //   icon: Bot,
      //   items: [
      //     {
      //       id: 'G',
      //       title: 'Genesis',
      //       url: '#',
      //     },
      //     {
      //       id: 'E',
      //       title: 'Explorer',
      //       url: '#',
      //     },
      //     {
      //       id: 'Q',
      //       title: 'Quantum',
      //       url: '#',
      //     },
      //   ],
      // },
      // {
      //   id: 'Do',
      //   title: 'Documentation',
      //   url: '#',
      //   icon: BookOpen,
      //   items: [
      //     {
      //       id: 'I',
      //       title: 'Introduction',
      //       url: '#',
      //     },
      //     {
      //       id: 'G',
      //       title: 'Get Started',
      //       url: '#',
      //     },
      //     {
      //       id: 'T',
      //       title: 'Tutorials',
      //       url: '#',
      //     },
      //     {
      //       id: 'C',
      //       title: 'Changelog',
      //       url: '#',
      //     },
      //   ],
      // },
      // {
      //   id: 'Set',
      //   title: 'Settings',
      //   url: '#',
      //   icon: Settings2,
      //   items: [
      //     {
      //       id: 'G',
      //       title: 'General',
      //       url: '#',
      //     },
      //     {
      //       id: 'T',
      //       title: 'Team',
      //       url: '#',
      //     },
      //     {
      //       id: 'B',
      //       title: 'Billing',
      //       url: '#',
      //     },
      //     {
      //       id: 'L',
      //       title: 'Limits',
      //       url: '#',
      //     },
      //   ],
      // },
    ],
    navSecondary: [
      {
        title: 'Support',
        url: '#',
        icon: LifeBuoy,
      },
      {
        title: 'Feedback',
        url: '#',
        icon: Send,
      },
    ],
    projects: [
      {
        name: 'Design Engineering',
        url: '#',
        icon: Frame,
      },
      {
        name: 'Sales & Marketing',
        url: '#',
        icon: PieChart,
      },
      {
        name: 'Travel',
        url: '#',
        icon: Map,
      },
    ],
  };

  useEffect(() => {
    if (groups.length === 0) {
      fetchGroups();
    }
  }, [fetchGroups, groups.length]);

  return (
    <Sidebar
      variant='inset'
      {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size='lg'
              asChild>
              <a href='#'>
                <div className='bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg'>
                  <Command className='size-4' />
                </div>
                <div className='grid flex-1 text-left text-sm leading-tight'>
                  <span className='truncate font-medium'>Acme Inc</span>
                  <span className='truncate text-xs'>Enterprise</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
        <NavSecondary
          items={data.navSecondary}
          className='mt-auto'
        />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
