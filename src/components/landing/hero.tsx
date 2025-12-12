'use client';

import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';

const trustBadges = [
  'Verified Professionals',
  'Secure Payments',
  'Confidential Sessions',
];

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-48 md:pb-32 bg-transparent">
      <div className="container mx-auto max-w-7xl px-4">
        <motion.div
          className="grid grid-cols-1 gap-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="flex flex-col justify-center text-center">
            <motion.h1
              variants={itemVariants}
              className="font-headline text-5xl font-extrabold tracking-tight md:text-7xl"
            >
              <span className="block bg-gradient-to-r from-red-500 via-primary via-emerald-500 to-accent bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-fast">
                Connect with Nigerian Experts Abroad
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mt-6 max-w-xl mx-auto text-lg text-foreground/80 md:text-xl font-bold"
            >
              DE-Bridge is your trusted platform for virtual consultations and mentorship with verified diaspora professionals. Get world-class advice, right from Nigeria.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button size="lg" className="bg-gradient-to-r from-emerald-500 to-teal-600 text-primary-foreground hover:from-emerald-600 hover:to-teal-700 shadow-lg transform hover:scale-105 transition-transform duration-200 font-bold">
                Find an Expert <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="transform hover:scale-105 transition-transform duration-200 font-bold">
                Become an Expert
              </Button>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2"
            >
              {trustBadges.map((badge) => (
                <div key={badge} className="flex items-center gap-2 text-sm text-foreground/60 font-bold">
                  <CheckCircle className="h-4 w-4 text-emerald-500" />
                  <span>{badge}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
