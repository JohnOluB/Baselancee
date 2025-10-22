
import { JobFilters } from '@/components/dashboard/jobs/job-filters';
import { JobCard, type Job } from '@/components/dashboard/jobs/job-card';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

const jobs: Job[] = [
  {
    isVerified: true,
    isHot: true,
    isFeatured: false,
    title: 'Build a React Dashboard for Analytics Platform',
    postedBy: 'TechCorp Inc.',
    postedAt: '3 hours ago',
    description: "We're looking for an experienced React developer to build a performant and beautiful analytics dashboard. You will work with our team of designers and backend engineers to bring our vision to life.",
    budget: { from: 800, to: 1200, currency: 'USD' },
    budgetType: 'Fixed Price',
    duration: '2-3 weeks',
    location: 'Remote',
    experienceLevel: 'Expert',
    skills: ['React', 'TypeScript', 'Chart.js', 'API'],
    client: {
      name: 'TechCorp Inc.',
      avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026706e',
      rating: 4.9,
      reviewCount: 24,
      jobsPosted: 12,
      spend: 45000,
      isPaymentVerified: true,
      location: 'United States',
    },
    proposals: {
      count: 8,
      averageBid: 950,
    },
  },
  {
    isVerified: true,
    isHot: false,
    isFeatured: true,
    title: 'Senior Blockchain Engineer (DeFi)',
    postedBy: 'Crypto-Innovate',
    postedAt: '1 day ago',
    description: 'Seeking a senior blockchain engineer to lead the development of our new DeFi protocol. Must have deep experience with Solidity, smart contracts, and EVM-based chains.',
    budget: { from: 120, to: 180, currency: 'USD', per: 'hr' },
    budgetType: 'Hourly',
    duration: '3+ months',
    location: 'Remote',
    experienceLevel: 'Expert',
    skills: ['Solidity', 'Hardhat', 'DeFi', 'EVM'],
    client: {
      name: 'Crypto-Innovate',
      avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026707d',
      rating: 5.0,
      reviewCount: 15,
      jobsPosted: 5,
      spend: 120000,
      isPaymentVerified: true,
      location: 'Global',
    },
    proposals: {
      count: 12,
      averageBid: 150,
    },
  },
    {
    isVerified: false,
    isHot: false,
    isFeatured: false,
    title: 'UI/UX Designer for Mobile App',
    postedBy: 'Creative Solutions',
    postedAt: '2 days ago',
    description: 'We need a talented UI/UX designer to create a modern and intuitive interface for our new social networking app. Strong portfolio in mobile design is required.',
    budget: { amount: 3000, currency: 'USD' },
    budgetType: 'Fixed Price',
    duration: '1-2 months',
    location: 'Remote',
    experienceLevel: 'Intermediate',
    skills: ['Figma', 'UI/UX Design', 'Mobile Design', 'Prototyping'],
    client: {
      name: 'Creative Solutions',
      avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026708d',
      rating: 4.7,
      reviewCount: 8,
      jobsPosted: 10,
      spend: 25000,
      isPaymentVerified: true,
      location: 'Canada',
    },
    proposals: {
      count: 25,
      averageBid: 2800,
    },
  },
];


export default function BrowseJobsPage() {
  return (
    <div className="flex flex-col md:flex-row gap-8">
      <aside className="w-full md:w-[300px] lg:w-[320px] shrink-0">
        <div className="sticky top-[76px]">
          <JobFilters />
        </div>
      </aside>

      <main className="flex-1">
        <div className="bg-card border rounded-lg p-4 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
             <div className="flex-1">
                <h2 className="text-lg font-semibold">Showing 48 jobs</h2>
                <div className="flex flex-wrap items-center gap-2 mt-2">
                    <Badge variant="secondary" className="pl-2">React <button className="ml-1 -mr-1 p-0.5 rounded-full hover:bg-muted-foreground/20"><X className="h-3 w-3"/></button></Badge>
                    <Badge variant="secondary" className="pl-2">$500-$5000 <button className="ml-1 -mr-1 p-0.5 rounded-full hover:bg-muted-foreground/20"><X className="h-3 w-3"/></button></Badge>
                    <Badge variant="secondary" className="pl-2">Expert <button className="ml-1 -mr-1 p-0.5 rounded-full hover:bg-muted-foreground/20"><X className="h-3 w-3"/></button></Badge>
                </div>
             </div>
            <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-muted-foreground">Sort by:</span>
                <Select defaultValue="relevant">
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="relevant">Most Relevant</SelectItem>
                        <SelectItem value="newest">Newest</SelectItem>
                        <SelectItem value="budget_high">Highest Budget</SelectItem>
                        <SelectItem value="budget_low">Lowest Budget</SelectItem>
                    </SelectContent>
                </Select>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {jobs.map((job, index) => (
            <JobCard key={index} job={job} />
          ))}
        </div>

        <Pagination className="mt-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">...</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">10</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </main>
    </div>
  );
}
