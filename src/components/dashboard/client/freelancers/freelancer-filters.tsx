
'use client';
import React from 'react';
import { Search, Star, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

const categories = [
  'Web Development',
  'Mobile Development',
  'Design & Creative',
  'Writing & Content',
  'Marketing',
  'Blockchain & Web3',
  'Data & Analytics',
];

const popularSkills = ['React', 'Python', 'Figma', 'Content Writing', 'JavaScript', 'UI/UX', 'SEO', 'Video Editing'];

export function FreelancerFilters() {
  const [rate, setRate] = React.useState([20, 100]);

  return (
    <Card>
      <CardHeader>
        <div className="relative">
          <Input placeholder="Search freelancers..." className="pr-10" />
          <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8">
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-semibold mb-3 text-base">Category</h3>
          <div className="space-y-2">
            {categories.map((cat) => (
              <div key={cat} className="flex items-center space-x-2">
                <Checkbox id={`cat-${cat}`} />
                <Label htmlFor={`cat-${cat}`} className="font-normal">{cat}</Label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-3 text-base">Skills</h3>
          <div className='space-y-3'>
            <Input placeholder="Type to search skills..." />
            <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="pl-2">React <button className="ml-1 -mr-1 p-0.5 rounded-full hover:bg-muted-foreground/20"><X className="h-3 w-3"/></button></Badge>
                <Badge variant="secondary" className="pl-2">Node.js <button className="ml-1 -mr-1 p-0.5 rounded-full hover:bg-muted-foreground/20"><X className="h-3 w-3"/></button></Badge>
            </div>
             <div className="flex flex-wrap gap-2 pt-2">
                {popularSkills.map(skill => (
                    <Button key={skill} variant="outline" size="sm" className="text-xs h-7">{skill}</Button>
                ))}
             </div>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-3 text-base">Hourly Rate</h3>
          <Slider
            defaultValue={[20, 100]}
            max={200}
            step={5}
            onValueChange={setRate}
            value={rate}
          />
          <div className="flex justify-between text-sm text-muted-foreground mt-2">
            <span>${rate[0]}</span>
            <span>${rate[1]}{rate[1] === 200 ? '+' : ''}/hour</span>
          </div>
        </div>

        <div>
            <h3 className="font-semibold mb-3 text-base">Minimum Rating</h3>
            <RadioGroup defaultValue="4.5" className="space-y-2">
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="any" id="any-rating" />
                    <Label htmlFor="any-rating" className="font-normal">Any rating</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="4" id="4-stars" />
                    <Label htmlFor="4-stars" className="font-normal flex items-center">4+ stars <Star className="w-4 h-4 ml-1 fill-yellow-400 text-yellow-400"/></Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="4.5" id="4.5-stars" />
                    <Label htmlFor="4.5-stars" className="font-normal flex items-center">4.5+ stars <Star className="w-4 h-4 ml-1 fill-yellow-400 text-yellow-400"/></Label>
                </div>
                 <div className="flex items-center space-x-2">
                    <RadioGroupItem value="4.8" id="4.8-stars" />
                    <Label htmlFor="4.8-stars" className="font-normal flex items-center">4.8+ stars (Top Rated)</Label>
                </div>
            </RadioGroup>
        </div>
        
        <div>
          <h3 className="font-semibold mb-3 text-base">Availability</h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="avail-now" />
              <Label htmlFor="avail-now" className="font-normal">Available now</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="avail-week" />
              <Label htmlFor="avail-week" className="font-normal">Available within 1 week</Label>
            </div>
             <div className="flex items-center space-x-2">
              <Checkbox id="avail-full-time" />
              <Label htmlFor="avail-full-time" className="font-normal">Full-time (40+ hrs/week)</Label>
            </div>
             <div className="flex items-center space-x-2">
              <Checkbox id="avail-part-time" />
              <Label htmlFor="avail-part-time" className="font-normal">Part-time ({'<'} 20 hrs/week)</Label>
            </div>
          </div>
        </div>

        <div>
            <h3 className="font-semibold mb-3 text-base">Location</h3>
            <div className='space-y-3'>
                <Select>
                    <SelectTrigger>
                        <SelectValue placeholder="Select country/region" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="us">United States</SelectItem>
                        <SelectItem value="ca">Canada</SelectItem>
                        <SelectItem value="ng">Nigeria</SelectItem>
                         <SelectItem value="gb">United Kingdom</SelectItem>
                         <SelectItem value="any">Any location</SelectItem>
                    </SelectContent>
                </Select>
                 <div className="flex items-center space-x-2">
                    <Checkbox id="same-timezone" />
                    <Label htmlFor="same-timezone" className="font-normal">Same timezone as me (GMT+1)</Label>
                </div>
            </div>
        </div>

         <div>
          <h3 className="font-semibold mb-3 text-base">Verification</h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="verified-only" />
              <Label htmlFor="verified-only" className="font-normal">Verified freelancers only</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="payment-verified" />
              <Label htmlFor="payment-verified" className="font-normal">Payment method verified</Label>
            </div>
             <div className="flex items-center space-x-2">
              <Checkbox id="portfolio-uploaded" />
              <Label htmlFor="portfolio-uploaded" className="font-normal">Portfolio uploaded</Label>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="font-semibold mb-3 text-base">Other</h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="rising-talent" />
              <Label htmlFor="rising-talent" className="font-normal">Rising talent</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="featured" />
              <Label htmlFor="featured" className="font-normal">Featured freelancers</Label>
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
