
import { DollarSign, FileText, Briefcase, Star, ArrowUp } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Progress } from '@/components/ui/progress';

const stats = [
  {
    title: 'Open Jobs',
    value: '3',
    icon: FileText,
    change: '+1 from last month',
    changeType: 'positive',
  },
  {
    title: 'Active Contracts',
    value: '5',
    icon: Briefcase,
    cta: 'View All',
  },
  {
    title: 'Total Spent',
    value: '$45,320',
    icon: DollarSign,
    subValue: 'Across 28 jobs',
  },
  {
    title: 'Avg. Rating',
    value: '4.8/5',
    icon: Star,
    rating: 4.8,
  },
];

const recentHires = [
    {
        name: 'John Doe',
        title: 'Full-Stack Developer',
        avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
        jobTitle: 'React Dashboard',
        rate: '$50/hr',
        status: 'Active',
    },
    {
        name: 'Jane Smith',
        title: 'UI/UX Designer',
        avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026705d',
        jobTitle: 'Mobile App Design',
        rate: '$3000',
        status: 'Completed',
    },
    {
        name: 'Alex Johnson',
        title: 'Blockchain Engineer',
        avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026706e',
        jobTitle: 'DeFi Protocol',
        rate: '$150/hr',
        status: 'Active',
    },
]


const openJobs = [
    {
        jobTitle: 'Build React Dashboard',
        proposals: 12,
        messaged: 4,
        shortlisted: 2,
        posted: '3 days ago',
    },
    {
        jobTitle: 'API Integration for SaaS',
        proposals: 8,
        messaged: 2,
        shortlisted: 1,
        posted: '1 week ago',
    }
]

export default function ClientDashboard() {
  return (
    <div className="space-y-8">
        <h1 className="text-3xl font-bold">Client Dashboard</h1>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map(stat => (
                <Card key={stat.title}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                        <stat.icon className="h-5 w-5 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stat.value}</div>
                        {stat.change && (
                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                                <ArrowUp className="h-4 w-4 text-green-500" />
                                <span className="text-green-500">{stat.change}</span>
                            </p>
                        )}
                        {stat.subValue && <p className="text-xs text-muted-foreground">{stat.subValue}</p>}
                        {stat.rating && (
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <div className="flex text-yellow-400">
                                    {[...Array(5)].map((_, i) => <Star key={i} className={`h-4 w-4 ${i < 4 ? 'fill-current' : ''}`} />)}
                                </div>
                                <span>({stat.rating}/5.0)</span>
                            </div>
                        )}
                         {stat.cta && <Button variant="link" size="sm" className="p-0 h-auto text-xs">{stat.cta}</Button>}
                    </CardContent>
                </Card>
            ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
                <CardHeader>
                    <CardTitle>My Open Jobs</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Job Title</TableHead>
                                <TableHead>Proposals</TableHead>
                                <TableHead>Messaged</TableHead>
                                <TableHead>Shortlisted</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {openJobs.map(job => (
                                <TableRow key={job.jobTitle}>
                                    <TableCell>
                                        <p className="font-medium">{job.jobTitle}</p>
                                        <p className="text-xs text-muted-foreground">Posted {job.posted}</p>
                                    </TableCell>
                                    <TableCell>{job.proposals}</TableCell>
                                    <TableCell>{job.messaged}</TableCell>
                                    <TableCell>{job.shortlisted}</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="sm">View</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle>Recent Hires</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                         <TableHeader>
                            <TableRow>
                                <TableHead>Freelancer</TableHead>
                                <TableHead>Job</TableHead>
                                <TableHead>Rate</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {recentHires.map(hire => (
                                <TableRow key={hire.name}>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Image src={hire.avatar} alt={hire.name} width={32} height={32} className="rounded-full" />
                                            <div>
                                                <p className="font-medium">{hire.name}</p>
                                                <p className="text-xs text-muted-foreground">{hire.title}</p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>{hire.jobTitle}</TableCell>
                                    <TableCell>{hire.rate}</TableCell>
                                    <TableCell><Badge variant={hire.status === 'Active' ? 'default' : 'outline'}>{hire.status}</Badge></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}

