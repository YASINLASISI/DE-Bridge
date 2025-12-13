'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { useState } from 'react';

const domains = ['Healthcare', 'Legal', 'Tech', 'Finance', 'Security', 'Education', 'Agriculture', 'Creative'];
const locations = ['UK', 'USA', 'Canada', 'UAE'];
const languages = ['English', 'Yoruba', 'Igbo', 'Hausa', 'Pidgin'];

const FilterSection = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <AccordionItem value={title}>
        <AccordionTrigger className="font-bold text-base py-3 hover:no-underline">{title}</AccordionTrigger>
        <AccordionContent className="pt-2">
            {children}
        </AccordionContent>
    </AccordionItem>
);

export default function ExpertFilterSidebar() {
    const [priceRange, setPriceRange] = useState([50]);

  return (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle>Filter Experts</CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="multiple" defaultValue={['Domain', 'Availability', 'Price Range']} className="w-full">
            {/* Domain Filter */}
            <FilterSection title="Domain">
                <div className="space-y-3">
                    {domains.map(domain => (
                         <div key={domain} className="flex items-center space-x-2">
                            <Checkbox id={`domain-${domain}`} />
                            <Label htmlFor={`domain-${domain}`} className="font-normal cursor-pointer">{domain}</Label>
                        </div>
                    ))}
                </div>
            </FilterSection>

            {/* Availability Filter */}
             <FilterSection title="Availability">
                <RadioGroup defaultValue="any">
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="any" id="avail-any" />
                        <Label htmlFor="avail-any" className="font-normal">Any</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="24hrs" id="avail-24" />
                        <Label htmlFor="avail-24" className="font-normal">Next 24 hours</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="week" id="avail-week" />
                        <Label htmlFor="avail-week" className="font-normal">This week</Label>
                    </div>
                     <div className="flex items-center space-x-2">
                        <RadioGroupItem value="month" id="avail-month" />
                        <Label htmlFor="avail-month" className="font-normal">This month</Label>
                    </div>
                </RadioGroup>
            </FilterSection>

             {/* Price Range Filter */}
            <FilterSection title="Price Range">
                <div className="p-2">
                    <Slider
                        defaultValue={[50]}
                        max={200}
                        step={10}
                        onValueChange={(value) => setPriceRange(value)}
                    />
                    <div className="flex justify-between text-sm text-muted-foreground mt-2">
                        <span>₦20k</span>
                        <span>Up to ₦{priceRange[0] > 20 ? priceRange[0] : '20'}k/hr</span>
                        <span>₦200k+</span>
                    </div>
                </div>
            </FilterSection>

             {/* Rating Filter */}
            <FilterSection title="Rating">
                 <RadioGroup>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="4+" id="rate-4" />
                        <Label htmlFor="rate-4" className="font-normal">4 stars & up</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="4.5+" id="rate-4.5" />
                        <Label htmlFor="rate-4.5" className="font-normal">4.5 stars & up</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="5" id="rate-5" />
                        <Label htmlFor="rate-5" className="font-normal">5 stars</Label>
                    </div>
                </RadioGroup>
            </FilterSection>

            {/* Location Filter */}
            <FilterSection title="Location">
                <div className="space-y-3">
                    {locations.map(location => (
                         <div key={location} className="flex items-center space-x-2">
                            <Checkbox id={`loc-${location}`} />
                            <Label htmlFor={`loc-${location}`} className="font-normal">{location}</Label>
                        </div>
                    ))}
                </div>
            </FilterSection>

            {/* Language Filter */}
             <FilterSection title="Languages">
                <div className="space-y-3">
                    {languages.map(lang => (
                         <div key={lang} className="flex items-center space-x-2">
                            <Checkbox id={`lang-${lang}`} />
                            <Label htmlFor={`lang-${lang}`} className="font-normal">{lang}</Label>
                        </div>
                    ))}
                </div>
            </FilterSection>
        </Accordion>
      </CardContent>
    </Card>
  );
}
