'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { BrainCircuit, Link } from 'lucide-react';

import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card } from '@/components/ui/card';

const ProblemStatement = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  const image = PlaceHolderImages.find((p) => p.id === 'problem-brain-drain');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <section ref={ref} className="py-20 md:py-32 bg-transparent">
      <div className="container mx-auto max-w-7xl px-4">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.div variants={itemVariants}>
            <div className="lg:pr-8">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                The Challenge
              </div>
              <h2 className="mt-4 font-headline text-4xl font-extrabold tracking-tight sm:text-5xl">
                <span className="block bg-gradient-to-r from-red-500 via-primary via-emerald-500 to-accent bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-fast">
                  Turning Brain Drain into Brain Gain
                </span>
              </h2>
              <p className="mt-6 text-lg text-foreground/80">
                Nigeria's greatest asset—its people—are making global impacts. Yet, access to this world-class expertise remains a challenge back home. DE-Bridge transforms this brain drain into a powerful network of knowledge exchange.
              </p>
              <div className="mt-8 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                      <BrainCircuit className="h-6 w-6" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Untapped Expertise</h3>
                    <p className="mt-1 text-foreground/70">
                      Millions of talented Nigerians abroad, but a disconnect with those who need their skills at home.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                      <Link className="h-6 w-6" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Bridging the Gap</h3>
                    <p className="mt-1 text-foreground/70">
                      We provide the digital infrastructure for seamless, secure, and impactful connections.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div variants={itemVariants} className="flex justify-center">
            {image && (
              <Card className="overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 relative aspect-video w-full max-w-lg">
                <Image
                  src={image.imageUrl}
                  alt={image.description}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  data-ai-hint={image.imageHint}
                />
              </Card>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemStatement;
