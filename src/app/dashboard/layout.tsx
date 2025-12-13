'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useUser, useAuth } from '@/firebase';
import { SidebarProvider, Sidebar, SidebarTrigger, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarInset, SidebarFooter } from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LayoutDashboard, Users, Calendar, MessageSquare, LogOut, User, Lightbulb, Bell, FolderKanban, CreditCard, Settings, ChevronDown, LogOutIcon, UserCog, LifeBuoy } from 'lucide-react';
import Logo from '@/components/logo';
import { Skeleton } from '@/components/ui/skeleton';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { mockUser } from '@/lib/mock-data';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

const UserSkeleton = () => (
    <div className="flex items-center gap-3">
      <Skeleton className="h-10 w-10 rounded-full" />
      <div className="space-y-1">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-3 w-32" />
      </div>
    </div>
)

const AuthenticatedDashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const auth = useAuth();
  const { user: authUser, isUserLoading: isAuthLoading } = useUser();
  const [userProfile, setUserProfile] = useState(mockUser);
  const [isProfileLoading, setProfileLoading] = useState(true);

  useEffect(() => {
    // If auth has finished loading and there's no authenticated user, redirect to login.
    if (!isAuthLoading && !authUser) {
      router.push('/login');
    }
    // Simulate profile loading
    if(authUser) {
        setTimeout(() => {
            setUserProfile(mockUser);
            setProfileLoading(false);
        }, 500);
    }
  }, [authUser, isAuthLoading, router]);


  const handleSignOut = () => {
    auth?.signOut().then(() => router.push('/'));
  };

  if (isAuthLoading || (authUser && isProfileLoading && !userProfile)) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <div className='flex flex-col items-center gap-4'>
            <Logo />
            <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }
  
  const getInitials = (name: string) => {
    if(!name) return 'U'
    const names = name.split(' ');
    if (names.length > 1 && names[0] && names[1]) {
      return `${names[0][0]}${names[1][0]}`;
    }
    if (name) return name.substring(0, 2);
    return 'U';
  }

  const displayName = userProfile?.name || authUser?.displayName || authUser?.email;
  const displayEmail = userProfile?.email || authUser?.email;
  const profilePhoto = userProfile?.profilePhoto || authUser?.photoURL;

  const sidebarNavItems = [
    { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/dashboard/experts", icon: Users, label: "Find Experts" },
    { href: "/dashboard/bookings", icon: Calendar, label: "Bookings" },
    { href: "/dashboard/messages", icon: MessageSquare, label: "Messages" },
    { href: "/dashboard/documents", icon: FolderKanban, label: "My Documents" },
    { href: "/dashboard/recommendations", icon: Lightbulb, label: "Recommendations" },
    { href: "/dashboard/notifications", icon: Bell, label: "Notifications" },
    { href: "/dashboard/payments", icon: CreditCard, label: "Payment Methods" },
    { href: "/dashboard/settings", icon: Settings, label: "Settings" },
  ];

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
            <div className="flex items-center gap-2 group-data-[collapsible=icon]:justify-center">
                <Logo />
            </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {sidebarNavItems.map(item => (
                 <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton href={item.href} isActive={pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))} tooltip={item.label}>
                        <item.icon />
                        <span>{item.label}</span>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
             <SidebarMenu>
                 <SidebarMenuItem>
                    <SidebarMenuButton onClick={handleSignOut} tooltip="Sign Out">
                        <LogOut />
                        <span>Sign Out</span>
                    </SidebarMenuButton>
                </SidebarMenuItem>
             </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-20 items-center justify-between px-4 md:px-8 border-b w-full bg-background/50 backdrop-blur-sm sticky top-0 z-10">
            <SidebarTrigger className="md:hidden"/>
            <div className="flex-1" />
            <div className="ml-auto flex items-center gap-4">
                <Button variant="ghost" size="icon">
                    <Bell className='h-5 w-5' />
                </Button>
            {isAuthLoading || isProfileLoading ? (
                 <UserSkeleton />
            ) : authUser && (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                         <button className="flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-full">
                            <Avatar className='h-10 w-10 border-2 border-primary/50'>
                                <AvatarImage src={profilePhoto} alt={displayName || ''} />
                                <AvatarFallback>{getInitials(displayName || '')}</AvatarFallback>
                            </Avatar>
                            <div className='hidden md:block text-left'>
                                <p className="font-semibold text-sm">{displayName}</p>
                                <p className="text-xs text-muted-foreground">{displayEmail}</p>
                            </div>
                            <ChevronDown className='h-4 w-4 text-muted-foreground hidden md:block' />
                         </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end' className='w-56'>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => router.push('/dashboard/profile')}>
                            <UserCog className='mr-2' />
                            <span>Profile</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => router.push('/dashboard/settings')}>
                            <Settings className='mr-2'/>
                           <span>Settings</span>
                        </DropdownMenuItem>
                         <DropdownMenuItem>
                            <LifeBuoy className='mr-2'/>
                           <span>Support</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                         <DropdownMenuItem onClick={handleSignOut}>
                             <LogOutIcon className='mr-2' />
                            <span>Log Out</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )}
            </div>
        </header>
        <main className="flex-1 p-4 md:p-8 bg-muted/40">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
};


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <FirebaseClientProvider>
      <AuthenticatedDashboardLayout>
        {children}
      </AuthenticatedDashboardLayout>
    </FirebaseClientProvider>
  )
}
