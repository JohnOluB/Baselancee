
'use client';
import {
  ArrowLeft,
  CheckCircle,
  FileText,
  Shield,
  User,
  Wallet,
} from 'lucide-react';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

const job = {
  id: '1',
  title: 'Build React Dashboard for Analytics Platform',
  budget: '1,000 USDC',
  type: 'Fixed Price',
};

const freelancer = {
  id: 1,
  name: 'John Doe',
  title: 'Full-Stack Developer',
  avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
};

export default function HirePage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" asChild>
          <Link href={`/dashboard/client/jobs/${job.id}/proposals`}>
            <ArrowLeft />
          </Link>
        </Button>
        <div>
          <p className="text-sm text-muted-foreground">
            Back to Proposals
          </p>
          <h1 className="text-2xl font-bold">Offer Contract</h1>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Review and Confirm Offer</CardTitle>
          <CardDescription>
            You are offering a contract to {freelancer.name} for the job "{job.title}".
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-8">
                {/* Job Details */}
                <div className="space-y-4">
                    <h3 className="font-semibold text-lg flex items-center gap-2"><FileText className="h-5 w-5 text-primary"/> Job Details</h3>
                    <div className="p-4 border rounded-lg bg-muted/50">
                        <p className="font-bold text-xl">{job.title}</p>
                        <p className="text-muted-foreground">{job.type}</p>
                        <p className="text-2xl font-bold mt-4">{job.budget}</p>
                    </div>
                </div>
                
                {/* Freelancer Details */}
                <div className="space-y-4">
                    <h3 className="font-semibold text-lg flex items-center gap-2"><User className="h-5 w-5 text-primary"/> Freelancer</h3>
                     <div className="p-4 border rounded-lg bg-muted/50 flex items-center gap-4">
                        <Avatar className="h-16 w-16">
                            <AvatarImage src={freelancer.avatar} />
                            <AvatarFallback>{freelancer.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-bold text-xl">{freelancer.name}</p>
                            <p className="text-muted-foreground">{freelancer.title}</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <Separator />

            {/* Payment Details */}
            <div className="space-y-4">
                 <h3 className="font-semibold text-lg flex items-center gap-2"><Wallet className="h-5 w-5 text-primary"/> Payment</h3>
                 <div className="p-4 border rounded-lg bg-muted/50">
                    <p className="font-bold text-lg">Fund Escrow</p>
                    <p className="text-sm text-muted-foreground mt-1">To start this contract, you need to deposit the agreed amount into a secure escrow account. The funds will be held until you approve the work.</p>

                    <div className="mt-4 grid grid-cols-3 text-center">
                        <div>
                            <p className="text-muted-foreground">Contract Amount</p>
                            <p className="font-bold text-lg">{job.budget}</p>
                        </div>
                        <div>
                            <p className="text-muted-foreground">Platform Fee (2%)</p>
                             <p className="font-bold text-lg">$20</p>
                        </div>
                        <div>
                            <p className="text-muted-foreground">Total Deposit</p>
                             <p className="font-bold text-lg text-primary">$1,020</p>
                        </div>
                    </div>
                 </div>
            </div>
             <div className="flex items-start space-x-2 pt-2">
                <Checkbox id="terms" />
                <div className="grid gap-1.5 leading-none">
                  <Label htmlFor="terms" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    I agree to the BaseLance{' '}
                    <Link href="/terms" className="font-semibold text-primary hover:underline">
                      Terms of Service
                    </Link>
                    , including the Escrow Instructions and User Agreement.
                  </Label>
                </div>
              </div>
        </CardContent>
        <CardFooter className="flex-col items-start gap-4">
             <Button size="lg" className="w-full md:w-auto" asChild>
                <Link href={`/dashboard/client/jobs/${job.id}/contract/confirmation`}>
                    <Shield className="mr-2 h-5 w-5" />
                    Hire {freelancer.name} & Deposit Funds
                </Link>
            </Button>
            <p className="text-xs text-muted-foreground">By clicking this button, you're authorizing BaseLance to charge your payment method and fund the escrow account. The freelancer will be notified and the contract will begin.</p>
        </CardFooter>
      </Card>
    </div>
  );
}
