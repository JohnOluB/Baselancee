
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import {
  FileText,
  Users,
  MessageSquare,
  MoreVertical,
  CheckCircle,
} from 'lucide-react';
import Link from 'next/link';

const jobs = [
  {
    id: '1',
    title: 'Build React Dashboard for Analytics Platform',
    status: 'Accepting Proposals',
    proposals: 24,
    messaged: 8,
    hired: 0,
    shortlisted: 3,
    posted: '3 days ago',
    budget: '$800 - $1200',
  },
  {
    id: '2',
    title: 'Senior Blockchain Engineer (DeFi)',
    status: 'In Progress',
    freelancer: {
      name: 'Alex Johnson',
      avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026706e',
    },
    progress: 75,
    dueDate: 'in 2 weeks',
    budget: '$120 - $180 / hr',
  },
  {
    id: '3',
    title: 'UI/UX Designer for Mobile App',
    status: 'Completed',
    freelancer: {
      name: 'Jane Smith',
      avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026705d',
    },
    paid: '$3000',
    rating: 5,
    budget: '$3000',
  },
    {
    id: '4',
    title: 'API Integration for SaaS',
    status: 'In Progress',
    freelancer: {
      name: 'John Doe',
      avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    },
    progress: 30,
    dueDate: 'in 3 weeks',
    budget: '$1500',
  },
  {
    id: '5',
    title: 'Content Writer for Crypto Blog',
    status: 'Archived',
    reason: 'Filled externally',
    posted: '2 months ago',
    budget: '$40 - $50 / hr',
  }
];

const getStatusVariant = (status: string) => {
    switch (status) {
        case 'Accepting Proposals': return 'default';
        case 'In Progress': return 'secondary';
        case 'Completed': return 'outline';
        case 'Archived': return 'destructive';
        default: return 'default';
    }
}

const JobCard = ({ job }: { job: any }) => (
    <Card>
        <CardHeader>
            <div className="flex justify-between items-start">
                <div>
                    <CardTitle className="text-lg mb-1">{job.title}</CardTitle>
                    <CardDescription>Posted {job.posted}</CardDescription>
                </div>
                <Badge variant={getStatusVariant(job.status)}>{job.status}</Badge>
            </div>
        </CardHeader>
        <CardContent>
            {job.status === 'Accepting Proposals' && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div>
                        <p className="text-2xl font-bold">{job.proposals}</p>
                        <p className="text-sm text-muted-foreground">Proposals</p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold">{job.messaged}</p>
                        <p className="text-sm text-muted-foreground">Messaged</p>
                    </div>
                     <div>
                        <p className="text-2xl font-bold">{job.shortlisted}</p>
                        <p className="text-sm text-muted-foreground">Shortlisted</p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold">{job.hired}</p>
                        <p className="text-sm text-muted-foreground">Hired</p>
                    </div>
                </div>
            )}
            {(job.status === 'In Progress' || job.status === 'Completed') && (
                <div className="flex items-center gap-4">
                    <Avatar>
                        <AvatarImage src={job.freelancer.avatar} />
                        <AvatarFallback>{job.freelancer.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-semibold">{job.freelancer.name}</p>
                        <p className="text-sm text-muted-foreground">Hired Freelancer</p>
                    </div>
                </div>
            )}
             {job.status === 'In Progress' && (
                <div className="mt-4">
                    <div className="flex justify-between items-center mb-1">
                        <p className="text-sm font-medium">Progress</p>
                        <p className="text-sm font-medium">{job.progress}%</p>
                    </div>
                    <Progress value={job.progress} />
                    <p className="text-xs text-muted-foreground mt-1 text-right">Due {job.dueDate}</p>
                </div>
            )}
            {job.status === 'Completed' && (
                 <div className="mt-4 space-y-2 text-sm">
                    <div className="flex justify-between"><span>Amount Paid:</span> <span className="font-semibold">{job.paid}</span></div>
                    <div className="flex justify-between"><span>Your Rating:</span> <span className="font-semibold flex items-center gap-1">{job.rating} ★</span></div>
                </div>
            )}
             {job.status === 'Archived' && (
                <p className="text-sm text-muted-foreground">Reason: {job.reason}</p>
            )}

            <div className="border-t mt-4 pt-4 flex items-center justify-between">
                <div className="text-sm font-semibold">{job.budget}</div>
                <div className="flex items-center gap-2">
                     {job.status === 'Accepting Proposals' && <Button variant="outline" asChild><Link href="#">Review Proposals</Link></Button>}
                     {job.status === 'In Progress' && <Button variant="outline" asChild><Link href="#">View Contract</Link></Button>}
                     {job.status === 'Completed' && <Button variant="outline">Leave Review</Button>}
                     <Button variant="default" asChild><Link href={`/dashboard/freelancer/jobs/${job.id}`}>View Job</Link></Button>
                </div>
            </div>
        </CardContent>
    </Card>
)

export default function ClientJobsPage() {
  const [activeTab, setActiveTab] = useState('active');

  const filteredJobs = jobs.filter(job => {
    if (activeTab === 'active') return job.status === 'Accepting Proposals';
    if (activeTab === 'in-progress') return job.status === 'In Progress';
    if (activeTab === 'completed') return job.status === 'Completed';
    if (activeTab === 'archived') return job.status === 'Archived';
    return true;
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">My Jobs</h1>
          <p className="text-muted-foreground mt-1">Manage your job postings and active contracts.</p>
        </div>
        <Button>Post a New Job</Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="archived">Archived</TabsTrigger>
        </TabsList>
        <div className="mt-6 space-y-6">
            {filteredJobs.length > 0 ? (
                filteredJobs.map((job, index) => <JobCard key={index} job={job} />)
            ) : (
                <Card className="text-center py-12">
                    <CardContent>
                        <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
                        <h3 className="mt-4 text-lg font-medium">No jobs in this category yet</h3>
                        <p className="mt-2 text-sm text-muted-foreground">When you have jobs that are {activeTab}, they will appear here.</p>
                        {activeTab !== 'active' && <Button className="mt-6" onClick={() => setActiveTab('active')}>View Active Jobs</Button>}
                    </CardContent>
                </Card>
            )}
        </div>
      </Tabs>
    </div>
  );
}
