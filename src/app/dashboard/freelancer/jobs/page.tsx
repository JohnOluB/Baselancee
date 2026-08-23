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
import { supabase } from '@/lib/supabase';

async function getJobs(): Promise<Job[]> {
  const { data, error } = await supabase
    .from('jobs')
    .select(`
      *,
      profiles:client_wallet (
        full_name,
        avatar_url,
        location
      )
    `)
    .eq('is_active', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching jobs:', error);
    return [];
  }

  return data.map((job: any) => ({
    isVerified: true,
    isHot: false,
    isFeatured: false,
    title: job.title,
    postedBy: job.profiles?.full_name || 'Anonymous',
    postedAt: new Date(job.created_at).toLocaleDateString(),
    description: job.description,
    budget: job.budget_type === 'fixed'
      ? { amount: job.budget_max, currency: 'USDC' }
      : { from: job.budget_min, to: job.budget_max, currency: 'USDC' },
    budgetType: job.budget_type === 'fixed' ? 'Fixed Price' : 'Hourly',
    duration: job.duration,
    location: job.location || 'Remote',
    experienceLevel: job.experience_level,
    skills: job.skills_required || [],
    client: {
      name: job.profiles?.full_name || 'Anonymous',
      avatar: job.profiles?.avatar_url || `https://i.pravatar.cc/150?u=${job.client_wallet}`,
      rating: 4.8,
      reviewCount: 0,
      jobsPosted: 0,
      spend: 0,
      isPaymentVerified: true,
      location: job.profiles?.location || 'Global',
    },
    proposals: {
      count: 0,
    },
  }));
}

export default async function BrowseJobsPage() {
  const jobs = await getJobs();

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
              <h2 className="text-lg font-semibold">Showing {jobs.length} jobs</h2>
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

        {jobs.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            No jobs found. Check back soon!
          </div>
        ) : (
          <div className="space-y-6">
            {jobs.map((job, index) => (
              <JobCard key={index} job={job} />
            ))}
          </div>
        )}

        <Pagination className="mt-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>1</PaginationLink>
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