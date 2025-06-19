'use client';

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  Loader2,
  LogOut,
  Sparkles,
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import { Button } from './ui/button';

interface LogoutButtonProps {
  className?: string;
  onLogoutStart?: () => void;
  onLogoutEnd?: () => void;
  redirectTo?: string;
}

export function LogoutButton({
  className,
  onLogoutStart,
  onLogoutEnd,
  redirectTo = '/v1/login',
}: LogoutButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = useCallback(async () => {
    setLoading(true);
    onLogoutStart?.();

    try {
      const response = await axios.get('/api/users/logout');
      console.log('Logout success', response.data);
      toast.success('Logout successful');
      router.push(redirectTo);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Logout failed:', error.message);
        toast.error(`Logout failed: ${error.message}`);
      } else {
        console.error('An unknown error occurred:', error);
        toast.error('Logout failed');
      }
    } finally {
      setLoading(false);
      onLogoutEnd?.();
    }
  }, [router, redirectTo, onLogoutStart, onLogoutEnd]);

  return (
    <DropdownMenuItem
      onClick={handleLogout}
      disabled={loading}
      className={className}>
      {loading ? (
        <Loader2 className='h-4 w-4 animate-spin' />
      ) : (
        <LogOut className='h-4 w-4' />
      )}
      <span className='ml-2'>{loading ? 'Logging out...' : 'Log out'}</span>
    </DropdownMenuItem>
  );
}

// Alternative standalone button version
export function LogoutButtonStandalone({
  className,
  onLogoutStart,
  onLogoutEnd,
  redirectTo = '/v1/login',
  variant = 'outline',
  size = 'default',
}: LogoutButtonProps & {
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = useCallback(async () => {
    setLoading(true);
    onLogoutStart?.();

    try {
      const response = await axios.get('/api/users/logout');
      console.log('Logout success', response.data);
      toast.success('Logout successful');
      router.push(redirectTo);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Logout failed:', error.message);
        toast.error(`Logout failed: ${error.message}`);
      } else {
        console.error('An unknown error occurred:', error);
        toast.error('Logout failed');
      }
    } finally {
      setLoading(false);
      onLogoutEnd?.();
    }
  }, [router, redirectTo, onLogoutStart, onLogoutEnd]);

  return (
    <Button
      onClick={handleLogout}
      disabled={loading}
      variant={variant}
      size={size}
      className={className}>
      {loading ? (
        <Loader2 className='h-4 w-4 animate-spin' />
      ) : (
        <LogOut className='h-4 w-4' />
      )}
      <span className='ml-2'>{loading ? 'Logging out...' : 'Log out'}</span>
    </Button>
  );
}

export function NavUser({
  user,
}: {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
}) {
  const { isMobile } = useSidebar();

  // Generate initials from name for fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((word) => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size='lg'
              className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'>
              <Avatar className='h-8 w-8 rounded-lg'>
                <AvatarImage
                  src={user.avatar}
                  alt={user.name}
                />
                <AvatarFallback className='rounded-lg'>
                  {getInitials(user.name)}
                </AvatarFallback>
              </Avatar>
              <div className='grid flex-1 text-left text-sm leading-tight'>
                <span className='truncate font-medium'>{user.name}</span>
                <span className='truncate text-xs'>{user.email}</span>
              </div>
              <ChevronsUpDown className='ml-auto size-4' />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className='w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg'
            side={isMobile ? 'bottom' : 'right'}
            align='end'
            sideOffset={4}>
            <DropdownMenuLabel className='p-0 font-normal'>
              <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
                <Avatar className='h-8 w-8 rounded-lg'>
                  <AvatarImage
                    src={user.avatar}
                    alt={user.name}
                  />
                  <AvatarFallback className='rounded-lg'>
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
                <div className='grid flex-1 text-left text-sm leading-tight'>
                  <span className='truncate font-medium'>{user.name}</span>
                  <span className='truncate text-xs'>{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Sparkles />
                Upgrade to Pro
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <BadgeCheck />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <LogoutButton />
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
