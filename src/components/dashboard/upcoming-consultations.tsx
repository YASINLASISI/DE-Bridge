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
import { MoreHorizontal, Video, Phone, MessageSquare } from 'lucide-react';
import { mockConsultations } from '@/lib/mock-data';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import Link from 'next/link';


const consultations = mockConsultations.filter(c => new Date(c.date) >= new Date()).slice(0, 4);

export const UpcomingConsultations = () => {
  const getInitials = (name: string) => {
    if(!name) return 'U'
    const names = name.split(' ');
    if (names.length > 1 && names[0] && names[1]) {
      return `${names[0][0]}${names[1][0]}`;
    }
    if (name) return name.substring(0, 2);
    return 'U';
  }

  const isJoinable = (date: string, time: string) => {
    const sessionDateTime = new Date(`${date} ${time}`);
    const now = new Date();
    const oneHourBefore = new Date(sessionDateTime.getTime() - 60 * 60 * 1000);
    return now >= oneHourBefore && now <= sessionDateTime;
  }

  const getTypeIcon = (type: 'Video' | 'Phone' | 'Chat') => {
    switch (type) {
        case 'Video': return <Video className="h-4 w-4 text-muted-foreground" />;
        case 'Phone': return <Phone className="h-4 w-4 text-muted-foreground" />;
        case 'Chat': return <MessageSquare className="h-4 w-4 text-muted-foreground" />;
        default: return null;
    }
  }


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
              <TableHead className="hidden md:table-cell">Date & Time</TableHead>
              <TableHead className="hidden lg:table-cell">Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {consultations.map((consultation) => (
              <TableRow key={consultation.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={consultation.expert.photoUrl} />
                      <AvatarFallback>
                        {getInitials(consultation.expert.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{consultation.expert.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {consultation.expert.specialty}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                   <div>
                      <p className="font-medium">{new Date(consultation.date).toLocaleDateString('en-US', {weekday: 'long', month: 'long', day: 'numeric'})}</p>
                      <p className="text-sm text-muted-foreground">{consultation.time}</p>
                   </div>
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                    <Badge variant={consultation.status === 'Confirmed' ? 'secondary' : 'default'} 
                    className={cn(consultation.status === 'Confirmed' && 'bg-emerald-100 text-emerald-800')}>
                        {consultation.status}
                    </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    {isJoinable(consultation.date, consultation.time) ? (
                       <Button size="sm">Join Call</Button>
                    ) : (
                       <Button asChild size="sm" variant="outline"><Link href="/dashboard/bookings">View Details</Link></Button>
                    )}
                     <Button variant="ghost" size="icon" className="h-8 w-8 hidden sm:flex">
                        <MoreHorizontal className="h-4 w-4" />
                     </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
             {consultations.length === 0 && (
                <TableRow>
                    <TableCell colSpan={4} className="text-center h-24">
                        No upcoming consultations.
                    </TableCell>
                </TableRow>
            )}
          </TableBody>
        </Table>
         <Button variant="link" className="w-full mt-4" asChild>
            <Link href="/dashboard/bookings">View All Bookings</Link>
        </Button>
      </CardContent>
    </Card>
  );
};
