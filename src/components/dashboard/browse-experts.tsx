'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  HeartPulse,
  Scale,
  Code,
  Landmark,
  Shield,
  GraduationCap,
  Leaf,
  Paintbrush,
} from 'lucide-react';
import Link from 'next/link';

const categories = [
  { name: 'Healthcare', icon: HeartPulse, count: 45, href: '/dashboard/experts?domain=Healthcare' },
  { name: 'Legal', icon: Scale, count: 32, href: '/dashboard/experts?domain=Legal' },
  { name: 'Tech', icon: Code, count: 88, href: '/dashboard/experts?domain=Tech' },
  { name: 'Finance', icon: Landmark, count: 51, href: '/dashboard/experts?domain=Finance' },
  { name: 'Security', icon: Shield, count: 18, href: '/dashboard/experts?domain=Security' },
  { name: 'Education', icon: GraduationCap, count: 62, href: '/dashboard/experts?domain=Education' },
  { name: 'Agriculture', icon: Leaf, count: 25, href: '/dashboard/experts?domain=Agriculture' },
  { name: 'Creative', icon: Paintbrush, count: 41, href: '/dashboard/experts?domain=Creative' },
];

export const BrowseExperts = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Browse Experts</CardTitle>
        <CardDescription>Find professionals by category.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map(({ name, icon: Icon, count, href }) => (
            <Link key={name} href={href} passHref>
                <div
                  className="group flex flex-col items-center justify-center p-4 rounded-lg border h-full hover:bg-primary/5 hover:border-primary/20 hover:shadow-md transition-all cursor-pointer"
                >
                  <Icon className="h-8 w-8 text-primary" />
                  <p className="mt-2 text-sm font-semibold text-center">{name}</p>
                  <p className="text-xs text-muted-foreground">{count} Experts</p>
                </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
