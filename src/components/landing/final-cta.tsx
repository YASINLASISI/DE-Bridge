'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function FinalCta() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
  };

  return (
    <section ref={ref} className="py-20 md:py-32">
      <div className="container mx-auto max-w-5xl px-4">
        <motion.div
          variants={variants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary to-blue-900 p-12 text-center"
        >
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          <div className="relative">
            <h2 className="font-headline text-4xl font-extrabold tracking-tight text-primary-foreground sm:text-5xl">
              Ready to Bridge the Gap?
            </h2>
            <p className="mt-4 max-w-xl mx-auto text-lg text-primary-foreground/80">
              Whether you're seeking guidance or ready to share your expertise, your journey starts here.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <Button
                size="lg"
                className="bg-background text-primary hover:bg-background/90 shadow-lg transform hover:scale-105 transition-transform duration-200"
              >
                Find an Expert <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground/50 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground transform hover:scale-105 transition-transform duration-200"
              >
                Become an Expert
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
