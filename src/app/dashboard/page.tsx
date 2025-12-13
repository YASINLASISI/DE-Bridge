'use client';

import { useState, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { WelcomeHeader } from '@/components/dashboard/welcome-header';
import { StatCard } from '@/components/dashboard/stat-card';
import { DollarSign, Briefcase, Calendar, Users, MessageSquare, FolderKanban, ArrowRight } from 'lucide-react';
import { UpcomingConsultations } from '@/components/dashboard/upcoming-consultations';
import { mockUser } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RecommendedExperts } from '@/components/dashboard/recommended-experts';

const QuickActionButton = ({ href, icon: Icon, title, description }: { href: string, icon: React.ElementType, title: string, description: string }) => (
    <Link href={href} passHref>
        <Card className="group h-full text-center hover:bg-primary/5 hover:shadow-lg transition-all">
            <CardContent className="p-6 flex flex-col items-center justify-center">
                <div className="mb-4 rounded-full bg-primary/10 p-4 group-hover:bg-primary transition-colors">
                    <Icon className="h-8 w-8 text-primary group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-bold text-lg">{title}</h3>
                <p className="text-sm text-muted-foreground">{description}</p>
                <ArrowRight className="h-5 w-5 text-primary/50 mt-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </CardContent>
        </Card>
    </Link>
);


export default function DashboardPage() {
  const [userProfile, setUserProfile] = useState(mockUser);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading user data
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
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
                <Skeleton className="h-80 rounded-lg" />
            </div>
            <div>
                 <Skeleton className="h-80 rounded-lg" />
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


const SeekerDashboard = ({ userProfile }: { userProfile: typeof mockUser }) => {
    return (
        <div className="space-y-8">
            <WelcomeHeader name={userProfile.name} />
            
            {/* Quick Actions */}
            <div className='space-y-4'>
                <h2 className='text-xl font-bold tracking-tight'>Quick Actions</h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <QuickActionButton href="/dashboard/experts" icon={Users} title="Browse Experts" description="Find & filter professionals" />
                    <QuickActionButton href="/dashboard/experts" icon={Calendar} title="New Consultation" description="Book a new session" />
                    <QuickActionButton href="/dashboard/messages" icon={MessageSquare} title="View Messages" description="Check your inbox" />
                    <QuickActionButton href="/dashboard/documents" icon={FolderKanban} title="Upload Document" description="Add files for review" />
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                <div className="xl:col-span-2">
                    <UpcomingConsultations />
                </div>
                <div className="space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Your Stats</CardTitle>
                        </CardHeader>
                        <CardContent className="grid grid-cols-2 gap-4">
                             <StatCard title="Total Consultations" value="12" icon={Briefcase} />
                             <StatCard title="Upcoming" value="2" icon={Calendar} />
                             <StatCard title="Saved Experts" value="5" icon={Users} />
                             <StatCard title="Total Spent" value="₦125,000" icon={DollarSign} />
                        </CardContent>
                    </Card>
                </div>
            </div>

            <RecommendedExperts />
        </div>
    )
}

const ExpertDashboard = ({ userProfile }: { userProfile: typeof mockUser }) => {
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
                     {/* Placeholder for Recent Activity or other expert-specific component */}
                </div>
            </div>
        </div>
    )
}
