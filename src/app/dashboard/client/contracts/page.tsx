
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
  Clock,
  Briefcase,
} from 'lucide-react';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

const contracts = [
  {
    id: '1',
    jobTitle: 'Senior Blockchain Engineer (DeFi)',
    status: 'In Progress',
    freelancer: {
      name: 'Alex Johnson',
      avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026706e',
    },
    progress: 75,
    dueDate: 'in 2 weeks',
    budget: '$120 - $180 / hr',
    type: 'Hourly',
    totalBilled: '$8,640',
  },
  {
    id: '2',
    title: 'API Integration for SaaS',
    status: 'In Progress',
    freelancer: {
      name: 'John Doe',
      avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    },
    progress: 30,
    dueDate: 'in 3 weeks',
    budget: '$1500',
    type: 'Fixed-Price',
    totalBilled: '$450',
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
    type: 'Fixed-Price',
    endDate: '2025-09-15',
    totalBilled: '$3000',
  },
  {
    id: '4',
    title: 'Content Writer for Crypto Blog',
    status: 'Paused',
    freelancer: {
        name: 'Emily White',
        avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026707d'
    },
    budget: '$40 - $50 / hr',
    type: 'Hourly',
    totalBilled: '$1,200'
  }
];

const getStatusVariant = (status: string) => {
    switch (status) {
        case 'In Progress': return 'secondary';
        case 'Completed': return 'outline';
        case 'Paused': return 'destructive';
        default: return 'default';
    }
}

const ContractCard = ({ contract }: { contract: any }) => (
    <Card>
        <CardHeader>
            <div className="flex justify-between items-start">
                <div>
                    <CardTitle className="text-lg mb-1">{contract.jobTitle || contract.title}</CardTitle>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Avatar className="h-6 w-6">
                            <AvatarImage src={contract.freelancer.avatar} />
                            <AvatarFallback>{contract.freelancer.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span>{contract.freelancer.name}</span>
                    </div>
                </div>
                <Badge variant={getStatusVariant(contract.status)}>{contract.status}</Badge>
            </div>
        </CardHeader>
        <CardContent>
             {contract.status === 'In Progress' && (
                <div>
                    <div className="flex justify-between items-center mb-1">
                        <p className="text-sm font-medium">Progress</p>
                        <p className="text-sm font-medium">{contract.progress}%</p>
                    </div>
                    <Progress value={contract.progress} />
                    <p className="text-xs text-muted-foreground mt-1 text-right">Due {contract.dueDate}</p>
                </div>
            )}
            {contract.status === 'Completed' && (
                 <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span>Amount Paid:</span> <span className="font-semibold">{contract.paid}</span></div>
                    <div className="flex justify-between"><span>Ended:</span> <span className="text-muted-foreground">{new Date(contract.endDate).toLocaleDateString()}</span></div>
                    <div className="flex justify-between"><span>Your Rating:</span> <span className="font-semibold flex items-center gap-1">{contract.rating} ★</span></div>
                </div>
            )}
             {contract.status === 'Paused' && (
                 <div className="space-y-2 text-sm">
                    <p className="text-muted-foreground">This contract is currently paused.</p>
                 </div>
            )}

            <Separator className="my-4" />

            <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                    <p className="text-muted-foreground">Budget</p>
                    <p className="font-semibold">{contract.budget}</p>
                </div>
                <div>
                    <p className="text-muted-foreground">Contract Type</p>
                    <p className="font-semibold">{contract.type}</p>
                </div>
                 <div>
                    <p className="text-muted-foreground">Total Billed</p>
                    <p className="font-semibold">{contract.totalBilled}</p>
                </div>
            </div>

            <div className="border-t mt-4 pt-4 flex items-center justify-end gap-2">
                 {contract.status === 'In Progress' && <Button variant="outline">Manage Contract</Button>}
                 {contract.status === 'Completed' && <Button variant="outline">Leave Review</Button>}
                 {contract.status === 'Paused' && <Button>Resume Contract</Button>}
                 <Button asChild><Link href="#">View Details</Link></Button>
            </div>
        </CardContent>
    </Card>
)

export default function ClientContractsPage() {
  const [activeTab, setActiveTab] = useState('in-progress');

  const filteredContracts = contracts.filter(contract => {
    if (activeTab === 'in-progress') return contract.status === 'In Progress';
    if (activeTab === 'completed') return contract.status === 'Completed';
    if (activeTab === 'paused') return contract.status === 'Paused';
    return true;
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">My Contracts</h1>
          <p className="text-muted-foreground mt-1">Manage your active, completed, and paused contracts.</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="paused">Paused</TabsTrigger>
        </TabsList>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredContracts.length > 0 ? (
                filteredContracts.map((contract) => <ContractCard key={contract.id} contract={contract} />)
            ) : (
                <Card className="text-center py-12 col-span-full">
                    <CardContent>
                        <Briefcase className="mx-auto h-12 w-12 text-muted-foreground" />
                        <h3 className="mt-4 text-lg font-medium">No contracts in this category yet</h3>
                        <p className="mt-2 text-sm text-muted-foreground">When you have {activeTab} contracts, they will appear here.</p>
                    </CardContent>
                </Card>
            )}
        </div>
      </Tabs>
    </div>
  );
}
