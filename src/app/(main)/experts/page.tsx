'use client';

import React, { useState, useMemo } from 'react';
import { collection, query, where } from 'firebase/firestore';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import ExpertFilterSidebar from '@/components/experts/filter-sidebar';
import ExpertCard from '@/components/experts/expert-card';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { LayoutGrid, List, SlidersHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from '@/components/ui/drawer';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
} from '@/components/ui/pagination';

// Based on docs/backend.json Expert entity
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
  verificationStatus: 'pending' | 'approved' | 'rejected';
  // Assuming availability is part of the model
  isAvailableNow?: boolean; 
};

export default function ExpertsPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isFilterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const firestore = useFirestore();

  // For now, we query all approved experts. Filtering logic will be added later.
  const expertsQuery = useMemoFirebase(
    () => (firestore ? query(collection(firestore, 'experts'), where('verificationStatus', '==', 'approved')) : null),
    [firestore]
  );
  const { data: experts, isLoading } = useCollection<ExpertProfile>(expertsQuery);
  
  // Pagination logic (static for now)
  const currentPage = 1;
  const totalPages = Math.ceil((experts?.length || 0) / 9);

  return (
    <div className="bg-background">
      <div className="container mx-auto max-w-7xl px-4 py-12 md:py-20">
        {/* Page Header */}
        <div className="text-center mb-12">
            <h1 className="font-headline text-5xl font-extrabold tracking-tight">
                 <span className="block bg-gradient-to-r from-red-500 via-primary via-emerald-500 to-accent bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-fast">
                    Find Your Expert
                </span>
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/70 font-bold">
                Browse our global network of verified Nigerian professionals.
            </p>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar (Desktop) */}
          <div className="hidden lg:block w-full lg:w-1/4 xl:w-1/5">
            <ExpertFilterSidebar />
          </div>

          {/* Experts Grid / List */}
          <div className="flex-1">
            {/* Search and View Options */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-6 p-4 border rounded-lg bg-card">
              <div className="relative w-full sm:max-w-xs">
                <Input placeholder="Search by name or specialty..." className="pl-10" />
                 <List className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 border rounded-md p-1">
                   <Button
                    variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    aria-label="Grid view"
                  >
                    <LayoutGrid className="h-5 w-5" />
                  </Button>
                  <Button
                     variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    aria-label="List view"
                  >
                    <List className="h-5 w-5" />
                  </Button>
                </div>
                 <Drawer open={isFilterDrawerOpen} onOpenChange={setFilterDrawerOpen}>
                  <DrawerTrigger asChild>
                    <Button variant="outline" className="lg:hidden">
                        <SlidersHorizontal className="mr-2 h-4 w-4" />
                        Filters
                    </Button>
                  </DrawerTrigger>
                  <DrawerContent className="lg:hidden">
                    <div className="p-4 overflow-y-auto">
                        <ExpertFilterSidebar />
                    </div>
                  </DrawerContent>
                </Drawer>
              </div>
            </div>

            {/* Experts Grid */}
            <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
              {isLoading &&
                Array.from({ length: 9 }).map((_, index) => (
                   <Card key={index} className="p-4">
                     <div className="flex flex-col items-center text-center">
                        <Skeleton className="h-24 w-24 rounded-full mb-4" />
                        <Skeleton className="h-6 w-3/4 mb-2" />
                        <Skeleton className="h-4 w-1/2 mb-4" />
                        <Skeleton className="h-4 w-1/3 mb-2" />
                        <Skeleton className="h-4 w-1/4 mb-4" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                   </Card>
                ))}
              {!isLoading &&
                experts?.map((expert) => <ExpertCard key={expert.id} expert={expert as any} viewMode={viewMode} />)}
            </div>
            
             {!isLoading && experts?.length === 0 && (
                <div className="text-center py-16 col-span-full">
                    <p className="text-lg font-medium">No experts found.</p>
                    <p className="text-muted-foreground">Try adjusting your filters.</p>
                </div>
             )}

            {/* Pagination */}
            <div className="mt-12">
               <Pagination>
                <PaginationContent>
                    <PaginationItem>
                    <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                    <PaginationLink href="#" isActive>1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                    <PaginationLink href="#">2</PaginationLink>
                    </PaginationItem>
                     <PaginationItem>
                    <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                    <PaginationNext href="#" />
                    </PaginationItem>
                </PaginationContent>
                </Pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
