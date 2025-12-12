'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useUser, useAuth, useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { SidebarProvider, Sidebar, SidebarTrigger, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarInset, SidebarFooter } from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LayoutDashboard, Users, Calendar, MessageSquare, LogOut } from 'lucide-react';
import Logo from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

// Define the User type based on your backend.json
interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'seeker' | 'expert';
  profilePhoto?: string;
}

const UserSkeleton = () => (
    <div className="flex items-center gap-3">
      <Skeleton className="h-10 w-10 rounded-full" />
      <div className="space-y-1">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-3 w-32" />
      </div>
    </div>
)


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const auth = useAuth();
  const firestore = useFirestore();
  const { user: authUser, isUserLoading: isAuthLoading } = useUser();

  // Create a memoized reference to the user's document
  const userDocRef = useMemoFirebase(() => {
    if (!firestore || !authUser) return null;
    return doc(firestore, 'users', authUser.uid);
  }, [firestore, authUser]);

  const { data: userProfile, isLoading: isProfileLoading } = useDoc<UserProfile>(userDocRef);

  useEffect(() => {
    // If auth has finished loading and there's no authenticated user, redirect to login.
    if (!isAuthLoading && !authUser) {
      router.push('/login');
    }
  }, [authUser, isAuthLoading, router]);


  const handleSignOut = () => {
    auth.signOut().then(() => router.push('/'));
  };

  // While auth or profile is loading, show a full-screen loader.
  if (isAuthLoading || isProfileLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <p>Loading your dashboard...</p>
      </div>
    );
  }
  
  const getInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length > 1) {
      return `${names[0][0]}${names[1][0]}`;
    }
    return name.substring(0, 2);
  }

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
            <SidebarMenuItem>
              <SidebarMenuButton href="/dashboard" isActive={router.pathname === '/dashboard'} tooltip="Dashboard">
                <LayoutDashboard />
                <span>Dashboard</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
              <SidebarMenuButton href="/dashboard/experts" tooltip="Experts">
                <Users />
                <span>Find Experts</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
              <SidebarMenuButton href="/dashboard/bookings" tooltip="Bookings">
                <Calendar />
                <span>Bookings</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
              <SidebarMenuButton href="/dashboard/messages" tooltip="Messages">
                <MessageSquare />
                <span>Messages</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
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
        <header className="flex h-20 items-center justify-between px-8 border-b w-full">
            <SidebarTrigger className="md:hidden"/>
            <h1 className="text-3xl font-bold hidden md:block">Dashboard</h1>
            <div className="ml-auto flex items-center gap-4">
            {userProfile ? (
                 <div className="flex items-center gap-3">
                    <Avatar>
                        <AvatarImage src={userProfile.profilePhoto} alt={userProfile.name} />
                        <AvatarFallback>{getInitials(userProfile.name)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-semibold text-sm">{userProfile.name}</p>
                        <p className="text-xs text-foreground/70">{userProfile.email}</p>
                    </div>
                 </div>
            ) : authUser ? (
                 <div className="flex items-center gap-3">
                    <Avatar>
                        <AvatarFallback>{getInitials(authUser.email || 'U')}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="text-xs text-foreground/70">{authUser.email}</p>
                    </div>
                 </div>
            ) : <UserSkeleton />}
            </div>
        </header>
        <main className="flex-1 p-4 md:p-8">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
