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
  { name: 'Healthcare', icon: HeartPulse, count: 45 },
  { name: 'Legal', icon: Scale, count: 32 },
  { name: 'Tech', icon: Code, count: 88 },
  { name: 'Finance', icon: Landmark, count: 51 },
  { name: 'Security', icon: Shield, count: 18 },
  { name: 'Education', icon: GraduationCap, count: 62 },
  { name: 'Agriculture', icon: Leaf, count: 25 },
  { name: 'Creative', icon: Paintbrush, count: 41 },
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
          {categories.map(({ name, icon: Icon, count }) => (
            <Link key={name} href="/experts" passHref>
                <div
                  className="group flex flex-col items-center justify-center p-4 rounded-lg border h-full hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer"
                >
                  <Icon className="h-8 w-8 text-primary group-hover:text-accent-foreground" />
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
