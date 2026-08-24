
'use client';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
    ArrowLeft,
    CheckCircle,
    ChevronRight,
    Clock,
    Download,
    FileText,
    Frown,
    MessageSquare,
    MoreVertical,
    Paperclip,
    ShieldCheck,
    Star,
    Wallet,
} from "lucide-react";
import Link from "next/link";


const contract = {
    id: '1',
    title: 'Senior Blockchain Engineer (DeFi)',
    status: 'In Progress',
    progress: 75,
    client: {
        name: 'TechVision Solutions',
        avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026709d',
        rating: 4.9,
    },
    freelancer: {
        name: 'Alex Johnson',
        avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026706e',
        rating: 4.8,
    },
    details: {
        type: 'Hourly',
        startDate: '2024-10-01',
        endDate: '2024-12-31',
        budget: '$120 - $180 / hr',
        totalBilled: '8,640',
        hoursLogged: 48,
    },
    milestones: [
        { name: 'Smart Contract Architecture', status: 'Paid', amount: 2000, date: '2024-10-15' },
        { name: 'Protocol V1 Implementation', status: 'In Review', amount: 5000, date: '2024-11-05' },
        { name: 'Testnet Deployment & Testing', status: 'Pending', amount: 3000, date: '2024-11-20' },
        { name: 'Mainnet Deployment', status: 'Pending', amount: 4000, date: '2024-12-10' },
    ],
    deliverables: [
        { name: 'Architecture-Diagram.pdf', size: '1.2MB', date: '2024-10-14' },
        { name: 'Protocol-V1-Code.zip', size: '5.8MB', date: '2024-11-04' },
    ],
    activity: [
        { user: 'Alex Johnson', action: 'submitted work for "Protocol V1 Implementation".', time: '2 hours ago', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026706e' },
        { user: 'TechVision Solutions', action: 'released payment for "Smart Contract Architecture".', time: '3 weeks ago', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026709d'},
        { user: 'System', action: 'Contract started.', time: '1 month ago', avatar: '' }
    ],
    paymentSummary: {
        totalValue: 14000,
        paid: 2000,
        inEscrow: 5000,
        pending: 7000,
        platformFee: 280,
    }
};

const getStatusVariant = (status: string): 'default' | 'secondary' | 'outline' | 'destructive' => {
    switch (status) {
        case 'In Progress': return 'default';
        case 'Completed': return 'outline';
        case 'Paused': return 'destructive';
        default: return 'secondary';
    }
}
const getMilestoneStatusBadge = (status: string) => {
    switch(status) {
        case 'Paid': return <Badge className="bg-success-green/10 text-success-green hover:bg-success-green/20"><CheckCircle className="mr-1 h-3 w-3"/>{status}</Badge>
        case 'In Review': return <Badge className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/20"><Clock className="mr-1 h-3 w-3"/>{status}</Badge>
        case 'Pending': return <Badge variant="outline">{status}</Badge>
        default: return <Badge>{status}</Badge>
    }
}


export default function ContractDetailsPage() {
    return (
        <div className="space-y-6">
            <header>
                 <div className="text-sm text-muted-foreground flex items-center gap-2 mb-2">
                    <Link href="/dashboard/freelancer/active" className="hover:text-primary">Active Jobs</Link>
                    <ChevronRight className="h-4 w-4" />
                    <span className="font-medium text-foreground truncate max-w-[200px] md:max-w-none">{contract.title}</span>
                </div>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <h2 className="text-3xl font-bold text-charcoal">{contract.title}</h2>
                    <div className="flex items-center gap-2">
                         <Badge variant={getStatusVariant(contract.status)} className="text-base px-4 py-2">{contract.status}</Badge>
                         <Button variant="outline" asChild>
                             <Link href={`/dashboard/freelancer/contracts/${contract.id}/manage`}>Manage Contract</Link>
                         </Button>
                         <Button asChild>
                            <Link href="/dashboard/freelancer/messages">
                                 <MessageSquare className="mr-2 h-4 w-4"/> Message Client
                            </Link>
                         </Button>
                         <MoreVertical className="h-6 w-6 text-muted-foreground" />
                    </div>
                </div>
            </header>

            <main className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                 <div className="lg:col-span-2 space-y-8">
                    <Card>
                        <CardHeader><CardTitle>Contract Overview</CardTitle></CardHeader>
                        <CardContent>
                             <div className="grid md:grid-cols-2 gap-6 items-center">
                                 {/* Participants */}
                                <div className="space-y-4">
                                     <div className="flex items-center gap-3">
                                        <Avatar className="h-12 w-12"><AvatarImage src={contract.client.avatar} /><AvatarFallback>{contract.client.name.charAt(0)}</AvatarFallback></Avatar>
                                        <div>
                                            <p className="font-semibold">{contract.client.name}</p>
                                            <p className="text-sm text-muted-foreground">Client</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-12 w-12"><AvatarImage src={contract.freelancer.avatar} /><AvatarFallback>{contract.freelancer.name.charAt(0)}</AvatarFallback></Avatar>
                                        <div>
                                            <p className="font-semibold">{contract.freelancer.name}</p>
                                            <p className="text-sm text-muted-foreground">Freelancer</p>
                                        </div>
                                    </div>
                                </div>
                                <Separator orientation="vertical" className="hidden md:block"/>
                                {/* Details */}
                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between"><span>Contract Type:</span> <span className="font-semibold">{contract.details.type}</span></div>
                                    <div className="flex justify-between"><span>Start Date:</span> <span className="font-semibold">{new Date(contract.details.startDate).toLocaleDateString()}</span></div>
                                    <div className="flex justify-between"><span>End Date:</span> <span className="font-semibold">{new Date(contract.details.endDate).toLocaleDateString()}</span></div>
                                    <div className="flex justify-between"><span>Budget:</span> <span className="font-semibold">{contract.details.budget}</span></div>
                                    <div className="flex justify-between"><span>Total Billed:</span> <span className="font-bold text-lg text-primary">{contract.details.totalBilled} USDC</span></div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                     <Card>
                        <CardHeader>
                            <CardTitle>Progress & Milestones</CardTitle>
                            <div className="pt-2">
                                <div className="flex justify-between items-center mb-1">
                                    <p className="text-sm font-medium">Overall Progress</p>
                                    <p className="text-sm font-medium">{contract.progress}%</p>
                                </div>
                                <Progress value={contract.progress} className="h-3" />
                                <p className="text-xs text-muted-foreground mt-1 text-right">Due December 31, 2024</p>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                           {contract.milestones.map((milestone, i) => (
                                <Card key={i} className="p-4">
                                     <div className="grid md:grid-cols-[1fr_auto_auto] gap-4 items-center">
                                        <div className="flex items-center gap-3">
                                            <CheckCircle className="h-6 w-6 text-muted-foreground" />
                                            <div>
                                                <p className="font-semibold">{milestone.name}</p>
                                                <p className="text-sm text-muted-foreground">Due {new Date(milestone.date).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                        <div className="text-center md:text-left">
                                             <p className="font-bold text-lg">{milestone.amount} USDC</p>
                                        </div>
                                        <div className="flex items-center gap-2 justify-end">
                                            {getMilestoneStatusBadge(milestone.status)}
                                            {milestone.status === 'Pending' && <Button>Submit Work</Button>}
                                        </div>
                                     </div>
                                </Card>
                           ))}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader><CardTitle>Deliverables</CardTitle></CardHeader>
                        <CardContent>
                             <div className="space-y-4">
                                {contract.deliverables.map(file => (
                                     <div key={file.name} className="border rounded-lg p-3 flex items-center gap-3">
                                        <FileText className="h-8 w-8 text-muted-foreground" />
                                        <div className="flex-1">
                                            <p className="font-medium text-sm truncate">{file.name}</p>
                                            <p className="text-xs text-muted-foreground">Uploaded on {new Date(file.date).toLocaleDateString()} - {file.size}</p>
                                        </div>
                                        <Button variant="ghost" size="icon"><Download className="h-4 w-4"/></Button>
                                    </div>
                                ))}
                             </div>
                             <div className="mt-6 border-dashed border-2 rounded-lg p-6 text-center">
                                <p className="text-muted-foreground mb-2">Drag & drop files here</p>
                                <Button variant="outline">Upload Files</Button>
                             </div>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardHeader><CardTitle>Activity</CardTitle></CardHeader>
                        <CardContent>
                            <ul className="space-y-4">
                                {contract.activity.map((act, i) => (
                                     <li key={i} className="flex items-start gap-3">
                                        {act.avatar ? (
                                            <Avatar className="h-8 w-8"><AvatarImage src={act.avatar}/><AvatarFallback>{act.user.charAt(0)}</AvatarFallback></Avatar>
                                        ) : (
                                            <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center"><ShieldCheck className="h-4 w-4 text-muted-foreground"/></div>
                                        )}
                                        <div>
                                            <p className="text-sm"><span className="font-semibold">{act.user}</span> {act.action}</p>
                                            <p className="text-xs text-muted-foreground">{act.time}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>

                 </div>
                 <aside className="lg:col-span-1 sticky top-24 space-y-6">
                    <Card>
                        <CardHeader><CardTitle>Payment Summary</CardTitle></CardHeader>
                        <CardContent className="space-y-3">
                            <div className="text-center pb-4">
                                <p className="text-sm text-muted-foreground">Total Contract Value</p>
                                <p className="text-3xl font-bold">{contract.paymentSummary.totalValue.toLocaleString()} USDC</p>
                            </div>
                            <Separator />
                            <div className="text-sm space-y-2 pt-4">
                                 <div className="flex justify-between text-success-green"><span>Amount Paid</span> <span className="font-semibold">{contract.paymentSummary.paid.toLocaleString()} USDC</span></div>
                                 <div className="flex justify-between text-warning-orange"><span>In Escrow</span> <span className="font-semibold">{contract.paymentSummary.inEscrow.toLocaleString()} USDC</span></div>
                                 <div className="flex justify-between text-muted-foreground"><span>Pending</span> <span className="font-semibold">{contract.paymentSummary.pending.toLocaleString()} USDC</span></div>
                            </div>
                            <p className="text-xs text-muted-foreground pt-2">Your Earnings (after 2% fee): ${(contract.paymentSummary.paid * 0.98).toLocaleString()} USDC</p>
                            <Button className="w-full mt-4">Request Payment</Button>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader><CardTitle>Contract Terms</CardTitle></CardHeader>
                        <CardContent>
                             <Accordion type="single" collapsible className="w-full">
                                <AccordionItem value="item-1">
                                    <AccordionTrigger>View Full Contract Terms</AccordionTrigger>
                                    <AccordionContent className="text-sm text-muted-foreground space-y-2">
                                        <p><strong>Payment Schedule:</strong> Payments are released upon milestone approval.</p>
                                        <p><strong>Revisions:</strong> Up to 2 rounds of revisions are included per milestone.</p>
                                        <p><strong>Ownership:</strong> Client owns the final work product upon full payment.</p>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader><CardTitle>Support & Resources</CardTitle></CardHeader>
                        <CardContent className="space-y-2">
                            <Button variant="link" className="p-0 h-auto">How to submit work</Button>
                            <Button variant="link" className="p-0 h-auto">Dispute resolution</Button>
                            <Button variant="outline" className="w-full mt-2">Contact Support</Button>
                        </CardContent>
                    </Card>
                 </aside>
            </main>
        </div>
    )
}
