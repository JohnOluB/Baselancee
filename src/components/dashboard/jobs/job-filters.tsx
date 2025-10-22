
'use client';

import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { ScrollArea } from '@/components/ui/scroll-area';
import React from 'react';

const skills = [
    'React', 'Node.js', 'Python', 'Figma', 'Content Writing',
    'TypeScript', 'Next.js', 'GraphQL', 'Solidity', 'UI/UX Design'
]

export function JobFilters() {
    const [budget, setBudget] = React.useState([500, 5000]);

  return (
    <Card>
      <CardHeader>
        <div className="relative">
          <Input placeholder="Search job titles, keywords..." className="pr-10" />
          <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8">
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-semibold mb-3">Job Type</h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="fixed-price" />
              <Label htmlFor="fixed-price">Fixed Price</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="hourly" />
              <Label htmlFor="hourly">Hourly Rate</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="milestone" />
              <Label htmlFor="milestone">Milestone-Based</Label>
            </div>
          </div>
        </div>

        <div>
            <h3 className="font-semibold mb-3">Budget Range</h3>
            <Slider
                defaultValue={[500, 5000]}
                max={10000}
                step={100}
                onValueChange={setBudget}
                value={budget}
            />
            <div className="flex justify-between text-sm text-muted-foreground mt-2">
                <span>${budget[0]}</span>
                <span>${budget[1] === 10000 ? '10,000+' : budget[1]}</span>
            </div>
        </div>

        <div>
            <h3 className="font-semibold mb-3">Skills Required</h3>
            <Input placeholder="Type to search skills..." className="mb-3" />
            <ScrollArea className="h-32">
                 <div className="space-y-2 pr-4">
                    {skills.map(skill => (
                        <div key={skill} className="flex items-center space-x-2">
                            <Checkbox id={`skill-${skill}`} />
                            <Label htmlFor={`skill-${skill}`}>{skill}</Label>
                        </div>
                    ))}
                </div>
            </ScrollArea>
        </div>

        <div>
            <h3 className="font-semibold mb-3">Experience Level</h3>
            <RadioGroup defaultValue="any">
                <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="entry" id="entry" />
                        <Label htmlFor="entry">Entry Level</Label>
                    </div>
                     <div className="flex items-center space-x-2">
                        <RadioGroupItem value="intermediate" id="intermediate" />
                        <Label htmlFor="intermediate">Intermediate</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="expert" id="expert" />
                        <Label htmlFor="expert">Expert</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="any" id="any" />
                        <Label htmlFor="any">Any</Label>
                    </div>
                </div>
            </RadioGroup>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Expected Duration</h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="duration-1" />
              <Label htmlFor="duration-1">Less than 1 week</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="duration-2" />
              <Label htmlFor="duration-2">1-4 weeks</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="duration-3" />
              <Label htmlFor="duration-3">1-3 months</Label>
            </div>
             <div className="flex items-center space-x-2">
              <Checkbox id="duration-4" />
              <Label htmlFor="duration-4">3+ months</Label>
            </div>
          </div>
        </div>

         <div>
          <h3 className="font-semibold mb-3">Client Type</h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="client-verified" />
              <Label htmlFor="client-verified">Verified clients only</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="client-payment" />
              <Label htmlFor="client-payment">Payment verified</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="client-hires" />
              <Label htmlFor="client-hires">Previous hires (5+)</Label>
            </div>
          </div>
        </div>

        <div className="space-y-2 pt-4">
            <Button className="w-full">Apply Filters</Button>
            <Button variant="link" className="w-full">Clear All</Button>
        </div>

      </CardContent>
    </Card>
  );
}
