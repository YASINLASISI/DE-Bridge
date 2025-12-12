'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Search,
  ShieldCheck,
  Video,
  BrainCircuit,
  Users,
  Award,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const featureList = [
  {
    icon: Search,
    title: 'Expert Discovery',
    description: 'Find and filter diaspora professionals across various fields.',
  },
  {
    icon: ShieldCheck,
    title: 'Secure Payments',
    description: 'Paystack integration with an escrow system for trust and safety.',
  },
  {
    icon: Video,
    title: 'Virtual Sessions',
    description: 'Seamless video calls and real-time chat for your consultations.',
  },
  {
    icon: BrainCircuit,
    title: 'AI Medical Translator',
    description: 'Translate Nigerian medical documents into standardized formats instantly.',
    isNew: true,
  },
  {
    icon: Users,
    title: 'Smart Matching',
    description: 'Our AI suggests the best experts for your specific needs.',
    isNew: true,
  },
  {
    icon: Award,
    title: 'Credential Verification',
    description: 'All experts are vetted for qualifications and experience.',
  },
];

export default function Features() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section ref={ref} className="py-20 md:py-32 bg-transparent">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="text-center">
          <h2 className="font-headline text-4xl font-extrabold tracking-tight sm:text-5xl">
            <span className="block bg-gradient-to-r from-red-500 via-primary via-emerald-500 to-accent bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-fast">
              A Platform Built for Trust and Excellence
            </span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/70">
            Every feature is designed to make your connection with diaspora experts seamless, secure, and impactful.
          </p>
        </div>

        <motion.div
          className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {featureList.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div key={index} variants={itemVariants}>
                <Card className="h-full transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="bg-primary/10 p-3 rounded-lg">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      {feature.isNew && <Badge variant="secondary" className="bg-emerald-100 text-emerald-800">New</Badge>}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardTitle className="text-xl font-bold mb-2">{feature.title}</CardTitle>
                    <p className="text-foreground/70">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
