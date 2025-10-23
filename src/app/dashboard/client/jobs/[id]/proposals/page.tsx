'use client';

import {
  ArrowLeft,
  Award,
  Calendar,
  CheckCircle,
  ChevronDown,
  Clock,
  FileText,
  Filter,
  Heart,
  Mail,
  MessageSquare,
  Star,
  UserPlus,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const job = {
  title: 'Build React Dashboard for Analytics Platform',
};

const proposals = [
  {
    id: 1,
    freelancer: {
      name: 'John Doe',
      title: 'Full-Stack Developer',
      avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
      rating: 4.8,
      reviewCount: 28,
      isVerified: true,
      status: 'Top Rated',
    },
    bid: '1000 USDC',
    coverLetter:
      "I'm a passionate full-stack developer with 5+ years of experience building performant and beautiful analytics dashboards, just like the one you're looking for. I specialize in React, TypeScript, and data visualization libraries...",
    submitted: '2 hours ago',
    stats: {
      successRate: '92%',
      jobsCompleted: 28,
      earnings: '4k+',
    },
    isShortlisted: true,
  },
  {
    id: 2,
    freelancer: {
      name: 'Michael Brown',
      title: 'React Native Developer',
      avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026708d',
      rating: 4.6,
      reviewCount: 20,
      isVerified: true,
      status: 'Rising Talent',
    },
    bid: '1150 USDC',
    coverLetter:
      "While my main focus is mobile, I have extensive experience with React and could quickly adapt to build your web dashboard. I'm a fast learner and dedicated to delivering high-quality results. I am confident I can exceed your expectations.",
    submitted: '5 hours ago',
    stats: {
      successRate: '90%',
      jobsCompleted: 18,
      earnings: '3k+',
    },
    isShortlisted: false,
  },
  {
    id: 3,
    freelancer: {
      name: 'Chris Green',
      title: 'Data Scientist',
      avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026709d',
      rating: 4.9,
      reviewCount: 10,
      isVerified: false,
      status: 'Rising Talent',
    },
    bid: '900 USDC',
    coverLetter:
      'As a data scientist with strong frontend skills in React, I can bring a unique perspective to your analytics dashboard. I understand the importance of clear and effective data visualization and can help ensure your dashboard is not only functional but also insightful.',
    submitted: '1 day ago',
    stats: {
      successRate: '100%',
      jobsCompleted: 8,
      earnings: '8k+',
    },
    isShortlisted: false,
  },
];

const ProposalCard = ({ proposal }: { proposal: (typeof proposals)[0] }) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-6">
          <div className="flex flex-col items-center">
            <Avatar className="w-20 h-20 border">
              <AvatarImage src={proposal.freelancer.avatar} />
              <AvatarFallback>
                {proposal.freelancer.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <Button variant="link" size="sm" asChild className="mt-2">
                <Link href={`/dashboard/clients/${proposal.id}`}>View Profile</Link>
            </Button>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-start">
                <div>
                     <div className="flex items-center gap-2">
                        <h3 className="text-xl font-bold">
                        {proposal.freelancer.name}
                        </h3>
                        {proposal.freelancer.isVerified && <CheckCircle className="h-5 w-5 text-primary" />}
                    </div>
                    <p className="text-muted-foreground">{proposal.freelancer.title}</p>
                </div>
                 <div className="text-right">
                    <p className="text-xl font-bold">{proposal.bid}</p>
                    <p className="text-xs text-muted-foreground">Submitted {proposal.submitted}</p>
                </div>
            </div>
            
             <div className="flex items-center gap-4 text-sm text-muted-foreground border-t border-b py-2">
                <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400"/>
                    <span className="font-semibold text-foreground">{proposal.freelancer.rating}</span>
                    <span>({proposal.freelancer.reviewCount} reviews)</span>
                </div>
                 <span>•</span>
                <span>{proposal.stats.jobsCompleted} Jobs Completed</span>
                <span>•</span>
                <span>{proposal.stats.successRate} Success Rate</span>
            </div>

            <p className="text-sm text-muted-foreground italic line-clamp-3">
              "{proposal.coverLetter}"
            </p>
             <div className="flex justify-end gap-2">
                <Button variant={proposal.isShortlisted ? "secondary" : "outline"}><Star className="mr-2 h-4 w-4"/>{proposal.isShortlisted ? 'Shortlisted' : 'Shortlist'}</Button>
                <Button variant="outline"><MessageSquare className="mr-2 h-4 w-4" /> Message</Button>
                <Button>Hire Freelancer</Button>
             </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default function ReviewProposalsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" asChild>
          <Link href="/dashboard/client/jobs">
            <ArrowLeft />
          </Link>
        </Button>
        <div>
          <p className="text-sm text-muted-foreground">
            Back to My Jobs
          </p>
          <h1 className="text-2xl font-bold">Proposals for "{job.title}"</h1>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex-1">
              <CardTitle>
                {proposals.length} Proposals Received
              </CardTitle>
              <CardDescription>
                Review, shortlist, and hire the best talent for your project.
              </CardDescription>
            </div>
             <div className="flex items-center gap-2">
                <Button variant="outline"><Filter className="mr-2 h-4 w-4"/> Filter</Button>
                 <Select defaultValue="relevant">
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="relevant">Best Match</SelectItem>
                        <SelectItem value="newest">Newest First</SelectItem>
                        <SelectItem value="rating">Highest Rated</SelectItem>
                        <SelectItem value="bid_low">Lowest Bid</SelectItem>
                         <SelectItem value="bid_high">Highest Bid</SelectItem>
                    </SelectContent>
                </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {proposals.map((proposal) => (
            <ProposalCard key={proposal.id} proposal={proposal} />
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
