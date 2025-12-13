'use client';

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Star, Verified, ArrowRight } from 'lucide-react';

type ExpertProfile = {
  id: string;
  name: string;
  specialty: string;
  field: string;
  hourlyRate: number;
  currency: string;
  rating: number;
  totalSessions: number;
  profilePhoto?: string;
  isAvailableNow?: boolean;
};

interface ExpertCardProps {
  expert: ExpertProfile;
  viewMode?: 'grid' | 'list';
}

const getInitials = (name: string) => {
    if (!name) return 'EX';
    const names = name.split(' ');
    if (names.length > 1) {
      return `${names[0][0]}${names[1][0]}`;
    }
    return name.substring(0, 2);
};

const GridViewCard = ({ expert }: { expert: ExpertProfile }) => (
    <Card className="h-full flex flex-col group overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        <CardContent className="p-6 text-center flex flex-col flex-grow">
             <div className="relative mx-auto">
                <Avatar className="w-28 h-28 border-4 border-background ring-2 ring-primary">
                    <AvatarImage src={expert.profilePhoto} alt={expert.name} />
                    <AvatarFallback>{getInitials(expert.name)}</AvatarFallback>
                </Avatar>
                {expert.isAvailableNow && (
                    <span className="absolute bottom-1 right-1 block h-4 w-4 rounded-full bg-emerald-500 ring-2 ring-background" title="Available Now" />
                )}
            </div>
            <h3 className="mt-4 text-xl font-bold flex items-center justify-center gap-1.5">
                {expert.name} <Verified className="h-5 w-5 text-primary" />
            </h3>
            <p className="text-sm font-medium text-primary">{expert.specialty}</p>
            <div className="my-4 flex items-center justify-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                    <span className="font-semibold">{expert.rating.toFixed(1)}</span>
                    <span className="text-xs">({expert.totalSessions})</span>
                </div>
            </div>
            <p className="text-lg font-bold flex-grow">
                 {new Intl.NumberFormat('en-US', { style: 'currency', currency: expert.currency, maximumFractionDigits: 0 }).format(expert.hourlyRate)}/hr
            </p>
            <Button className="mt-4 w-full font-bold">Book Consultation</Button>
        </CardContent>
    </Card>
);

const ListViewCard = ({ expert }: { expert: ExpertProfile }) => (
     <Card className="h-full w-full group overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-primary/50">
        <CardContent className="p-4 flex flex-col sm:flex-row items-center gap-6">
            <div className="relative flex-shrink-0">
                <Avatar className="w-24 h-24 border-4 border-background ring-2 ring-primary">
                    <AvatarImage src={expert.profilePhoto} alt={expert.name} />
                    <AvatarFallback>{getInitials(expert.name)}</AvatarFallback>
                </Avatar>
                 {expert.isAvailableNow && (
                    <span className="absolute bottom-1 right-1 block h-4 w-4 rounded-full bg-emerald-500 ring-2 ring-background" title="Available Now" />
                )}
            </div>
            <div className="flex-grow text-center sm:text-left">
                 <h3 className="text-xl font-bold flex items-center justify-center sm:justify-start gap-1.5">
                    {expert.name} <Verified className="h-5 w-5 text-primary" />
                </h3>
                <p className="text-sm font-medium text-primary">{expert.specialty}</p>
                 <div className="mt-2 flex items-center justify-center sm:justify-start gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                        <span className="font-semibold">{expert.rating.toFixed(1)}</span>
                        <span className="text-xs">({expert.totalSessions} reviews)</span>
                    </div>
                    <span className="hidden md:inline">|</span>
                    <span className="hidden md:inline font-semibold text-foreground">{expert.field}</span>
                </div>
            </div>
            <div className="flex flex-col items-center sm:items-end gap-2 flex-shrink-0">
                <p className="text-xl font-bold">
                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: expert.currency, maximumFractionDigits: 0 }).format(expert.hourlyRate)}/hr
                </p>
                 <Button variant="ghost" size="sm">
                    View Profile <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </div>
        </CardContent>
    </Card>
);


export default function ExpertCard({ expert, viewMode = 'grid' }: ExpertCardProps) {
  if (viewMode === 'list') {
    return <ListViewCard expert={expert} />;
  }
  return <GridViewCard expert={expert} />;
}
