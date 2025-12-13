'use client';

import React, { useState, useMemo } from 'react';
import ExpertFilterSidebar from '@/components/experts/filter-sidebar';
import ExpertCard from '@/components/experts/expert-card';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { LayoutGrid, List, SlidersHorizontal, Search } from 'lucide-react';
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
import { mockExperts } from '@/lib/mock-data';

export default function ExpertsPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isFilterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading
  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const experts = mockExperts;
  
  // Pagination logic (static for now)
  const currentPage = 1;
  const totalPages = Math.ceil((experts?.length || 0) / 9);

  return (
    <div className="bg-muted/40">
      <div className="container mx-auto max-w-7xl px-4 py-12 md:py-20">
        {/* Page Header */}
        <div className="text-center mb-12">
            <h1 className="font-headline text-5xl font-extrabold tracking-tight">
                 <span className="block bg-gradient-to-r from-primary via-emerald-500 to-accent bg-clip-text text-transparent bg-cover animate-gradient-fast">
                    Find Your Expert
                </span>
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/70">
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
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-6 p-4 border rounded-lg bg-card shadow-sm">
              <div className="relative w-full sm:max-w-xs">
                <Input placeholder="Search by name, specialty..." className="pl-10" />
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 border rounded-md p-1 bg-muted">
                   <Button
                    variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                    size="icon"
                    onClick={() => setViewMode('grid')}
                    aria-label="Grid view"
                    className='h-8 w-8'
                  >
                    <LayoutGrid className="h-5 w-5" />
                  </Button>
                  <Button
                     variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                    size="icon"
                    onClick={() => setViewMode('list')}
                    aria-label="List view"
                    className='h-8 w-8'
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
                    <div className="p-4 overflow-y-auto max-h-[80vh]">
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
                experts?.map((expert) => <ExpertCard key={expert.id} expert={expert} viewMode={viewMode} />)}
            </div>
            
             {!isLoading && experts?.length === 0 && (
                <div className="text-center py-16 col-span-full bg-card rounded-lg border">
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
