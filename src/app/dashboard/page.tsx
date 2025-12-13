'use client';

import { useUser } from '@/firebase';

export default function DashboardPage() {
  const { isUserLoading } = useUser();

  if (isUserLoading) {
    return <div className="flex h-full w-full items-center justify-center"><p>Loading dashboard...</p></div>;
  }

  return (
    <div>
      {/* The dashboard is intentionally left blank as per the user's request. */}
    </div>
  );
}
