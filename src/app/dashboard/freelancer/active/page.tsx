
'use client';
import { useState } from 'react';
import {
  Briefcase,
  Clock,
  MoreVertical,
  CheckCircle,
  FileText,
  MessageSquare,
  List,
  LayoutGrid,
  AlertCircle,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const activeJobs = [
  {
    title: 'Senior Blockchain Engineer (DeFi)',
    client: {
      name: 'Crypto-Innovate',
      avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026707d',
    },
    status: 'On Track',
    progress: 75,
    dueDate: 'in 2 weeks',
    budget: '$120 - $180 / hr',
    type: 'Hourly',
    hoursToday: '4.5h',
    urgent: false,
    actionNeeded: false,
  },
  {
    title: 'Build React Dashboard for Analytics Platform',
    client: {
      name: 'TechCorp Inc.',
      avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026706e',
    },
    status: 'Pending Action',
    progress: 30,
    dueDate: 'in 3 weeks',
    budget: '$1,500',
    type: 'Fixed Price',
    urgent: false,
    actionNeeded: true,
  },
  {
    title: 'API Integration for SaaS',
    client: {
      name: 'SaaSify',
      avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    },
    status: 'Urgent',
    progress: 85,
    dueDate: 'in 2 days',
    budget: '$2,000',
    type: 'Fixed Price',
    urgent: true,
    actionNeeded: false,
  },
];

function JobCard({ job }: { job: any }) {
  const getBorderClass = () => {
    if (job.urgent) return '';
    if (job.actionNeeded) return '';
    return '';
  };

  return (
    <Card className={getBorderClass()}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg mb-1">{job.title}</CardTitle>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Avatar className="h-6 w-6">
                <AvatarImage src={job.client.avatar} />
                <AvatarFallback>{job.client.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <span>{job.client.name}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {job.status === 'On Track' && (
              <Badge variant="outline">
                <CheckCircle className="h-3 w-3 mr-1 text-green-500" />
                {job.status}
              </Badge>
            )}
            {job.status === 'Pending Action' && (
              <Badge variant="outline" className="border-orange-500 text-orange-500">
                <AlertCircle className="h-3 w-3 mr-1" />
                {job.status}
              </Badge>
            )}
            {job.status === 'Urgent' && (
              <Badge variant="destructive">
                <AlertCircle className="h-3 w-3 mr-1" />
                {job.status}
              </Badge>
            )}
            <MoreVertical className="h-5 w-5 text-muted-foreground" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <p className="text-sm font-medium">Progress</p>
            <p className="text-sm font-medium">{job.progress}%</p>
          </div>
          <Progress value={job.progress} />
          <p className="text-xs text-muted-foreground mt-1 text-right">
            Due {job.dueDate}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
          <div>
            <p className="font-semibold text-foreground">{job.budget}</p>
            <p>{job.type}</p>
          </div>
          {job.type === 'Hourly' && (
            <div className="text-right">
              <p className="font-semibold text-foreground">{job.hoursToday}</p>
              <p>Tracked Today</p>
            </div>
          )}
        </div>

        <div className="border-t mt-4 pt-4 flex items-center justify-end gap-2">
          <Button variant="outline">View Contract</Button>
          <Button>Message Client</Button>
          <Button variant="default">Submit Work</Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function ActiveJobsPage() {
  const [view, setView] = useState<'grid' | 'list'>('grid');

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Active Jobs</h1>
        <p className="text-muted-foreground mt-1">
          You have {activeJobs.length} jobs in progress.
        </p>
      </div>

      <Card>
        <CardContent className="p-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold">4.5h</p>
            <p className="text-sm text-muted-foreground">Hours Tracked Today</p>
          </div>
          <div>
            <p className="text-2xl font-bold">2</p>
            <p className="text-sm text-muted-foreground">Pending Milestones</p>
          </div>
          <div>
            <p className="text-2xl font-bold">$1,200</p>
            <p className="text-sm text-muted-foreground">This Week's Earnings</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-destructive">1</p>
            <p className="text-sm text-muted-foreground">Deadline Approaching</p>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
             <Button variant="secondary" size="sm">All</Button>
             <Button variant="ghost" size="sm">Urgent</Button>
             <Button variant="ghost" size="sm">Pending Action</Button>
             <Button variant="ghost" size="sm">On Track</Button>
        </div>
        <div className="flex items-center gap-1 border rounded-md p-1">
            <Button variant={view === 'grid' ? 'secondary' : 'ghost'} size="icon" onClick={() => setView('grid')}><LayoutGrid className="h-5 w-5"/></Button>
            <Button variant={view === 'list' ? 'secondary' : 'ghost'} size="icon" onClick={() => setView('list')}><List className="h-5 w-5"/></Button>
        </div>
      </div>

      {activeJobs.length > 0 ? (
        <div className={view === 'grid' ? "grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6" : "space-y-6"}>
          {activeJobs.map((job, index) => (
            <JobCard key={index} job={job} />
          ))}
        </div>
      ) : (
        <Card className="text-center py-12">
          <CardContent>
            <Briefcase className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-medium">No active jobs yet</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              When you start working on a job, it will appear here.
            </p>
            <Button className="mt-6">Browse Jobs</Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
