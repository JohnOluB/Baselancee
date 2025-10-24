
'use client';
import {
  ArrowLeft,
  Briefcase,
  Calendar,
  CheckCircle,
  Clock,
  Copy,
  Download,
  FileText,
  Heart,
  Linkedin,
  MapPin,
  MessageSquare,
  Shield,
  Star,
  Twitter,
  User,
  Zap,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { JobCard } from '@/components/dashboard/jobs/job-card';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { useState } from 'react';
import { analyzeJobDescription, AnalyzeJobDescriptionOutput } from '@/ai/flows/job-description-analyzer';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const job = {
  isVerified: true,
  isHot: true,
  isFeatured: false,
  title: 'Build a React Dashboard for Analytics Platform',
  postedBy: 'TechCorp Inc.',
  postedAt: '3 hours ago',
  description:
    "We're looking for an experienced React developer to build a performant and beautiful analytics dashboard. You will work with our team of designers and backend engineers to bring our vision to life. The ideal candidate has a strong background in data visualization and is comfortable working with REST APIs.<br/><br/><strong>Responsibilities:</strong><ul><li>Develop and maintain the frontend of our analytics platform.</li><li>Collaborate with UI/UX designers to implement modern design trends.</li><li>Integrate with backend services and APIs.</li><li>Write clean, maintainable, and well-tested code.</li><li>Optimize application for maximum speed and scalability.</li></ul>",
  scope: {
    deliverables: [
      'A fully functional analytics dashboard with multiple chart types.',
      'A set of reusable React components for data visualization.',
      'Integration with our existing user authentication system.',
    ],
    milestones: [
      'Week 1: Project setup and initial component library.',
      'Week 2: Dashboard layout and API integration.',
      'Week 3: Chart implementation and final polish.',
    ],
  },
  budget: { from: 800, to: 1200, currency: 'USDC' },
  budgetType: 'Fixed Price',
  duration: '2-3 weeks',
  location: 'Remote',
  experienceLevel: 'Expert',
  skills: ['React', 'TypeScript', 'Chart.js', 'API', 'Data Visualization', 'Next.js'],
  attachments: [
    {
      name: 'requirements.pdf',
      size: '2.4 MB',
      type: 'PDF',
    },
    {
      name: 'design_mockups.zip',
      size: '15.8 MB',
      type: 'ZIP',
    }
  ],
  client: {
    name: 'TechCorp Inc.',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026706e',
    rating: 4.9,
    reviewCount: 24,
    jobsPosted: 12,
    spend: 45320,
    isPaymentVerified: true,
    location: 'United States',
    memberSince: 'Jan 2024',
  },
  proposals: {
    count: 8,
    averageBid: 950,
  },
};

const similarJobs = [
    { isVerified: true, isHot: false, isFeatured: false, title: 'Frontend Developer for SaaS', postedBy: 'Innovate LLC', postedAt: '5 hours ago', description: 'Looking for a skilled frontend dev...', budget: { from: 70, to: 90, currency: 'USD', per: 'hr' }, budgetType: 'Hourly', duration: '1-2 months', location: 'Remote', experienceLevel: 'Intermediate', skills: ['React', 'Tailwind CSS'], client: { name: 'Innovate LLC', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026709f', rating: 4.8, reviewCount: 10, jobsPosted: 5, spend: 25000, isPaymentVerified: true, location: 'Canada', }, proposals: { count: 5 } },
    { isVerified: true, isHot: true, isFeatured: false, title: 'Next.js Developer for E-commerce Site', postedBy: 'ShopFast', postedAt: '1 day ago', description: 'We need a Next.js expert to optimize our e-commerce platform.', budget: { amount: 2500, currency: 'USD' }, budgetType: 'Fixed Price', duration: '1 month', location: 'Remote', experienceLevel: 'Expert', skills: ['Next.js', 'Vercel', 'Stripe'], client: { name: 'ShopFast', avatar: 'https://i.pravatar.cc/150?u=a042581f4e2902670ac', rating: 4.9, reviewCount: 32, jobsPosted: 15, spend: 80000, isPaymentVerified: true, location: 'United Kingdom', }, proposals: { count: 15 } },
    { isVerified: false, isHot: false, isFeatured: true, title: 'UI Designer for Crypto Wallet', postedBy: 'CoinVerse', postedAt: '2 days ago', description: 'Design a beautiful and intuitive UI for our new crypto wallet.', budget: { from: 40, to: 60, currency: 'USD', per: 'hr' }, budgetType: 'Hourly', duration: '3+ months', location: 'Remote', experienceLevel: 'Intermediate', skills: ['Figma', 'UI/UX Design', 'Crypto'], client: { name: 'CoinVerse', avatar: 'https://i.pravatar.cc/150?u=a042581f4e2902670df', rating: 4.7, reviewCount: 5, jobsPosted: 5, spend: 15000, isPaymentVerified: false, location: 'Global', }, proposals: { count: 18 } },
]

function AIAnalysisResults({ results }: { results: AnalyzeJobDescriptionOutput }) {
    return (
        <div className="space-y-6">
            <Alert>
                <Terminal className="h-4 w-4" />
                <AlertTitle>AI Analysis Complete</AlertTitle>
                <AlertDescription>
                    Here are the key insights from the job description to help you craft a winning proposal.
                </AlertDescription>
            </Alert>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">Suitability Score</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center justify-center">
                        <div className="relative h-24 w-24">
                            <svg className="h-full w-full" width="36" height="36" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-muted" strokeWidth="2"></circle>
                                <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-primary" strokeWidth="2" strokeDasharray={`${results.suitabilityScore}, 100`} strokeLinecap="round" transform="rotate(-90 18 18)"></circle>
                            </svg>
                             <span className="absolute text-2xl font-bold top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">{results.suitabilityScore}</span>
                        </div>
                        <p className="text-center text-sm text-muted-foreground mt-2">How well this job matches your profile.</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className="text-base">Time Commitment</CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-center justify-center h-full">
                        <p className="text-2xl font-bold text-center">{results.estimatedTimeCommitment}</p>
                    </CardContent>
                </Card>
            </div>
             <Card>
                <CardHeader>
                    <CardTitle className="text-base">Required Skills</CardTitle>
                </CardHeader>
                <CardContent>
                     <div className="flex flex-wrap gap-2">
                        {results.requiredSkills.map(skill => <Badge key={skill} variant="secondary" className="text-base py-1 px-3">{skill}</Badge>)}
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="text-base">Suggested Rate</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-3xl font-bold">{results.suggestedRate}</p>
                    <p className="text-sm text-muted-foreground mt-1">Based on the skills required and market rates.</p>
                </CardContent>
            </Card>
        </div>
    )
}

function AIJobAnalyzer() {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [analysis, setAnalysis] = useState<AnalyzeJobDescriptionOutput | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleAnalyze = async () => {
        setIsOpen(true);
        setIsLoading(true);
        setError(null);
        setAnalysis(null);
        try {
            const result = await analyzeJobDescription({ jobDescription: job.description });
            setAnalysis(result);
        } catch(e) {
            setError("Sorry, the AI analyzer failed to process this job description. Please try again later.");
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>AI Job Analyzer</CardTitle>
                    <CardDescription>Get insights on this job to craft the perfect proposal.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button className="w-full" variant="outline" onClick={handleAnalyze} disabled={isLoading}>
                        {isLoading ? (
                            <>
                                <Zap className="mr-2 h-4 w-4 animate-spin" />
                                <span>Analyzing...</span>
                            </>
                        ) : (
                             <>
                                <Zap className="mr-2 h-4 w-4" />
                                <span>Analyze with AI</span>
                            </>
                        )}
                    </Button>
                </CardContent>
            </Card>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>AI Job Analysis</DialogTitle>
                        <DialogDescription>
                            Here are some AI-powered insights to help you write a stronger proposal.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-6 max-h-[70vh] overflow-y-auto pr-4">
                        {isLoading && (
                            <div className="space-y-4 text-center">
                                <div className="flex justify-center">
                                    <Zap className="h-8 w-8 animate-pulse text-primary" />
                                </div>
                                <p className="font-medium">Analyzing job description...</p>
                                <p className="text-sm text-muted-foreground">This may take a few moments. The AI is identifying key skills, estimating the project scope, and suggesting a competitive rate.</p>
                                <Progress value={50} className="w-full animate-pulse" />
                            </div>
                        )}
                        {error && <p className="text-red-500">{error}</p>}
                        {analysis && <AIAnalysisResults results={analysis} />}
                    </div>
                     <DialogFooter>
                        <Button onClick={() => setIsOpen(false)}>Close</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}

const proposalSchema = z.object({
  coverLetter: z.string().min(100, "Cover letter must be at least 100 characters."),
  bidAmount: z.number().positive("Bid amount must be a positive number."),
  deliveryNumber: z.number().positive("Delivery time is required."),
  deliveryUnit: z.string().min(1, "Delivery unit is required."),
});

type ProposalFormValues = z.infer<typeof proposalSchema>;

function ApplicationSidebar() {
    const { register, handleSubmit, watch, formState: { errors, isValid } } = useForm<ProposalFormValues>({
        resolver: zodResolver(proposalSchema),
        mode: 'onChange',
        defaultValues: {
          deliveryUnit: 'Days'
        }
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isProposalDialogOpen, setIsProposalDialogOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);

    const bid = watch('bidAmount');

    const handleProposalSubmit: SubmitHandler<ProposalFormValues> = async (data) => {
        setIsSubmitting(true);
        console.log("Submitting data:", data);
        await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
        setIsSubmitting(false);
        setIsProposalDialogOpen(false); // Close proposal dialog
        setIsSubmitted(true); // Open success dialog
    }
    
    const handleEditClick = () => {
        setIsEditMode(true);
        setIsProposalDialogOpen(true);
    }

    const fee = 0.02; // 2%
    const clientBudget = 'from' in job.budget ? `$${job.budget.from} - $${job.budget.to}` : `$${job.budget.amount}`;

    const bidAmountNumber = bid || 0;
    let platformFee = 0;
    let earnings = 0;

    if (!isNaN(bidAmountNumber) && bidAmountNumber > 0) {
        platformFee = bidAmountNumber * fee;
        earnings = bidAmountNumber - platformFee;
    }

    return (
        <div className="space-y-6">
            <Dialog open={isProposalDialogOpen} onOpenChange={setIsProposalDialogOpen}>
                <DialogTrigger asChild>
                    <Button size="lg" className="w-full">Submit Proposal</Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl">
                    <form onSubmit={handleSubmit(handleProposalSubmit)}>
                        <DialogHeader>
                            <DialogTitle>{isEditMode ? 'Edit Your Proposal' : 'Submit Your Proposal'}</DialogTitle>
                            <DialogDescription>
                                For: {job.title}
                            </DialogDescription>
                        </DialogHeader>
                        <div className="py-6 max-h-[70vh] overflow-y-auto pr-4 space-y-6">
                            <div>
                                <Label htmlFor="cover-letter" className="font-semibold">Cover Letter *</Label>
                                <Textarea 
                                    id="cover-letter" 
                                    rows={6} 
                                    className="mt-2" 
                                    placeholder="Explain why you're the best fit for this job. Highlight relevant experience and how you'll approach the project..." 
                                    {...register('coverLetter')}
                                />
                                {errors.coverLetter && <p className="text-sm text-destructive mt-1">{errors.coverLetter.message}</p>}
                                <p className="text-xs text-muted-foreground mt-2 text-right">0/5000</p>
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="bid-amount" className="font-semibold">Your Bid Amount *</Label>
                                    <div className="relative">
                                        <Input 
                                            id="bid-amount" 
                                            type="number" 
                                            className="px-8 placeholder:pl-0 focus:placeholder-transparent"
                                            placeholder="Enter your bid..."
                                            {...register('bidAmount', { valueAsNumber: true })}
                                            disabled={isEditMode}
                                        />
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">USDC</span>
                                    </div>
                                    {errors.bidAmount && <p className="text-sm text-destructive mt-1">{errors.bidAmount.message}</p>}
                                    <p className="text-xs text-muted-foreground">Client's budget: {clientBudget}</p>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="delivery-timeline" className="font-semibold">When can you deliver? *</Label>
                                    <div className="flex gap-2">
                                        <Input 
                                            id="delivery-timeline" 
                                            type="number" 
                                            placeholder="14" 
                                            className="w-1/2" 
                                            {...register('deliveryNumber', { valueAsNumber: true })}
                                            disabled={isEditMode}
                                        />
                                        <Input 
                                            defaultValue="Days" 
                                            className="w-1/2" 
                                            {...register('deliveryUnit')}
                                            disabled={isEditMode}
                                        />
                                    </div>
                                    {(errors.deliveryNumber || errors.deliveryUnit) && <p className="text-sm text-destructive mt-1">Delivery timeline is required.</p>}
                                    <p className="text-xs text-muted-foreground">Client expects: {job.duration}</p>
                                </div>
                            </div>
                            <div className="p-4 rounded-md border bg-muted/50 text-sm space-y-2">
                                <div className="flex justify-between">
                                    <span>Your Bid:</span>
                                    <span>{isNaN(bidAmountNumber) || bidAmountNumber <= 0 ? '0.00' : bidAmountNumber.toFixed(2)} USDC</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Platform Fee (2%):</span>
                                    <span>-{platformFee.toFixed(2)} USDC</span>
                                </div>
                                <Separator className="my-2"/>
                                <div className="flex justify-between font-semibold">
                                    <span>You'll Receive:</span>
                                    <span>{earnings.toFixed(2)} USDC</span>
                                </div>
                            </div>
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                               <Button variant="ghost">Cancel</Button>
                            </DialogClose>
                            <Button type="submit" disabled={isSubmitting || !isValid}>
                                {isSubmitting ? 'Submitting...' : isEditMode ? 'Save Changes' : 'Submit Proposal'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

             <Dialog open={isSubmitted} onOpenChange={setIsSubmitted}>
                <DialogContent>
                    <DialogHeader className="items-center text-center">
                         <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 mb-4">
                            <CheckCircle className="h-6 w-6 text-green-600" />
                        </div>
                        <DialogTitle className="text-2xl">Proposal Submitted Successfully!</DialogTitle>
                        <DialogDescription>
                           Your proposal for "{job.title}" has been sent to {job.client.name}.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-4 text-center text-sm text-muted-foreground">
                        <p>You will be notified when the client views your proposal or sends a message.</p>
                        <p className="font-semibold mt-2">Estimated response time: 24-48 hours</p>
                    </div>
                    <DialogFooter className="sm:justify-center flex-col-reverse sm:flex-row gap-2">
                        <Button variant="outline" asChild>
                            <Link href="/dashboard/freelancer/jobs">Browse More Jobs</Link>
                        </Button>
                        <Button asChild>
                             <Link href="/dashboard/freelancer/proposals">View My Proposals</Link>
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <p className="text-xs text-muted-foreground text-center">{job.proposals.count} other freelancers have applied</p>
            <Button asChild variant="link" size="sm" className="w-full text-destructive hover:text-destructive">
                <Link href="/dashboard/freelancer/jobs">Withdraw Application</Link>
            </Button>

            <Card>
                <CardHeader>
                    <CardTitle className="text-base">Budget Breakdown</CardTitle>
                </CardHeader>
                 <CardContent className="text-sm">
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Client's Budget:</span>
                        <span>{clientBudget}</span>
                    </div>
                    <div className="flex justify-between mt-2">
                         <span className="text-muted-foreground">Platform Fee (2%):</span>
                        <span>-${'from' in job.budget ? `${(job.budget.from * 0.02).toFixed(2)}-${(job.budget.to * 0.02).toFixed(2)}` : `${(job.budget.amount * 0.02).toFixed(2)}`}</span>
                    </div>
                     <Separator className="my-2"/>
                     <div className="flex justify-between font-semibold">
                        <span>You'll Receive:</span>
                        <span>${'from' in job.budget ? `${(job.budget.from * 0.98).toFixed(2)}-${(job.budget.to * 0.98).toFixed(2)}` : `${(job.budget.amount * 0.98).toFixed(2)}`}</span>
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-orange-500/10 border-orange-500/20">
                <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2 text-orange-600">
                        <Shield /> Stay Safe
                    </CardTitle>
                </CardHeader>
                <CardContent>
                     <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1" className="border-b-0">
                            <AccordionTrigger className="text-sm py-0">View Safety Tips</AccordionTrigger>
                            <AccordionContent className="pt-4 text-sm space-y-2 text-muted-foreground">
                                <p className="flex items-start gap-2"><CheckCircle className="h-4 w-4 mt-0.5 text-green-500 shrink-0"/> Keep all communication on BaseLance</p>
                                <p className="flex items-start gap-2"><CheckCircle className="h-4 w-4 mt-0.5 text-green-500 shrink-0"/> Use escrow for all payments</p>
                                <p className="flex items-start gap-2"><CheckCircle className="h-4 w-4 mt-0.5 text-green-500 shrink-0"/> Don't share personal contact info</p>
                                <p className="flex items-start gap-2"><CheckCircle className="h-4 w-4 mt-0.5 text-green-500 shrink-0"/> Report suspicious behavior</p>
                                <Button variant="link" size="sm" className="p-0 h-auto">Learn more about safety</Button>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </CardContent>
            </Card>

            <div>
                <p className="text-sm text-center text-muted-foreground">Share this job</p>
                <div className="flex justify-center gap-2 mt-2">
                    <Button variant="outline" size="icon"><Twitter className="h-4 w-4"/></Button>
                    <Button variant="outline" size="icon"><Linkedin className="h-4 w-4"/></Button>
                    <Button variant="outline" size="icon"><Copy className="h-4 w-4"/></Button>
                </div>
            </div>

            <Button variant="link" size="sm" className="w-full text-muted-foreground hover:text-destructive">🚩 Report this job</Button>
        </div>
    )
}

export default function JobDetailsPage() {
  return (
    <div className="space-y-6">
       <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" asChild>
                <Link href="/dashboard/freelancer/jobs"><ArrowLeft /></Link>
            </Button>
            <div className="text-sm text-muted-foreground">
                <Link href="/dashboard/freelancer/jobs" className="hover:text-primary">Browse Jobs</Link>
                <span className="mx-2">/</span>
                <span>Job Details</span>
            </div>
       </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-8 items-start">
        <div className="lg:col-span-2 xl:col-span-3 space-y-8">
            <Card>
                <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                        <Avatar className="w-12 h-12 border">
                            <AvatarImage src={job.client.avatar} alt={job.client.name} />
                            <AvatarFallback>{job.client.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <div className="flex items-center gap-2">
                                <h3 className="text-lg font-semibold">{job.client.name}</h3>
                                {job.client.isPaymentVerified && <Badge variant="outline" className="text-green-600 border-green-600/50"><CheckCircle className="h-3 w-3 mr-1"/> Verified</Badge>}
                            </div>
                            <p className="text-sm text-muted-foreground">Posted {job.postedAt}</p>
                        </div>
                    </div>

                    <h1 className="text-3xl font-bold mt-4">{job.title}</h1>

                    <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm border rounded-lg p-4">
                         <div className="flex items-start gap-2">
                            <Briefcase className="h-5 w-5 text-muted-foreground mt-0.5" />
                            <div>
                                <p className="font-semibold">${job.budget.from} - ${job.budget.to}</p>
                                <p className="text-muted-foreground">{job.budgetType}</p>
                            </div>
                        </div>
                         <div className="flex items-start gap-2">
                            <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                            <div>
                                <p className="font-semibold">{job.duration}</p>
                                <p className="text-muted-foreground">Duration</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-2">
                            <Zap className="h-5 w-5 text-muted-foreground mt-0.5" />
                            <div>
                                <p className="font-semibold">{job.experienceLevel}</p>
                                <p className="text-muted-foreground">Experience</p>
                            </div>
                        </div>
                         <div className="flex items-start gap-2">
                            <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                            <div>
                                <p className="font-semibold">{job.location}</p>
                                <p className="text-muted-foreground">Location</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>About the Job</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground" dangerouslySetInnerHTML={{ __html: job.description }} />
                </CardContent>
            </Card>

            <Card>
                 <CardHeader>
                    <CardTitle>Scope of Work</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <h4 className="font-semibold mb-2">Deliverables</h4>
                        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                            {job.scope.deliverables.map((item, i) => <li key={i}>{item}</li>)}
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-2">Milestones</h4>
                        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                            {job.scope.milestones.map((item, i) => <li key={i}>{item}</li>)}
                        </ul>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Skills & Expertise</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap gap-2">
                        {job.skills.map(skill => <Badge key={skill} variant="secondary" className="text-base py-1 px-3">{skill}</Badge>)}
                    </div>
                </CardContent>
            </Card>

             <Card>
                <CardHeader>
                    <CardTitle>Attachments</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {job.attachments.map(file => (
                        <div key={file.name} className="border rounded-lg p-3 flex items-center gap-3">
                            <FileText className="h-8 w-8 text-muted-foreground" />
                            <div className="flex-1">
                                <p className="font-medium text-sm truncate">{file.name}</p>
                                <p className="text-xs text-muted-foreground">{file.size} &bull; {file.type}</p>
                            </div>
                            <Button variant="ghost" size="icon"><Download className="h-4 w-4"/></Button>
                        </div>
                    ))}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>About the Client</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-start gap-4">
                         <Avatar className="w-16 h-16 border">
                            <AvatarImage src={job.client.avatar} alt={job.client.name} />
                            <AvatarFallback>{job.client.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                             <h3 className="text-lg font-semibold">{job.client.name}</h3>
                            <p className="text-sm text-muted-foreground">Member since {job.client.memberSince}</p>
                            {job.client.isPaymentVerified && <div className="mt-2 flex items-center gap-1 text-sm text-green-600"><CheckCircle className="h-4 w-4"/><span>Payment method verified</span></div>}
                             <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-4 text-sm">
                                <div className="flex items-center gap-2">
                                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                                    <div>
                                        <span className="font-bold">{job.client.rating.toFixed(1)} out of 5</span>
                                        <span className="text-muted-foreground"> ({job.client.reviewCount} reviews)</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Briefcase className="h-4 w-4" />
                                    <span>{job.client.jobsPosted} jobs posted</span>
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <MapPin className="h-4 w-4" />
                                    <span>{job.client.location}</span>
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <MessageSquare className="h-4 w-4" />
                                    <span>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', notation: 'compact' }).format(job.client.spend)} total spent</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>

        <aside className="lg:col-span-1 xl:col-span-1">
          <div className="sticky top-[76px] space-y-6">
            <ApplicationSidebar />
            <AIJobAnalyzer />
          </div>
        </aside>
      </div>

        <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4">Similar Jobs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(similarJobs as any[]).map((job, index) => (
                    <JobCard key={index} job={job} />
                ))}
            </div>
        </div>
    </div>
  );
}

    

    

    



    