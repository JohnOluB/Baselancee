
'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, ShieldCheck } from "lucide-react";
import Link from "next/link";

const job = {
  id: '1',
  title: 'Build React Dashboard for Analytics Platform',
  budget: '1,000 USDC',
};

const freelancer = {
  name: 'John Doe',
};


export default function ContractConfirmationPage() {
    return (
        <div className="max-w-2xl mx-auto flex items-center justify-center min-h-[60vh]">
            <Card className="w-full text-center">
                <CardHeader>
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mb-4">
                        <ShieldCheck className="h-10 w-10 text-green-600" />
                    </div>
                    <CardTitle className="text-3xl">Contract Created & Funded!</CardTitle>
                    <CardDescription className="text-base">
                        You have successfully hired {freelancer.name} for the job "{job.title}".
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="p-4 bg-muted/50 rounded-lg">
                        <p className="text-muted-foreground">Total amount funded to escrow:</p>
                        <p className="text-2xl font-bold text-primary">$1,020 USDC</p>
                    </div>
                    <p className="text-muted-foreground text-sm">
                        The funds are securely held in escrow and will only be released to the freelancer after you approve the submitted work. {freelancer.name} has been notified and can now begin working on the project.
                    </p>
                    <div className="flex justify-center gap-4 pt-4">
                        <Button asChild>
                            <Link href="/dashboard/client/contracts">
                                View Contract
                            </Link>
                        </Button>
                         <Button variant="outline" asChild>
                            <Link href="/dashboard/client/messages">
                                Message Freelancer
                            </Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
