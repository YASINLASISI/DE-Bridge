'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Star, Verified } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, where } from 'firebase/firestore';
import { Skeleton } from '../ui/skeleton';

// Combined type for easy access
type ExpertProfile = {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  totalSessions: number;
  profilePhoto: string;
};

const ExpertCard = ({ expert, index, inView }: { expert: ExpertProfile; index: number; inView: boolean }) => {
  const image = PlaceHolderImages.find((p) => p.id === `expert-${(index % 4) + 1}`);
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: index * 0.1 } },
  };
  
  return (
     <CarouselItem className="md:basis-1/2 lg:basis-1/3">
        <div className="p-1">
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <Card className="overflow-hidden group h-full flex flex-col">
              <CardContent className="p-6 flex-grow flex flex-col">
                <div className="flex-shrink-0">
                    {image && (
                        <Image
                        src={expert.profilePhoto || image.imageUrl}
                        alt={`Profile of ${expert.name}`}
                        width={120}
                        height={120}
                        className="rounded-full mx-auto ring-4 ring-offset-2 ring-offset-background ring-primary/50 transition-transform duration-300 group-hover:scale-110"
                        data-ai-hint={image.imageHint}
                        />
                    )}
                </div>
                <div className="text-center mt-4 flex-grow">
                  <h3 className="text-xl font-bold flex items-center justify-center gap-2">
                    {expert.name} <Verified className="h-5 w-5 text-blue-500" />
                  </h3>
                  <p className="text-primary font-medium">{expert.specialty}</p>
                  <div className="mt-2 flex items-center justify-center gap-2 text-sm text-foreground/70">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-accent" fill="currentColor" />
                      <span className="font-bold">{expert.rating}</span>
                    </div>
                    <span>·</span>
                    <span>{expert.totalSessions}+ Sessions</span>
                  </div>
                </div>
                <Button className="mt-6 w-full">View Profile</Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </CarouselItem>
  )
}

const ExpertSkeleton = ({index, inView}: {index: number, inView: boolean}) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: index * 0.1 } },
  };

  return (
    <CarouselItem className="md:basis-1/2 lg:basis-1/3">
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


export default function FeaturedExperts() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const firestore = useFirestore();
  const expertsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    // Query users collection for documents where role is 'expert'
    return query(collection(firestore, 'experts'));
  }, [firestore]);

  const { data: experts, isLoading } = useCollection<ExpertProfile>(expertsQuery);

  return (
    <section ref={ref} className="py-20 md:py-32 bg-secondary/50">
      <div className="container mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="font-headline text-4xl font-extrabold tracking-tight sm:text-5xl">
            Meet Our Top Experts
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/70">
            Handpicked professionals with proven track records and verified credentials.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-16"
        >
          <Carousel
            opts={{
              align: 'start',
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {isLoading && Array.from({ length: 5 }).map((_, index) => (
                <ExpertSkeleton key={index} index={index} inView={inView} />
              ))}
              {!isLoading && experts && experts.map((expert, index) => (
                <ExpertCard key={expert.id} expert={expert} index={index} inView={inView} />
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </motion.div>
      </div>
    </section>
  );
}
