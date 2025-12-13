'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import ExpertCard from '@/components/experts/expert-card';
import { mockExperts } from '@/lib/mock-data';
import { Sparkles } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';
import { Card, CardContent } from '../ui/card';
import { useState } from 'react';


const ExpertSkeleton = ({index, inView}: {index: number, inView: boolean}) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: index * 0.1 } },
  };

  return (
    <CarouselItem className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
      <div className="p-1">
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <Card className="overflow-hidden group h-full flex flex-col">
            <CardContent className="p-6 flex-grow flex flex-col items-center">
              <Skeleton className="h-[120px] w-[120px] rounded-full" />
              <div className="text-center mt-4 flex-grow space-y-2">
                <Skeleton className="h-6 w-32 mx-auto" />
                <Skeleton className="h-4 w-24 mx-auto" />
                <Skeleton className="h-4 w-40 mx-auto" />
              </div>
              <Skeleton className="h-10 w-full mt-6" />
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </CarouselItem>
  );
};


export function RecommendedExperts() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading
  useState(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  });

  const experts = mockExperts.slice(0, 8);

  return (
    <section ref={ref} className="py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <h2 className="text-xl font-bold tracking-tight">
                Recommended Experts
            </h2>
        </div>
        <p className="mt-1 text-muted-foreground">
          Handpicked professionals based on your profile and activity.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-6"
      >
        <Carousel
          opts={{
            align: 'start',
            loop: false,
          }}
          className="w-full"
        >
          <CarouselContent>
            {isLoading && Array.from({ length: 4 }).map((_, index) => (
              <ExpertSkeleton key={index} index={index} inView={inView} />
            ))}
            {!isLoading && experts && experts.map((expert, index) => (
               <CarouselItem key={expert.id} className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                    <div className='p-1 h-full'>
                        <ExpertCard expert={expert} viewMode='grid' />
                    </div>
               </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </motion.div>
    </section>
  );
}
