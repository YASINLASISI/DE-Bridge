'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';

const consultations = [
  {
    expertName: 'Dr. Adeola Williams',
    expertPhoto: 'https://picsum.photos/seed/expert-1/100/100',
    specialty: 'Cardiology',
    date: '2024-08-15',
    time: '10:00 AM',
    isJoinable: true,
  },
  {
    expertName: 'Barr. Funke Adeboye',
    expertPhoto: 'https://picsum.photos/seed/expert-2/100/100',
    specialty: 'Corporate Law',
    date: '2024-08-18',
    time: '02:30 PM',
    isJoinable: false,
  },
];

export const UpcomingConsultations = () => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Upcoming Consultations</CardTitle>
        <CardDescription>
          Your next scheduled appointments.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Expert</TableHead>
              <TableHead className="hidden sm:table-cell">Date & Time</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {consultations.map((consultation, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={consultation.expertPhoto} />
                      <AvatarFallback>
                        {consultation.expertName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{consultation.expertName}</p>
                      <p className="text-sm text-muted-foreground">
                        {consultation.specialty}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                   <div>
                      <p className="font-medium">{new Date(consultation.date).toLocaleDateString('en-US', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})}</p>
                      <p className="text-sm text-muted-foreground">{consultation.time}</p>
                   </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    {consultation.isJoinable ? (
                       <Button size="sm">Join Call</Button>
                    ) : (
                       <Button size="sm" variant="outline">Reschedule</Button>
                    )}
                     <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                     </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
             {consultations.length === 0 && (
                <TableRow>
                    <TableCell colSpan={3} className="text-center h-24">
                        No upcoming consultations.
                    </TableCell>
                </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
