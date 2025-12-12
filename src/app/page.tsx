import Hero from '@/components/landing/hero';
import ProblemStatement from '@/components/landing/problem-statement';
import Features from '@/components/landing/features';
import HowItWorks from '@/components/landing/how-it-works';
import FeaturedExperts from '@/components/landing/featured-experts';
import Testimonials from '@/components/landing/testimonials';
import FinalCta from '@/components/landing/final-cta';

export default function Home() {
  return (
    <>
      <Hero />
      <ProblemStatement />
      <Features />
      <HowItWorks />
      <FeaturedExperts />
      <Testimonials />
      <FinalCta />
    </>
  );
}
