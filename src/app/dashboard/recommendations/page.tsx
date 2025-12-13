'use client';
import { useState, useEffect } from 'react';
import ExpertCard from '@/components/experts/expert-card';
import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card';
import { mockExperts } from '@/lib/mock-data';
import { Sparkles } from 'lucide-react';

export default function RecommendationsPage() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    const recommendedExperts = mockExperts.slice(4, 12);

    return (
        <div className="space-y-6">
            <div>
                <div className="flex items-center gap-2">
                     <Sparkles className="h-8 w-8 text-primary" />
                    <h1 className="text-3xl font-bold">Experts Recommended For You</h1>
                </div>
                <p className="text-muted-foreground">Based on your consultation history and interests in Healthcare and Tech.</p>
            </div>

            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {isLoading &&
                Array.from({ length: 8 }).map((_, index) => (
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
                recommendedExperts.map((expert) => <ExpertCard key={expert.id} expert={expert} viewMode='grid' />)}
            </div>
        </div>
    );
}
