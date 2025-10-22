'use client';
import { useState } from 'react';
import {
  ArrowLeft,
  Bookmark,
  Briefcase,
  Building,
  CheckCircle,
  Clock,
  Coins,
  DollarSign,
  Globe,
  Link as LinkIcon,
  Mail,
  MapPin,
  MoreVertical,
  Star,
  Users,
  Percent,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';

// Mock Data
const client = {
  id: 'techvision-solutions',
  name: 'TechVision Solutions',
  avatar: 'https://i.pravatar.cc/150?u=techvision',
  bio: "TechVision Solutions is a leading provider of innovative software solutions for the financial industry. We are dedicated to building cutting-edge products that solve real-world problems. Our team is growing, and we're always looking for talented freelancers to partner with on exciting projects. We value clear communication, high-quality work, and long-term relationships.",
  location: 'San Francisco, CA',
  industry: 'Technology',
  companySize: '50-200 employees',
  website: 'https://techvision.com',
  memberSince: '2024-01-15T00:00:00.000Z',
  verified: true,
  rating: 4.8,
  reviewCount: 42,
  jobsPosted: 28,
  totalSpent: 45320,
  hireRate: 85,
  openJobs: 3,
  responseRate: 95,
  responseTime: 'Within 2 hours',
};

const jobHistory = [
  { id: 1, title: 'Build a React Dashboard for Analytics Platform', budget: { from: 800, to: 1200 }, type: 'fixed', status: 'Open', postedAt: '2024-10-15T10:00:00Z', proposalsCount: 12, hiredFreelancer: null },
  { id: 2, title: 'Senior Blockchain Engineer (DeFi)', budget: { from: 120, to: 180, per: 'hr' }, type: 'hourly', status: 'In Progress', postedAt: '2024-10-10T14:30:00Z', proposalsCount: 25, hiredFreelancer: 'John D.' },
  { id: 3, title: 'UI/UX Designer for Mobile App', budget: { amount: 3000 }, type: 'fixed', status: 'Completed', postedAt: '2024-09-20T09:00:00Z', proposalsCount: 38, hiredFreelancer: 'Jane S.' },
  { id: 4, title: 'Content Writer for Crypto Blog', budget: { from: 40, to: 50, per: 'hr'}, type: 'hourly', status: 'Completed', postedAt: '2024-09-15T11:00:00Z', proposalsCount: 18, hiredFreelancer: 'Alex J.' },
  { id: 5, title: 'Next.js Performance Optimization', budget: { amount: 1500 }, type: 'fixed', status: 'Completed', postedAt: '2024-08-30T16:00:00Z', proposalsCount: 22, hiredFreelancer: 'Emily W.' },
  { id: 6, title: 'Smart Contract Audit', budget: { amount: 5000 }, type: 'fixed', status: 'Closed', postedAt: '2024-08-10T12:00:00Z', proposalsCount: 8, hiredFreelancer: null },
  { id: 7, title: 'Marketing Manager for SaaS Launch', budget: { from: 5000, to: 8000, per: 'mo'}, type: 'hourly', status: 'Open', postedAt: '2024-10-18T09:00:00Z', proposalsCount: 5, hiredFreelancer: null },
  { id: 8, title: 'Social Media Content Creator', budget: { amount: 800 }, type: 'fixed', status: 'Open', postedAt: '2024-10-17T18:00:00Z', proposalsCount: 9, hiredFreelancer: null },
];

const reviews = [
  { id: 1, freelancerId: 'jane-s', freelancerName: 'Jane S.', freelancerAvatar: 'https://i.pravatar.cc/150?u=jane-s', rating: 5, reviewText: "TechVision was a fantastic client. Clear communication, well-defined scope, and prompt payments. A pleasure to work with!", jobTitle: 'UI/UX Designer for Mobile App', createdAt: '2024-10-01T00:00:00Z', verified: true },
  { id: 2, freelancerId: 'alex-j', freelancerName: 'Alex J.', freelancerAvatar: 'https://i.pravatar.cc/150?u=alex-j', rating: 5, reviewText: "One of the best clients I've had. They respect the freelancer's expertise and provide excellent feedback. Highly recommended.", jobTitle: 'Content Writer for Crypto Blog', createdAt: '2024-09-28T00:00:00Z', verified: true },
  { id: 3, freelancerId: 'emily-w', freelancerName: 'Emily W.', freelancerAvatar: 'https://i.pravatar.cc/150?u=emily-w', rating: 4, reviewText: "Good project, but there were some minor scope creeps. Overall a positive experience, but be sure to define everything upfront.", jobTitle: 'Next.js Performance Optimization', createdAt: '2024-09-15T00:00:00Z', verified: true },
  { id: 4, freelancerId: 'mike-b', freelancerName: 'Mike B.', freelancerAvatar: 'https://i.pravatar.cc/150?u=mike-b', rating: 5, reviewText: "Professional team, interesting project. I look forward to collaborating again in the future.", jobTitle: 'Database Migration', createdAt: '2024-08-20T00:00:00Z', verified: true },
  { id: 5, freelancerId: 'chris-g', freelancerName: 'Chris G.', freelancerAvatar: 'https://i.pravatar.cc/150?u=chris-g', rating: 5, reviewText: "A+ client. They treat freelancers like part of the team.", jobTitle: 'API Development', createdAt: '2024-08-05T00:00:00Z', verified: true },
  { id: 6, freelancerId: 'sam-t', freelancerName: 'Sam T.', freelancerAvatar: 'https://i.pravatar.cc/150?u=sam-t', rating: 3, reviewText: "The project was okay, but communication could have been better. There were delays in getting feedback which extended the timeline.", jobTitle: 'QA Testing', createdAt: '2024-07-22T00:00:00Z', verified: true },
];

const ratingDistribution = [
  { rating: 5, count: 36, percentage: 85 },
  { rating: 4, count: 5, percentage: 12 },
  { rating: 3, count: 1, percentage: 3 },
  { rating: 2, count: 0, percentage: 0 },
  { rating: 1, count: 0, percentage: 0 },
];

function formatCurrency(amount: number) {
  if (amount >= 1000) {
    return `$${(amount / 1000).toFixed(0)}K+`;
  }
  return `$${amount}`;
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'long',
    year: '2024',
  });
}

function JobHistory() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Job History</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All ({jobHistory.length})</TabsTrigger>
            <TabsTrigger value="open">Open ({jobHistory.filter(j => j.status === 'Open').length})</TabsTrigger>
            <TabsTrigger value="in-progress">In Progress ({jobHistory.filter(j => j.status === 'In Progress').length})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({jobHistory.filter(j => j.status === 'Completed').length})</TabsTrigger>
          </TabsList>
          <div className="mt-4 space-y-4">
            {jobHistory.slice(0, 3).map(job => (
              <div key={job.id} className="border p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <Link href="#" className="font-semibold text-primary hover:underline">{job.title}</Link>
                    <p className="text-sm text-muted-foreground">Posted {new Date(job.postedAt).toLocaleDateString()}</p>
                  </div>
                  <Badge variant={
                    job.status === 'Open' ? 'default' :
                    job.status === 'In Progress' ? 'secondary' :
                    'outline'
                  }>{job.status}</Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                  <span>Proposals: {job.proposalsCount}</span>
                  {job.hiredFreelancer && <span>Hired: <Link href="#" className="text-primary">{job.hiredFreelancer}</Link></span>}
                </div>
              </div>
            ))}
          </div>
           <Button variant="link" className="mt-4">View all {jobHistory.length} jobs</Button>
        </Tabs>
      </CardContent>
    </Card>
  );
}

function ClientReviews() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Reviews & Ratings</CardTitle>
        <div className="flex items-center gap-2 pt-2">
            <div className="flex items-center">
                {[...Array(5)].map((_, i) => <Star key={i} className={`h-5 w-5 ${i < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'}`}/>)}
                 <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" style={{clipPath: 'inset(0 50% 0 0)'}}/>
            </div>
            <span className="font-bold text-lg">{client.rating.toFixed(1)}/5.0</span>
            <span className="text-muted-foreground">({client.reviewCount} reviews)</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 mb-6">
          {ratingDistribution.map(item => (
            <div key={item.rating} className="flex items-center gap-2 text-sm">
              <span className="w-12">{item.rating} stars</span>
              <Progress value={item.percentage} className="w-full h-2" />
              <span className="w-16 text-right text-muted-foreground">{item.count}</span>
            </div>
          ))}
        </div>
        <div className="space-y-6">
          {reviews.slice(0,3).map(review => (
            <div key={review.id}>
              <div className="flex items-start gap-4">
                <Avatar>
                  <AvatarImage src={review.freelancerAvatar} alt={review.freelancerName} />
                  <AvatarFallback>{review.freelancerName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold">{review.freelancerName}</p>
                    <div className="flex">
                        {[...Array(review.rating)].map((_, i) => <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400"/>)}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    <Link href="#" className="text-primary hover:underline">{review.jobTitle}</Link> &bull; {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                  <p className="mt-2 text-muted-foreground">{review.reviewText}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Button variant="link" className="mt-4">Show all {reviews.length} reviews</Button>
      </CardContent>
    </Card>
  )
}

export default function ClientProfilePage() {
    return (
        <div className="bg-muted/30 min-h-screen">
            <div className="container mx-auto py-8">
                 <div className="mb-4">
                     <Button variant="ghost" asChild>
                        <Link href="/dashboard/client/freelancers"><ArrowLeft className="mr-2 h-4 w-4"/> Back to search</Link>
                    </Button>
                 </div>

                <Card className="mb-8">
                    <CardContent className="p-6">
                         <div className="grid grid-cols-1 md:grid-cols-[auto_1fr_auto] items-start gap-6">
                            <Avatar className="w-24 h-24 border-4">
                                <AvatarImage src={client.avatar} alt={client.name} />
                                <AvatarFallback>{client.name.slice(0,2)}</AvatarFallback>
                            </Avatar>
                            <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                    <h1 className="text-3xl font-bold">{client.name}</h1>
                                    {client.verified && <Badge variant="outline" className="text-green-600 border-green-600/50"><CheckCircle className="h-3 w-3 mr-1"/> Verified</Badge>}
                                </div>
                                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-muted-foreground">
                                    <div className="flex items-center gap-1.5"><MapPin className="h-4 w-4" />{client.location}</div>
                                    <div className="flex items-center gap-1.5"><Clock className="h-4 w-4" />Member since {formatDate(client.memberSince)}</div>
                                </div>
                                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-2 text-muted-foreground">
                                    <div className="flex items-center gap-1"><Star className="h-4 w-4 text-yellow-400 fill-yellow-400"/> <span className="font-semibold text-foreground">{client.rating}</span> ({client.reviewCount} reviews)</div>
                                    <div className="flex items-center gap-1"><Briefcase className="h-4 w-4"/> {client.jobsPosted} jobs posted</div>
                                    <div className="flex items-center gap-1"><DollarSign className="h-4 w-4"/> {formatCurrency(client.totalSpent)} spent</div>
                                    <div className="flex items-center gap-1"><Percent className="h-4 w-4"/> {client.hireRate}% hire rate</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button variant="outline" size="icon"><Bookmark/></Button>
                                <Button>View Open Jobs</Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    <div className="lg:col-span-2 space-y-8">
                         <Card>
                            <CardHeader>
                                <CardTitle>About</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground whitespace-pre-wrap">{client.bio}</p>
                                <Separator className="my-4"/>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div className="flex items-center gap-2"><Building className="h-4 w-4 text-muted-foreground"/><div><p className="text-muted-foreground">Industry</p><p className="font-semibold">{client.industry}</p></div></div>
                                    <div className="flex items-center gap-2"><Users className="h-4 w-4 text-muted-foreground"/><div><p className="text-muted-foreground">Company Size</p><p className="font-semibold">{client.companySize}</p></div></div>
                                    <div className="flex items-center gap-2"><LinkIcon className="h-4 w-4 text-muted-foreground"/><div><p className="text-muted-foreground">Website</p><a href="#" className="font-semibold text-primary hover:underline">{client.website}</a></div></div>
                                </div>
                            </CardContent>
                        </Card>
                        
                        <JobHistory />

                        <ClientReviews />
                    </div>

                    <div className="lg:col-span-1 sticky top-24 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Client Stats</CardTitle>
                            </CardHeader>
                             <CardContent className="text-sm space-y-3">
                                <div className="flex justify-between"><span>Jobs Posted</span> <span className="font-semibold">{client.jobsPosted}</span></div>
                                <div className="flex justify-between"><span>Hire Rate</span> <span className="font-semibold">{client.hireRate}%</span></div>
                                <div className="flex justify-between"><span>Open Jobs</span> <span className="font-semibold">{client.openJobs}</span></div>
                                <div className="flex justify-between"><span>Total Spent</span> <span className="font-semibold">{formatCurrency(client.totalSpent)}</span></div>
                                 <Separator />
                                <div className="flex justify-between"><span>Response Rate</span> <span className="font-semibold">{client.responseRate}%</span></div>
                                <div className="flex justify-between"><span>Response Time</span> <span className="font-semibold">{client.responseTime}</span></div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Verifications</CardTitle>
                            </CardHeader>
                             <CardContent className="space-y-2">
                                <div className="flex items-center gap-2 text-sm font-medium text-green-600">
                                    <CheckCircle className="h-4 w-4"/> Payment Method Verified
                                </div>
                                <p className="text-sm text-muted-foreground">Client has a verified payment method on file.</p>
                                <div className="flex items-center gap-2 text-sm font-medium text-green-600 pt-2">
                                    <CheckCircle className="h-4 w-4"/> Email Verified
                                </div>
                                <div className="flex items-center gap-2 text-sm font-medium pt-2">
                                    <Mail className="h-4 w-4"/> {client.name.toLowerCase().replace(' ', '.')}@contractor.so
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
