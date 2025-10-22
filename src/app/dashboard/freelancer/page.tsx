
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
    title: 'Proposals Sent',
    value: '12',
    icon: FileText,
    change: '+3 from last month',
    changeType: 'positive',
  },
  {
    title: 'Active Jobs',
    value: '3',
    icon: Briefcase,
    cta: 'View All',
  },
  {
    title: 'Total Earned',
    value: '$4,560',
    icon: DollarSign,
    subValue: '3,800 USDC',
  },
  {
    title: 'Success Rate',
    value: '92%',
    icon: Star,
    rating: 4.8,
  },
];

const recommendedJobs = [
  {
    title: 'Senior Frontend Developer for E-commerce Platform',
    client: 'Shopify',
    posted: '2h ago',
    description: 'We are looking for an experienced frontend developer to join our team and help build the next generation of e-commerce experiences...',
    budget: '$80 - $120 / hr',
    type: 'Hourly',
    skills: ['React', 'TypeScript', 'Next.js'],
    duration: '3-6 months',
    location: 'Remote (US)',
  },
  {
    title: 'UI/UX Designer for Mobile App',
    client: 'Airtable',
    posted: '5h ago',
    description: 'Seeking a talented UI/UX designer to redesign our mobile application. You will be responsible for creating intuitive and visually appealing user interfaces.',
    budget: '$3,500',
    type: 'Fixed Price',
    skills: ['Figma', 'UI/UX Design', 'Mobile'],
    duration: '1-2 months',
    location: 'Remote',
  },
  {
    title: 'Blockchain Developer for DeFi Protocol',
    client: 'Coinbase',
    posted: '1d ago',
    description: 'Join our DeFi team to build and maintain smart contracts for our new lending protocol. Experience with Solidity and EVM is required.',
    budget: '$150 / hr',
    type: 'Hourly',
    skills: ['Solidity', 'Hardhat', 'EVM'],
    duration: 'Long-term',
    location: 'Remote',
  },
];


const activeJobs = [
    {
        client: { name: 'John Doe', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' },
        jobTitle: 'Build React Dashboard',
        budget: '800 USDC',
        progress: 60,
        dueDate: 'Oct 20',
    },
    {
        client: { name: 'Sarah Miller', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026705d' },
        jobTitle: 'API Integration for SaaS',
        budget: '1200 USDC',
        progress: 25,
        dueDate: 'Nov 5',
    }
]

export default function FreelancerDashboard() {
  return (
    <div className="space-y-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>

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
                                    {[...Array(5)].map((_, i) => <Star key={i} className={`h-4 w-4 ${i < Math.floor(stat.rating) ? 'fill-current' : ''}`} />)}
                                </div>
                                <span>({stat.rating}/5.0)</span>
                            </div>
                        )}
                         {stat.cta && <Button variant="link" size="sm" className="p-0 h-auto text-xs">{stat.cta}</Button>}
                    </CardContent>
                </Card>
            ))}
        </div>

        <Card>
            <CardHeader>
                <CardTitle>Recommended Jobs for You</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {recommendedJobs.map(job => (
                    <Card key={job.title} className="flex flex-col">
                        <CardHeader>
                            <CardTitle className="text-lg leading-tight">{job.title}</CardTitle>
                            <p className="text-sm text-muted-foreground">{job.client} &bull; {job.posted}</p>
                        </CardHeader>
                        <CardContent className="flex-grow">
                             <p className="text-sm text-muted-foreground line-clamp-2">{job.description}</p>
                            <div className="mt-4 flex flex-wrap gap-2">
                                {job.skills.map(skill => (
                                    <Badge key={skill} variant="secondary">{skill}</Badge>
                                ))}
                            </div>
                        </CardContent>
                        <div className="p-6 pt-0 border-t mt-4">
                           <div className="flex justify-between text-sm text-muted-foreground mt-4">
                                <span>{job.budget} &bull; {job.type}</span>
                                <span>{job.duration}</span>
                            </div>
                            <div className="mt-4 flex gap-2">
                                <Button variant="outline" className="w-full">View Details</Button>
                                <Button className="w-full">Apply Now</Button>
                            </div>
                        </div>

                    </Card>
                ))}
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Your Active Jobs</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Client</TableHead>
                            <TableHead>Job Title</TableHead>
                            <TableHead>Budget</TableHead>
                            <TableHead>Progress</TableHead>
                            <TableHead>Due Date</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {activeJobs.map(job => (
                            <TableRow key={job.jobTitle}>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <Image src={job.client.avatar} alt={job.client.name} width={32} height={32} className="rounded-full" />
                                        <span className="font-medium">{job.client.name}</span>
                                    </div>
                                </TableCell>
                                <TableCell>{job.jobTitle}</TableCell>
                                <TableCell>{job.budget}</TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <Progress value={job.progress} className="w-24" />
                                        <span className="text-xs text-muted-foreground">{job.progress}%</span>
                                    </div>
                                </TableCell>
                                <TableCell>{job.dueDate}</TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="sm">View</Button>
                                    <Button variant="ghost" size="sm">Chat</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    </div>
  );
}
