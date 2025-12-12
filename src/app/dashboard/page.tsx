'use client';

import { useRouter } from 'next/navigation';
import { useUser, useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

// Define the User type based on your backend.json
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
  <div>
    <h2 className="text-2xl font-semibold mb-4">Welcome, Seeker {userProfile.name}!</h2>
    <p>Here you can find experts, manage your bookings, and view your messages.</p>
    {/* Placeholder for seeker-specific components */}
     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <p>You have no upcoming bookings.</p>
        </CardContent>
      </Card>
       <Card>
        <CardHeader>
          <CardTitle>Recent Messages</CardTitle>
        </CardHeader>
        <CardContent>
          <p>You have no new messages.</p>
        </CardContent>
      </Card>
       <Card>
        <CardHeader>
          <CardTitle>Find an Expert</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Ready to get started?</p>
          <Button className="mt-4">Search Experts</Button>
        </CardContent>
      </Card>
    </div>
  </div>
);

const ExpertDashboard = ({ userProfile }: { userProfile: UserProfile }) => (
  <div>
    <h2 className="text-2xl font-semibold mb-4">Welcome, Expert {userProfile.name}!</h2>
    <p>Manage your profile, view booking requests, and track your sessions.</p>
    {/* Placeholder for expert-specific components */}
     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      <Card>
        <CardHeader>
          <CardTitle>Booking Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <p>You have no new booking requests.</p>
        </CardContent>
      </Card>
       <Card>
        <CardHeader>
          <CardTitle>Your Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Keep your profile updated to attract clients.</p>
           <Button variant="outline" className="mt-4">Edit Profile</Button>
        </CardContent>
      </Card>
       <Card>
        <CardHeader>
          <CardTitle>Total Earnings</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">$0.00</p>
        </CardContent>
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

  // Memoize the document reference
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
    // This case is handled by the layout, but as a fallback:
    return <div className="flex h-full w-full items-center justify-center"><p>Redirecting to login...</p></div>;
  }
  
  if (error) {
    // This will catch Firestore permission errors from useDoc
    return <div className="text-red-500">Error loading your profile: {error.message}</div>
  }

  // If there's an authenticated user but no profile document after loading.
  if (!userProfile) {
    return <RoleSelection onSelectRole={handleSelectRole} />;
  }

  // Render the correct dashboard based on the user's role.
  if (userProfile.role === 'seeker') {
    return <SeekerDashboard userProfile={userProfile} />;
  }

  if (userProfile.role === 'expert') {
    return <ExpertDashboard userProfile={userProfile} />;
  }

  // Fallback for any other case
  return <p>An unexpected error occurred.</p>;
}
