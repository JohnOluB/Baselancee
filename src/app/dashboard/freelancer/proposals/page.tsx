
'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  ArrowUp,
  FileText,
  Clock,
  CheckCircle,
  Eye,
  MoreVertical,
  Calendar,
  Users,
  DollarSign,
  Briefcase,
  MapPin,
  MessageSquare,
  XCircle,
  Archive,
  Star,
} from 'lucide-react';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

const stats = [
  {
    title: 'Total Proposals Sent',
    value: '84',
    icon: FileText,
    change: '+12 last month',
  },
  {
    title: 'Active Proposals',
    value: '15',
    icon: Clock,
  },
  {
    title: 'Win Rate',
    value: '22%',
    icon: CheckCircle,
  },
  {
    title: 'Avg. Response Time',
    value: '48 hours',
    icon: Calendar,
  },
];

const proposals = [
  {
    jobTitle: 'Build a React Dashboard for Analytics Platform',
    client: {
      name: 'TechCorp Inc.',
      avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026706e',
      isVerified: true,
      location: 'San Francisco, CA',
    },
    status: 'Viewed by Client',
    submitted: '2 hours ago',
    budget: '$800 - $1,200',
    bid: '1,000 USDC',
    timeline: '2 weeks',
    views: 3,
    lastViewed: '15 minutes ago',
    competing: 12,
    rank: 'Top 20%',
    tab: 'pending',
  },
  {
    jobTitle: 'Senior Blockchain Engineer (DeFi)',
    client: {
      name: 'Crypto-Innovate',
      avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026707d',
      isVerified: true,
      location: 'Global',
    },
    status: 'Interview Requested',
    submitted: '1 day ago',
    budget: '$120 - $180 / hr',
    bid: '150 USDC / hr',
    timeline: '3+ months',
    tab: 'interviewing',
  },
  {
    jobTitle: 'UI/UX Designer for Mobile App',
    client: {
      name: 'Creative Solutions',
      avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026708d',
      isVerified: true,
      location: 'Canada',
    },
    status: 'Accepted',
    submitted: '3 days ago',
    budget: '$3,000',
    bid: '2,800 USDC',
    timeline: '1 month',
    tab: 'accepted',
  },
  {
    jobTitle: 'Content Writer for Tech Blog',
    client: {
      name: 'Blogify',
      avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026709f',
      isVerified: false,
      location: 'Remote',
    },
    status: 'Declined',
    submitted: '1 week ago',
    budget: '$500',
    bid: '450 USDC',
    timeline: '2 weeks',
    reason: 'Chose another freelancer with more specific experience.',
    tab: 'declined',
  },
  {
    jobTitle: 'Social Media Manager for NFT Project',
    client: {
        name: 'ArtChain',
        avatar: 'https://i.pravatar.cc/150?u=a042581f4e2902670af',
        isVerified: true,
        location: 'Remote',
    },
    status: 'Draft',
    saved: '2 days ago',
    budget: '$1000 - $1500',
    bid: '1200 USDC',
    timeline: '1 month',
    tab: 'draft',
  },
];

const getStatusBadgeVariant = (status: string) => {
  switch (status) {
    case 'Awaiting Review':
      return 'secondary';
    case 'Viewed by Client':
      return 'default';
    case 'Interview Requested':
      return 'default';
    case 'Accepted':
      return 'outline';
    case 'Declined':
    case 'Withdrawn':
      return 'destructive';
    case 'Draft':
        return 'secondary'
    default:
      return 'default';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'Viewed by Client':
      return <Eye className="h-3 w-3 mr-1" />;
    case 'Accepted':
      return <CheckCircle className="h-3 w-3 mr-1" />;
    case 'Declined':
      return <XCircle className="h-3 w-3 mr-1" />;
    case 'Withdrawn':
      return <Archive className="h-3 w-3 mr-1" />;
    default:
      return null;
  }
};

function ProposalCard({ proposal }: { proposal: any }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <Link href="/dashboard/freelancer/jobs/1">
              <CardTitle className="text-lg mb-1 hover:underline">
                {proposal.jobTitle}
              </CardTitle>
            </Link>
            <CardDescription>{proposal.status === 'Draft' ? `Saved ${proposal.saved}` : `Submitted ${proposal.submitted}`}</CardDescription>
          </div>
          <Badge
            variant={getStatusBadgeVariant(proposal.status)}
            className="flex items-center"
          >
            {getStatusIcon(proposal.status)}
            {proposal.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-3 gap-6 text-sm">
          {/* Job Details */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={proposal.client.avatar} />
                <AvatarFallback>
                  {proposal.client.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{proposal.client.name}</p>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  {proposal.client.isVerified && (
                    <CheckCircle className="h-3 w-3 text-primary" />
                  )}
                  <span>{proposal.client.location}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Briefcase className="h-4 w-4" />
              <span>{proposal.budget}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{proposal.timeline}</span>
            </div>
            <Button variant="link" size="sm" asChild className="p-0 h-auto">
              <Link href="/dashboard/freelancer/jobs/1">
                View Original Job Post
              </Link>
            </Button>
          </div>

          {/* Your Proposal */}
          {proposal.tab !== 'draft' ? (
            <div className="space-y-3 bg-muted/50 p-3 rounded-lg">
                <p className="font-semibold">Your Proposal</p>
                <div>
                <p className="text-xl font-bold">{proposal.bid}</p>
                <p className="text-xs text-muted-foreground">
                    You'll receive: ~$
                    {(
                    parseFloat(proposal.bid.replace(/[^0-9.]/g, '')) * 0.98
                    ).toFixed(2)}{' '}
                    USDC
                </p>
                </div>
                <p>
                <span className="font-medium">Timeline:</span> {proposal.timeline}
                </p>
                <p className="text-muted-foreground italic line-clamp-2">
                "I am confident I can deliver a high-quality dashboard..."
                <Button variant="link" size="sm" className="p-0 h-auto ml-1">
                    Read More
                </Button>
                </p>
            </div>
          ) : (
             <div className="space-y-3 bg-muted/50 p-3 rounded-lg flex flex-col items-center justify-center text-center">
                <FileText className="h-8 w-8 text-muted-foreground" />
                <p className="font-semibold">Proposal Draft</p>
                <p className="text-xs text-muted-foreground">You haven't submitted this proposal yet.</p>
             </div>
          )}

          {/* Metrics & Actions */}
          <div className="space-y-3">
            {proposal.views > 0 && (
              <div className="flex items-center gap-2 text-primary font-medium">
                <Eye className="h-4 w-4" />
                <span>
                  Viewed {proposal.views} times (last viewed:{' '}
                  {proposal.lastViewed})
                </span>
              </div>
            )}
            {proposal.competing && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>Competing with {proposal.competing} freelancers</span>
              </div>
            )}
            {proposal.rank && (
              <div className="flex items-center gap-2 text-green-600 font-medium">
                <Star className="h-4 w-4" />
                <span>Bid is in the {proposal.rank}</span>
              </div>
            )}
            {proposal.reason && (
              <p className="text-destructive text-xs">
                Feedback: {proposal.reason}
              </p>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        {proposal.status === 'Draft' ? (
            <>
                <Button variant="destructive" className="mr-auto">Delete Draft</Button>
                <Button>Continue Editing</Button>
            </>
        ) : proposal.status === 'Accepted' ? (
          <>
            <Button variant="default">View Contract</Button>
            <Button>Start Work</Button>
          </>
        ) : proposal.status === 'Interview Requested' ? (
          <>
            <Button variant="outline" asChild>
                <Link href="/dashboard/freelancer/messages">Message Client</Link>
            </Button>
            <Button>Schedule Call</Button>
          </>
        ) : proposal.status !== 'Declined' &&
          proposal.status !== 'Withdrawn' ? (
          <>
            <Button variant="destructive" className="mr-auto">
              Withdraw
            </Button>
            <Button variant="outline">Edit Proposal</Button>
            <Button asChild>
                <Link href="/dashboard/freelancer/messages">Message Client</Link>
            </Button>
          </>
        ) : (
          <Button variant="outline">View Similar Jobs</Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default function ProposalsPage() {
  const [activeTab, setActiveTab] = useState('pending');

  const filteredProposals = proposals.filter(
    (proposal) => proposal.tab === activeTab
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">My Proposals</h1>
        <p className="text-muted-foreground mt-1">
          Track your submitted proposals and win rates.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
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
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="pending">
            Pending ({proposals.filter((p) => p.tab === 'pending').length})
          </TabsTrigger>
          <TabsTrigger value="interviewing">
            Interviewing (
            {proposals.filter((p) => p.tab === 'interviewing').length})
          </TabsTrigger>
          <TabsTrigger value="draft">
            Drafts ({proposals.filter((p) => p.tab === 'draft').length})
          </TabsTrigger>
          <TabsTrigger value="accepted">
            Accepted ({proposals.filter((p) => p.tab === 'accepted').length})
          </TabsTrigger>
          <TabsTrigger value="declined">
            Declined ({proposals.filter((p) => p.tab === 'declined').length})
          </TabsTrigger>
        </TabsList>
        <div className="mt-6 space-y-6">
          {filteredProposals.length > 0 ? (
            filteredProposals.map((proposal, index) => (
              <ProposalCard key={index} proposal={proposal} />
            ))
          ) : (
            <Card className="text-center py-12">
              <CardContent>
                <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">
                  No proposals in this category yet
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  When you have {activeTab} proposals, they will appear here.
                </p>
                <Button className="mt-6" asChild>
                  <Link href="/dashboard/freelancer/jobs">Browse Jobs</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </Tabs>
    </div>
  );
}
