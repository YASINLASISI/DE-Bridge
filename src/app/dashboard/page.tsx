'use client';

import { useRouter } from 'next/navigation';
import { useUser, useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { FileText, Calendar, User, DollarSign, Clock, Settings, ArrowRight } from 'lucide-react';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'seeker' | 'expert';
}

const RoleSelection = ({ onSelectRole }: { onSelectRole: (role: 'seeker' | 'expert') => void }) => {
    return (
        <div className="flex items-center justify-center h-full">
            <Card className="w-full max-w-lg text-center">
                <CardHeader>
                    <CardTitle className="text-2xl">Complete Your Profile</CardTitle>
                    <CardDescription>
                        How would you like to use DE-Bridge? You can change this later.
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col sm:flex-row gap-4 justify-center p-6">
                    <Button size="lg" onClick={() => onSelectRole('seeker')} className="font-bold">
                        I'm looking for an Expert
                    </Button>
                    <Button size="lg" variant="outline" onClick={() => onSelectRole('expert')} className="font-bold">
                        I am an Expert
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
};

const SeekerDashboard = ({ userProfile }: { userProfile: UserProfile }) => (
  <div className="space-y-8">
    <div>
        <h1 className="text-4xl font-bold tracking-tight">Welcome, {userProfile.name}!</h1>
        <p className="text-muted-foreground text-lg mt-2">Here’s your personal dashboard to manage your journey.</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="flex flex-col">
            <CardHeader className="flex-row items-center gap-4">
                <Calendar className="w-8 h-8 text-primary" />
                <CardTitle>Upcoming Appointments</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
                <p className="text-muted-foreground">You have no upcoming appointments scheduled. Time to book your next session!</p>
            </CardContent>
            <CardFooter>
                 <Button>Find an Expert <ArrowRight className="ml-2 h-4 w-4"/></Button>
            </CardFooter>
        </Card>
         <Card className="flex flex-col">
            <CardHeader className="flex-row items-center gap-4">
                <FileText className="w-8 h-8 text-primary" />
                <CardTitle>Consultation History</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
                <p className="text-muted-foreground">Your past consultation summaries and documents will appear here.</p>
            </CardContent>
             <CardFooter>
                 <Button variant="outline">View History</Button>
            </CardFooter>
        </Card>
        <Card className="flex flex-col">
            <CardHeader className="flex-row items-center gap-4">
                <User className="w-8 h-8 text-primary" />
                <CardTitle>Profile & Preferences</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
                <p className="text-muted-foreground">Manage your personal information, payment methods, and notification settings.</p>
            </CardContent>
             <CardFooter>
                 <Button variant="outline">Go to Settings</Button>
            </CardFooter>
        </Card>
    </div>
  </div>
);

const ExpertDashboard = ({ userProfile }: { userProfile: UserProfile }) => (
  <div className="space-y-8">
    <div>
        <h1 className="text-4xl font-bold tracking-tight">Expert Dashboard</h1>
        <p className="text-muted-foreground text-lg mt-2">Welcome back, {userProfile.name}. Here's your business overview.</p>
    </div>

     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card className="flex flex-col">
        <CardHeader className="flex-row items-center justify-between">
            <CardTitle>Earnings Overview</CardTitle>
            <DollarSign className="w-6 h-6 text-muted-foreground" />
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-4xl font-bold tracking-tighter">$0.00</p>
          <p className="text-sm text-muted-foreground">this month</p>
        </CardContent>
         <CardFooter>
             <Button variant="outline">View Earnings Report</Button>
        </CardFooter>
      </Card>
       <Card className="flex flex-col">
        <CardHeader className="flex-row items-center justify-between">
            <CardTitle>Booking Requests</CardTitle>
            <Clock className="w-6 h-6 text-muted-foreground" />
        </CardHeader>
        <CardContent className="flex-grow">
           <p className="text-4xl font-bold tracking-tighter">0</p>
          <p className="text-sm text-muted-foreground">new requests waiting</p>
        </CardContent>
        <CardFooter>
            <Button>Manage Bookings <ArrowRight className="ml-2 h-4 w-4"/></Button>
        </CardFooter>
      </Card>
       <Card className="flex flex-col">
        <CardHeader className="flex-row items-center justify-between">
            <CardTitle>Your Profile</CardTitle>
            <Settings className="w-6 h-6 text-muted-foreground" />
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-muted-foreground">Keep your availability and professional details up-to-date to attract more clients.</p>
        </CardContent>
        <CardFooter>
             <Button variant="outline">Edit Profile & Availability</Button>
        </CardFooter>
      </Card>
    </div>
  </div>
);

export default function DashboardPage() {
  const router = useRouter();
  const firestore = useFirestore();
  const { user: authUser, isUserLoading: isAuthLoading } = useUser();
  const { toast } = useToast();
  const [isCreatingProfile, setIsCreatingProfile] = useState(false);

  const userDocRef = useMemoFirebase(() => {
    if (!firestore || !authUser) return null;
    return doc(firestore, 'users', authUser.uid);
  }, [firestore, authUser]);

  const { data: userProfile, isLoading: isProfileLoading, error } = useDoc<UserProfile>(userDocRef);

  const handleSelectRole = async (role: 'seeker' | 'expert') => {
    if (!authUser || !firestore) return;
    
    setIsCreatingProfile(true);
    toast({ title: 'Creating your profile...' });

    const newUserProfile: UserProfile = {
      id: authUser.uid,
      email: authUser.email || '',
      name: authUser.displayName || 'New User',
      role: role,
    };
    
    try {
      await setDoc(doc(firestore, 'users', authUser.uid), newUserProfile);
       if (role === 'expert') {
        const expertProfile = {
          id: authUser.uid,
          name: authUser.displayName || 'New Expert',
          specialty: 'Not specified',
          field: 'Not specified',
          hourlyRate: 0,
          currency: 'USD',
          rating: 0,
          totalSessions: 0,
          profilePhoto: authUser.photoURL || '',
          bio: '',
          verificationStatus: 'pending',
          languages: [],
        }
        await setDoc(doc(firestore, 'experts', authUser.uid), expertProfile);
      }

      toast({ title: 'Profile created successfully!', description: `You are now registered as a ${role}.` });
    } catch (e: any) {
      console.error("Error creating profile:", e);
      toast({ variant: 'destructive', title: 'Error', description: 'Could not create your profile. Please try again.' });
    } finally {
      setIsCreatingProfile(false);
    }
  };

  if (isAuthLoading || isProfileLoading || isCreatingProfile) {
    return <div className="flex h-full w-full items-center justify-center"><p>Loading dashboard...</p></div>;
  }
  
  if (!authUser) {
    // This case should ideally be handled by the layout which redirects to login.
    return <div className="flex h-full w-full items-center justify-center"><p>Redirecting to login...</p></div>;
  }
  
  if (error) {
    return <div className="text-red-500">Error loading your profile: {error.message}</div>
  }

  // If the user is authenticated but has no profile document yet, show role selection.
  if (!userProfile) {
    return <RoleSelection onSelectRole={handleSelectRole} />;
  }

  // Show the appropriate dashboard based on the user's role.
  if (userProfile.role === 'seeker') {
    return <SeekerDashboard userProfile={userProfile} />;
  }

  if (userProfile.role === 'expert') {
    return <ExpertDashboard userProfile={userProfile} />;
  }

  // Fallback for any unexpected state
  return <p>An unexpected error occurred while loading your dashboard.</p>;
}
