'use client';

import { useMemoFirebase, useCollection, useFirestore } from '@/firebase';
import { collection, query, where } from 'firebase/firestore';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

type ExpertProfile = {
  id: string;
  name: string;
  specialty: string;
  field: string;
  hourlyRate: number;
  currency: string;
  rating: number;
  verificationStatus: 'pending' | 'approved' | 'rejected';
  profilePhoto?: string;
};

const ExpertRow = ({ expert }: { expert: ExpertProfile }) => {
  const getInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length > 1) {
      return `${names[0][0]}${names[1][0]}`;
    }
    return name.substring(0, 2);
  };
  
  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src={expert.profilePhoto} alt={expert.name} />
            <AvatarFallback>{getInitials(expert.name)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{expert.name}</p>
            <p className="text-sm text-muted-foreground">{expert.field}</p>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <Badge variant="secondary">{expert.specialty}</Badge>
      </TableCell>
       <TableCell className="text-center">
        <div className="flex items-center justify-center gap-1">
           <span className="font-bold">{expert.rating.toFixed(1)}</span>
        </div>
      </TableCell>
      <TableCell className="text-right font-medium">
        {new Intl.NumberFormat('en-US', { style: 'currency', currency: expert.currency }).format(expert.hourlyRate)}/hr
      </TableCell>
      <TableCell className="text-right">
        <Button variant="ghost" size="sm" asChild>
          <Link href={`/experts/${expert.id}`}>
            View Profile <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </TableCell>
    </TableRow>
  );
};

const SkeletonRow = () => (
    <TableRow>
        <TableCell>
            <div className="flex items-center gap-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-[150px]" />
                    <Skeleton className="h-3 w-[100px]" />
                </div>
            </div>
        </TableCell>
        <TableCell>
            <Skeleton className="h-6 w-[100px]" />
        </TableCell>
        <TableCell className="text-center">
             <Skeleton className="h-4 w-8 mx-auto" />
        </TableCell>
        <TableCell className="text-right">
             <Skeleton className="h-4 w-20 ml-auto" />
        </TableCell>
        <TableCell className="text-right">
            <Skeleton className="h-8 w-28 ml-auto" />
        </TableCell>
    </TableRow>
)

export default function FindExpertsPage() {
  const firestore = useFirestore();
  const expertsQuery = useMemoFirebase(
    () => (firestore ? query(collection(firestore, 'experts'), where('verificationStatus', '==', 'approved')) : null),
    [firestore]
  );
  const { data: experts, isLoading } = useCollection<ExpertProfile>(expertsQuery);

  return (
    <div className="space-y-6">
       <div className="flex justify-between items-start">
        <div>
            <h1 className="text-3xl font-bold">Find an Expert</h1>
            <p className="text-muted-foreground">Browse our network of verified diaspora professionals.</p>
        </div>
        <Button asChild>
            <Link href="/experts">Advanced Search</Link>
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
           <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Expert</TableHead>
                <TableHead>Specialty</TableHead>
                <TableHead className="text-center">Rating</TableHead>
                <TableHead className="text-right">Rate</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
                {isLoading && Array.from({length: 5}).map((_, i) => <SkeletonRow key={i} />)}
                {!isLoading && experts && experts.map((expert) => (
                    <ExpertRow key={expert.id} expert={expert} />
                ))}
                 {!isLoading && experts?.length === 0 && (
                    <TableRow>
                        <TableCell colSpan={5} className="h-24 text-center">
                            No experts found. Please check back later.
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
