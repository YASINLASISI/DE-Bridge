'use client';

import { useDoc, useUser, useFirestore, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';
import { WelcomeHeader } from '@/components/dashboard/welcome-header';
import { StatCard } from '@/components/dashboard/stat-card';
import {
  DollarSign,
  Briefcase,
  Calendar,
  Users,
} from 'lucide-react';
import { UpcomingConsultations } from '@/components/dashboard/upcoming-consultations';
import { BrowseExperts } from '@/components/dashboard/browse-experts';
import { RecentActivity } from '@/components/dashboard/recent-activity';

interface UserProfile {
  name: string;
  role: 'seeker' | 'expert';
}

export default function DashboardPage() {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();

  const userDocRef = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return doc(firestore, 'users', user.uid);
  }, [firestore, user]);

  const { data: userProfile, isLoading: isProfileLoading } =
    useDoc<UserProfile>(userDocRef);

  if (isUserLoading || isProfileLoading) {
    return (
      <div className="space-y-8">
        <Skeleton className="h-10 w-1/2" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Skeleton className="h-28 rounded-lg" />
          <Skeleton className="h-28 rounded-lg" />
          <Skeleton className="h-28 rounded-lg" />
          <Skeleton className="h-28 rounded-lg" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
                <Skeleton className="h-64 rounded-lg" />
            </div>
            <div>
                 <Skeleton className="h-64 rounded-lg" />
            </div>
        </div>
      </div>
    );
  }

  // A simple router for role-based dashboards
  if (userProfile?.role === 'seeker') {
    return <SeekerDashboard userProfile={userProfile} />;
  }
  
  if (userProfile?.role === 'expert') {
     return <ExpertDashboard userProfile={userProfile} />;
  }

  // Fallback for new users or users without a role
  return <div className="flex h-full w-full items-center justify-center"><p>Loading your dashboard...</p></div>;
}


const SeekerDashboard = ({ userProfile }: { userProfile: UserProfile }) => {
    return (
        <div className="space-y-8">
            <WelcomeHeader name={userProfile.name} />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <StatCard title="Total Consultations" value="12" icon={Briefcase} />
                <StatCard title="Upcoming" value="2" icon={Calendar} />
                <StatCard title="Saved Experts" value="5" icon={Users} />
                <StatCard title="Total Spent" value="₦125,000" icon={DollarSign} />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                <div className="xl:col-span-2">
                    <UpcomingConsultations />
                </div>
                <div className="space-y-8">
                    <BrowseExperts />
                    <RecentActivity />
                </div>
            </div>
        </div>
    )
}

const ExpertDashboard = ({ userProfile }: { userProfile: UserProfile }) => {
     return (
        <div className="space-y-6">
            <WelcomeHeader name={userProfile.name} description="Here's what's happening with your practice today."/>
             <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <StatCard title="Total Earnings" value="₦1,250,000" icon={DollarSign} />
                <StatCard title="Total Sessions" value="88" icon={Briefcase} />
                <StatCard title="New Requests" value="3" icon={Calendar} />
                <StatCard title="Rating" value="4.9/5" icon={Users} />
            </div>
             <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                <div className="xl:col-span-2">
                    <UpcomingConsultations />
                </div>
                <div>
                    <RecentActivity />
                </div>
            </div>
        </div>
    )
}
