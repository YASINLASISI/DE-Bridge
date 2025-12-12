'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Star } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';

const testimonialsData = [
  {
    id: 'testimonial-1',
    name: 'Tunde A.',
    role: 'Student, University of Lagos',
    text: "The mentorship I received was life-changing. Prof. Adewale helped me secure a scholarship for my Master's in Canada. I couldn't have done it without DE-Bridge.",
    rating: 5,
  },
  {
    id: 'testimonial-2',
    name: 'Chiamaka E.',
    role: 'Patient',
    text: "Getting a second opinion from a UK-based specialist was so easy. The doctor was thorough and the AI translation of my local lab results was incredibly helpful.",
    rating: 5,
  },
  {
    id: 'testimonial-3',
    name: 'Emeka O.',
    role: 'Startup Founder',
    text: "The legal advice for my tech startup was top-notch. I connected with a lawyer in Silicon Valley who understood both the Nigerian and US markets.",
    rating: 5,
  },
];

export default function Testimonials() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    },
  };

  return (
    <section ref={ref} className="py-20 md:py-32 bg-background">
      <div className="container mx-auto max-w-7xl px-4">
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
          }}
          className="text-center"
        >
          <h2 className="font-headline text-4xl font-extrabold tracking-tight sm:text-5xl">
            <span className="block bg-gradient-to-r from-red-500 via-primary via-emerald-500 to-accent bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-fast">
              Trusted by People Like You
            </span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/70">
            Hear what our users are saying about their DE-Bridge experience.
          </p>
        </motion.div>

        <motion.div
          className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {testimonialsData.map((testimonial) => {
            const image = PlaceHolderImages.find((p) => p.id === testimonial.id);
            return (
              <motion.div key={testimonial.name} variants={itemVariants}>
                <Card className="h-full flex flex-col justify-between transform transition-shadow duration-300 hover:shadow-xl">
                  <CardContent className="p-8">
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-accent" fill="currentColor" />
                      ))}
                    </div>
                    <blockquote className="mt-4 text-lg font-medium text-foreground">
                      "{testimonial.text}"
                    </blockquote>
                  </CardContent>
                  <div className="bg-secondary/50 p-6 flex items-center gap-4 border-t">
                    {image && (
                      <Image
                        src={image.imageUrl}
                        alt={`Photo of ${testimonial.name}`}
                        width={48}
                        height={48}
                        className="rounded-full"
                        data-ai-hint={image.imageHint}
                      />
                    )}
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-foreground/60">{testimonial.role}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
