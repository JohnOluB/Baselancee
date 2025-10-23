
'use client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  Heart,
  MapPin,
  Clock,
  BarChart,
  UserCheck,
  Star,
  CheckCircle,
  Briefcase,
  DollarSign,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

type Budget = (
    | { from: number; to: number; per?: string }
    | { amount: number }
) & { currency: string };


export type Job = {
  isVerified: boolean;
  isHot: boolean;
  isFeatured: boolean;
  title: string;
  postedBy: string;
  postedAt: string;
  description: string;
  budget: Budget;
  budgetType: string;
  duration: string;
  location: string;
  experienceLevel: string;
  skills: string[];
  client: {
    name: string;
    avatar: string;
    rating: number;
    reviewCount: number;
    jobsPosted: number;
    spend: number;
    isPaymentVerified: boolean;
    location: string;
  };
  proposals: {
    count: number;
    averageBid?: number;
  };
};

function formatBudget(budget: Budget) {
    if ('amount' in budget) {
        return `${new Intl.NumberFormat('en-US', { style: 'currency', currency: budget.currency }).format(budget.amount)}`;
    }
    const from = new Intl.NumberFormat('en-US', { style: 'currency', currency: budget.currency, minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(budget.from);
    const to = new Intl.NumberFormat('en-US', { style: 'currency', currency: budget.currency, minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(budget.to);
    
    return `${from} - ${to}${budget.per ? ` / ${budget.per}`: ''}`;
}

export function JobCard({ job }: { job: Job }) {
  return (
    <Card className="hover:border-primary/50 transition-colors group">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4">
            <div>
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                    {job.isVerified && <Badge variant="outline" className="text-green-600 border-green-600/50"><CheckCircle className="h-3 w-3 mr-1"/> Verified</Badge>}
                    {job.isHot && <Badge variant="destructive">HOT</Badge>}
                    {job.isFeatured && <Badge className="bg-yellow-400 text-black hover:bg-yellow-500">Featured</Badge>}
                </div>
                <Link href="/dashboard/freelancer/jobs/1"><h3 className="text-xl font-bold group-hover:text-primary transition-colors">{job.title}</h3></Link>
                <p className="text-sm text-muted-foreground mt-1">Posted {job.postedAt} by {job.postedBy}</p>
            </div>
            <div className="flex items-start gap-2">
                <Button variant="outline" size="icon"><Heart className="h-4 w-4" /></Button>
                <Button asChild><Link href="/dashboard/freelancer/jobs/1">Apply Now</Link></Button>
            </div>
        </div>

        <Separator className="my-4" />

        <p className="text-sm text-muted-foreground line-clamp-2">{job.description} <Link href="/dashboard/freelancer/jobs/1" className="text-primary font-medium">Read More</Link></p>
        
        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3 text-sm">
            <div className="flex items-center gap-2"><DollarSign className="h-4 w-4 text-muted-foreground" /> <span>{formatBudget(job.budget)} &bull; {job.budgetType}</span></div>
            <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-muted-foreground" /> <span>{job.duration}</span></div>
            <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-muted-foreground" /> <span>{job.location}</span></div>
            <div className="flex items-center gap-2"><BarChart className="h-4 w-4 text-muted-foreground" /> <span>{job.experienceLevel}</span></div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
            {job.skills.map(skill => (
                <Badge key={skill} variant="secondary">{skill}</Badge>
            ))}
        </div>

        <Separator className="my-4" />

        <div className="flex flex-col sm:flex-row items-start gap-4">
            <Image src={job.client.avatar} alt={job.client.name} width={40} height={40} className="rounded-full" />
            <div className="flex-1">
                <h4 className="font-semibold">{job.client.name}</h4>
                 <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground mt-1">
                    <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                        <span className="font-medium text-foreground">{job.client.rating.toFixed(1)}</span>
                        <span>({job.client.reviewCount} reviews)</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Briefcase className="h-4 w-4"/>
                        <span>{job.client.jobsPosted} jobs posted</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4"/>
                         <span>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', notation: 'compact' }).format(job.client.spend)} spent</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4"/>
                        <span>{job.client.location}</span>
                    </div>
                    {job.client.isPaymentVerified && <div className="flex items-center gap-1 text-green-600"><CheckCircle className="h-4 w-4"/><span>Payment verified</span></div>}
                </div>
            </div>
        </div>

        <p className="text-sm text-muted-foreground mt-4">Proposals: {job.proposals.count}{job.proposals.averageBid && ` (Avg Bid: $${job.proposals.averageBid})`}</p>

      </CardContent>
    </Card>
  );
}
