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
    <section className="relative overflow-hidden bg-background pt-32 pb-20 md:pt-48 md:pb-32">
       <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20 animate-gradient-shift"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1543286386-2e659306cd6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxhYnN0cmFjdCUyMG5ldHdvcmt8ZW58MHx8fHwxNzY1NTI4Mjc5fDA&ixlib=rb-4.1.0&q=80&w=1080')",
            backgroundSize: '400% 400%',
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full filter blur-3xl opacity-40 animate-blob"></div>
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full filter blur-3xl opacity-40 animate-blob" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-accent/10 rounded-full filter blur-3xl opacity-40 animate-blob" style={{animationDelay: '4s'}}></div>
      </div>

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
              Connect with Nigerian
              <span className="block bg-gradient-to-r from-primary via-emerald-500 to-accent bg-clip-text text-transparent">
                Experts Abroad
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mt-6 max-w-xl mx-auto text-lg text-foreground/80 md:text-xl"
            >
              DE-Bridge is your trusted platform for virtual consultations and mentorship with verified diaspora professionals. Get world-class advice, right from Nigeria.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button size="lg" className="bg-gradient-to-r from-emerald-500 to-teal-600 text-primary-foreground hover:from-emerald-600 hover:to-teal-700 shadow-lg transform hover:scale-105 transition-transform duration-200">
                Find an Expert <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="transform hover:scale-105 transition-transform duration-200">
                Become an Expert
              </Button>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2"
            >
              {trustBadges.map((badge) => (
                <div key={badge} className="flex items-center gap-2 text-sm text-foreground/60">
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
