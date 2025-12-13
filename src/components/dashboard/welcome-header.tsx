'use client';

import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

export const WelcomeHeader = ({
  name,
  description = "Here's an overview of your consultations and activities.",
}: {
  name: string;
  description?: string;
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome back, {name}!
        </h1>
        <p className="text-muted-foreground mt-1">{description}</p>
      </div>
      <Button>
        <PlusCircle className="mr-2 h-4 w-4" />
        New Consultation
      </Button>
    </div>
  );
};
