
'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import {
    ArrowLeft,
    CheckCircle,
    ChevronRight,
    FileWarning,
    ShieldAlert,
    Wallet,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const contract = {
    id: '1',
    title: 'Senior Blockchain Engineer (DeFi)',
    status: 'In Progress',
    client: { name: 'TechVision Solutions' },
    freelancer: { name: 'Alex Johnson' },
    details: {
        startDate: '2024-10-01',
        duration: '3 months',
        value: '14,000 USDC'
    }
};

export default function ManageContractPage() {
    const [cancellationReason, setCancellationReason] = useState("");
    const [confirmText, setConfirmText] = useState("");
    
    return (
        <div className="space-y-6">
            <header>
                 <div className="text-sm text-muted-foreground flex items-center gap-2 mb-2">
                    <Link href="/dashboard/freelancer/active" className="hover:text-primary">Active Jobs</Link>
                    <ChevronRight className="h-4 w-4" />
                    <Link href={`/dashboard/freelancer/contracts/${contract.id}`} className="hover:text-primary truncate max-w-[200px] md:max-w-none">{contract.title}</Link>
                    <ChevronRight className="h-4 w-4" />
                    <span className="font-medium text-foreground">Manage</span>
                </div>
                 <h2 className="text-3xl font-bold text-charcoal">Manage Contract</h2>
            </header>

            <Card>
                <CardHeader>
                    <CardTitle>{contract.title}</CardTitle>
                    <CardDescription>
                        Between {contract.client.name} (Client) and {contract.freelancer.name} (Freelancer)
                    </CardDescription>
                </CardHeader>
            </Card>

            <Tabs defaultValue="modify">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="modify">Modify</TabsTrigger>
                    <TabsTrigger value="pause">Pause/Resume</TabsTrigger>
                    <TabsTrigger value="dispute">Dispute</TabsTrigger>
                    <TabsTrigger value="cancel">Cancel</TabsTrigger>
                </TabsList>
                <TabsContent value="modify">
                    <Card>
                        <CardHeader><CardTitle>Modify Contract</CardTitle><CardDescription>Request changes to the contract terms. Both parties must agree.</CardDescription></CardHeader>
                        <CardContent className="space-y-6">
                             <div>
                                <Label htmlFor="deadline">Extend Deadline</Label>
                                <Input type="date" id="deadline" />
                                <Textarea placeholder="Reason for extension..." className="mt-2"/>
                                <Button className="mt-2">Request Extension</Button>
                            </div>
                            <Separator />
                             <div>
                                <Label htmlFor="budget">Adjust Budget</Label>
                                <Input type="number" id="budget" placeholder="New budget in USDC"/>
                                <Textarea placeholder="Reason for budget adjustment..." className="mt-2"/>
                                <Button className="mt-2">Request Budget Change</Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="pause">
                     <Card>
                        <CardHeader><CardTitle>Pause or Resume Contract</CardTitle></CardHeader>
                        <CardContent className="space-y-6">
                            <RadioGroup defaultValue="temporary">
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="temporary" id="temporary" />
                                    <Label htmlFor="temporary">Temporary Pause</Label>
                                </div>
                                 <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="indefinite" id="indefinite" />
                                    <Label htmlFor="indefinite">Indefinite Pause</Label>
                                </div>
                            </RadioGroup>
                            <Textarea placeholder="Reason for pausing..." />
                            <Alert variant="destructive" className="bg-warning-orange/10 border-warning-orange/50 text-warning-orange">
                                <ShieldAlert className="h-4 w-4 !text-warning-orange" />
                                <AlertTitle>Heads up!</AlertTitle>
                                <AlertDescription>
                                    Pausing this contract will extend deadlines and notify the other party.
                                </AlertDescription>
                            </Alert>
                             <div className="flex gap-4">
                                <Button className="bg-warning-orange hover:bg-warning-orange/90">Pause Contract</Button>
                                <Button variant="secondary" className="bg-success-green hover:bg-success-green/90">Resume Contract</Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="dispute">
                     <Card>
                        <CardHeader><CardTitle>File a Dispute</CardTitle><CardDescription>If you have an issue that you cannot resolve with the other party.</CardDescription></CardHeader>
                        <CardContent className="space-y-6">
                             <Textarea placeholder="Describe the issue in detail..." rows={5}/>
                             <div>
                                <Label htmlFor="evidence">Attach Evidence</Label>
                                <Input type="file" id="evidence" multiple/>
                             </div>
                             <Button variant="destructive">Submit Dispute</Button>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="cancel">
                     <Card>
                        <CardHeader><CardTitle>Cancel Contract</CardTitle></CardHeader>
                        <CardContent className="space-y-6">
                             <RadioGroup defaultValue="mutual">
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="mutual" id="mutual" />
                                    <Label htmlFor="mutual">Mutual Agreement Cancellation</Label>
                                </div>
                                 <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="cause" id="cause" />
                                    <Label htmlFor="cause">Cancellation with Cause</Label>
                                </div>
                            </RadioGroup>
                             <Textarea placeholder="Reason for cancellation (visible to other party)..." value={cancellationReason} onChange={(e) => setCancellationReason(e.target.value)} />
                             <Alert variant="destructive">
                                <ShieldAlert className="h-4 w-4"/>
                                <AlertTitle>Warning!</AlertTitle>
                                <AlertDescription>
                                This action cannot be undone and may affect your account rating. Both parties must agree to the terms.
                                </AlertDescription>
                            </Alert>
                             <div>
                                <Label>To confirm, please type "CANCEL" below.</Label>
                                <Input value={confirmText} onChange={(e) => setConfirmText(e.target.value)} />
                             </div>
                             <Button variant="destructive" disabled={confirmText !== 'CANCEL' || !cancellationReason}>Request Cancellation</Button>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
