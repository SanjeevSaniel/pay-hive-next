'use client';

import { ChevronRight, type LucideIcon } from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export function NavMain({
  items,
}: {
  items: {
    id: string;
    title: string;
    url: string;
    icon: LucideIcon;
    isActive?: boolean;
    items?: {
      id: string;
      title: string;
      url: string;
    }[];
  }[];
}) {
  const { userId } = useParams();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          const cleanItemUrl = item.url.replace(/^\/+/, '');
          const itemTargetPath = `/v1/${userId}/${cleanItemUrl}`;

          return (
            <Collapsible
              key={item.id}
              asChild
              defaultOpen={item.isActive}>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  tooltip={item.title}>
                  <Link href={itemTargetPath}>
                    <item.icon />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>

                {item.items?.length ? (
                  <>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuAction className='data-[state=open]:rotate-90'>
                        <ChevronRight />
                        <span className='sr-only'>Toggle</span>
                      </SidebarMenuAction>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items.map((subItem) => {
                          const cleanUrl = subItem.url.replace(/^\/+/, '');
                          const targetPath = `/v1/${userId}/${cleanUrl}`;

                          return (
                            <SidebarMenuSubItem key={subItem.id}>
                              <SidebarMenuSubButton asChild>
                                <Link href={targetPath}>
                                  <span className='dark:text-white'>
                                    {subItem.title}
                                  </span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          );
                        })}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </>
                ) : null}
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
