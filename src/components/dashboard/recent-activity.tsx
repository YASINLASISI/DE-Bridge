'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '../ui/button';

const activities = [
  {
    expertName: 'Dr. Ken. Bello',
    expertPhoto: 'https://picsum.photos/seed/activity-1/100/100',
    action: 'Consultation Completed',
    time: '2 hours ago',
  },
  {
    expertName: 'Mr. David B.',
    expertPhoto: 'https://picsum.photos/seed/activity-2/100/100',
    action: 'Booked a session',
    time: '1 day ago',
  },
   {
    expertName: 'Prof. Chibuzor',
    expertPhoto: 'https://picsum.photos/seed/activity-3/100/100',
    action: 'Review added',
    time: '3 days ago',
  },
];

export const RecentActivity = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Your last few interactions.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src={activity.expertPhoto} />
                <AvatarFallback>
                  {activity.expertName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-grow">
                <p className="text-sm font-medium">
                  <span className="font-bold">{activity.expertName}</span>
                </p>
                <p className="text-sm text-muted-foreground">{activity.action}</p>
              </div>
              <p className="text-xs text-muted-foreground shrink-0">{activity.time}</p>
            </div>
          ))}
        </div>
         <Button variant="link" className="w-full mt-4 px-0">View all activity</Button>
      </CardContent>
    </Card>
  );
};
