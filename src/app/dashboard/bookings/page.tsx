'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockConsultations } from '@/lib/mock-data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Video, Phone, MessageSquare, MoreVertical, Calendar, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from 'next/link';

type Consultation = typeof mockConsultations[0];

const getTypeIcon = (type: 'Video' | 'Phone' | 'Chat') => {
    switch (type) {
        case 'Video': return <Video className="h-4 w-4 text-muted-foreground" />;
        case 'Phone': return <Phone className="h-4 w-4 text-muted-foreground" />;
        case 'Chat': return <MessageSquare className="h-4 w-4 text-muted-foreground" />;
        default: return null;
    }
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

const ConsultationCard = ({ consultation }: { consultation: Consultation }) => {
    const isUpcoming = consultation.status === 'Confirmed' || consultation.status === 'Pending';
    
    return (
        <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-start justify-between">
                <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                        <AvatarImage src={consultation.expert.profilePhoto} />
                        <AvatarFallback>{getInitials(consultation.expert.name)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <CardTitle className='text-lg'>{consultation.expert.name}</CardTitle>
                        <CardDescription>{consultation.expert.specialty}</CardDescription>
                    </div>
                </div>
                 <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Contact Expert</DropdownMenuItem>
                         {isUpcoming && <DropdownMenuItem>Reschedule</DropdownMenuItem>}
                         {isUpcoming && <DropdownMenuItem className="text-destructive">Cancel</DropdownMenuItem>}
                         {!isUpcoming && consultation.status === 'Completed' && <DropdownMenuItem>Leave a Review</DropdownMenuItem>}
                    </DropdownMenuContent>
                </DropdownMenu>
            </CardHeader>
            <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                        <p className="font-semibold">Date</p>
                        <p>{new Date(consultation.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <div>
                        <p className="font-semibold">Time</p>
                        <p>{consultation.time} WAT</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    {getTypeIcon(consultation.type)}
                     <div>
                        <p className="font-semibold">Type</p>
                        <p>{consultation.type} Call</p>
                    </div>
                </div>
                 <div className="flex items-center gap-2">
                     <Badge variant={consultation.status === 'Confirmed' ? 'secondary' : (consultation.status === 'Completed' ? 'outline' : 'destructive')}
                        className={cn(
                            consultation.status === 'Confirmed' && 'bg-emerald-100 text-emerald-800',
                            consultation.status === 'Completed' && 'bg-blue-100 text-blue-800 border-blue-200',
                            consultation.status === 'Cancelled' && 'bg-red-100 text-red-800'
                        )}
                    >
                        {consultation.status}
                    </Badge>
                </div>
            </CardContent>
            {isUpcoming && (
                 <CardFooter>
                    <Button asChild className='mr-2'><Link href="#">Join Call</Link></Button>
                    <Button variant="outline">Reschedule</Button>
                 </CardFooter>
            )}
        </Card>
    );
};

const EmptyState = ({title, description}: {title: string, description: string}) => (
    <div className="text-center py-16 rounded-lg border-2 border-dashed bg-card">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-muted-foreground mt-2">{description}</p>
        <Button asChild className="mt-4">
            <Link href="/dashboard/experts">Find an Expert</Link>
        </Button>
    </div>
);


export default function BookingsPage() {
    const upcomingConsultations = mockConsultations.filter(c => c.status === 'Confirmed' || c.status === 'Pending');
    const pastConsultations = mockConsultations.filter(c => c.status === 'Completed');
    const cancelledConsultations = mockConsultations.filter(c => c.status === 'Cancelled');

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Bookings</h1>
                <p className="text-muted-foreground">Manage your past, present, and future consultations.</p>
            </div>

            <Tabs defaultValue="upcoming">
                <TabsList className="grid w-full grid-cols-3 max-w-md">
                    <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                    <TabsTrigger value="past">Past</TabsTrigger>
                    <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
                </TabsList>
                <TabsContent value="upcoming" className="space-y-4">
                    {upcomingConsultations.length > 0 ? (
                        upcomingConsultations.map(c => <ConsultationCard key={c.id} consultation={c} />)
                    ) : (
                        <EmptyState title="No Upcoming Consultations" description="You don't have any sessions scheduled." />
                    )}
                </TabsContent>
                <TabsContent value="past" className="space-y-4">
                     {pastConsultations.length > 0 ? (
                        pastConsultations.map(c => <ConsultationCard key={c.id} consultation={c} />)
                     ) : (
                        <EmptyState title="No Past Consultations" description="Your completed sessions will appear here." />
                     )}
                </TabsContent>
                <TabsContent value="cancelled" className="space-y-4">
                     {cancelledConsultations.length > 0 ? (
                        cancelledConsultations.map(c => <ConsultationCard key={c.id} consultation={c} />)
                     ) : (
                        <EmptyState title="No Cancelled Consultations" description="Your cancelled sessions will appear here." />
                     )}
                </TabsContent>
            </Tabs>
        </div>
    );
}
