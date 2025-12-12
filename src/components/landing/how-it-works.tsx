'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Search, Calendar, Video, Star } from 'lucide-react';

const steps = [
  {
    icon: Search,
    title: '1. Find Your Expert',
    description: 'Browse our network of verified diaspora professionals. Filter by specialty, price, and availability to find your perfect match.',
  },
  {
    icon: Calendar,
    title: '2. Book & Pay Securely',
    description: 'Select a time that works for you, choose your session duration, and pay securely. Your payment is held in escrow until after your session.',
  },
  {
    icon: Video,
    title: '3. Connect & Collaborate',
    description: 'Join your session via our secure video platform. Upload documents, chat in real-time, and get the expert guidance you need.',
  },
  {
    icon: Star,
    title: '4. Rate & Review',
    description: 'After your session, share your experience by rating your expert. This helps maintain our high standard of quality for the community.',
  },
];

export default function HowItWorks() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <section ref={ref} className="py-20 md:py-32 bg-background">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="text-center">
          <h2 className="font-headline text-4xl font-extrabold tracking-tight sm:text-5xl">
            Get Started in a Few Simple Steps
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/70">
            Connecting with world-class expertise has never been easier.
          </p>
        </div>

        <motion.div
          className="relative mt-20"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2 hidden md:block"></div>
          <div className="space-y-16">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={index}
                  className="relative flex flex-col md:flex-row items-center justify-center"
                  variants={itemVariants}
                >
                  <div className={`md:w-5/12 ${isEven ? 'md:pr-8' : 'md:pl-8 md:order-2'}`}>
                    <div className="text-left">
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                          <Icon className="h-6 w-6" />
                        </div>
                        <h3 className="text-2xl font-bold">{step.title}</h3>
                      </div>
                      <p className="mt-4 text-foreground/70">{step.description}</p>
                    </div>
                  </div>
                  <div className="hidden md:block absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary ring-8 ring-background"></div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
