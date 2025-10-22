
'use client';
import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { LayoutGrid, List } from 'lucide-react';
import { FreelancerFilters } from '@/components/dashboard/client/freelancers/freelancer-filters';
import { FreelancerCard, type Freelancer } from '@/components/dashboard/client/freelancers/freelancer-card';
import { FreelancerListItem } from '@/components/dashboard/client/freelancers/freelancer-list-item';

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis
} from '@/components/ui/pagination';


const freelancers: Freelancer[] = [
    {
        name: 'John Doe',
        title: 'Full-Stack Developer',
        location: 'Lagos, Nigeria',
        avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
        isVerified: true,
        rating: 4.8,
        reviewCount: 28,
        hourlyRate: 50,
        bio: "I build scalable and user-friendly web applications. With 5+ years of experience, I specialize in the MERN stack and have a passion for creating performant backends and intuitive frontends.",
        skills: ['React', 'Node.js', 'MongoDB', 'TypeScript', 'AWS'],
        jobsCompleted: 28,
        successRate: 92,
        responseTime: '1 hour',
        status: 'Top Rated',
    },
    {
        name: 'Jane Smith',
        title: 'UI/UX Designer',
        location: 'London, UK',
        avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026705d',
        isVerified: true,
        rating: 4.9,
        reviewCount: 42,
        hourlyRate: 65,
        bio: "Creative and detail-oriented UI/UX designer with a knack for crafting beautiful and intuitive digital experiences. I use Figma to bring ideas to life through wireframes, prototypes, and high-fidelity designs.",
        skills: ['Figma', 'UI/UX Design', 'Prototyping', 'User Research'],
        jobsCompleted: 35,
        successRate: 98,
        responseTime: '2 hours',
        status: 'Featured',
    },
    {
        name: 'Alex Johnson',
        title: 'Blockchain Engineer',
        location: 'New York, USA',
        avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026706e',
        isVerified: false,
        rating: 4.7,
        reviewCount: 15,
        hourlyRate: 90,
        bio: "Solidity developer focused on DeFi and smart contract security. I have experience building and auditing complex protocols on Ethereum and other EVM-compatible chains.",
        skills: ['Solidity', 'Hardhat', 'EVM', 'DeFi', 'Security Audits'],
        jobsCompleted: 12,
        successRate: 100,
        responseTime: '4 hours',
        status: null,
    },
    {
        name: 'Emily White',
        title: 'Content Writer & SEO Specialist',
        location: 'Toronto, Canada',
        avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026707d',
        isVerified: true,
        rating: 4.8,
        reviewCount: 55,
        hourlyRate: 40,
        bio: "I write compelling content that ranks. My expertise lies in creating SEO-optimized blog posts, articles, and website copy that drives organic traffic and engages readers.",
        skills: ['Content Writing', 'SEO', 'Copywriting', 'Ahrefs'],
        jobsCompleted: 80,
        successRate: 95,
        responseTime: '30 minutes',
        status: 'Top Rated',
    },
    {
        name: 'Michael Brown',
        title: 'Mobile App Developer (React Native)',
        location: 'Berlin, Germany',
        avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026708d',
        isVerified: true,
        rating: 4.6,
        reviewCount: 20,
        hourlyRate: 55,
        bio: "Building cross-platform mobile apps with React Native is my specialty. I focus on creating smooth animations, optimizing performance, and delivering a native-like user experience.",
        skills: ['React Native', 'iOS', 'Android', 'Firebase'],
        jobsCompleted: 18,
        successRate: 90,
        responseTime: 'within a day',
        status: 'Rising Talent',
    },
    {
        name: 'Chris Green',
        title: 'Data Scientist',
        location: 'Remote',
        avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026709d',
        isVerified: false,
        rating: 4.9,
        reviewCount: 10,
        hourlyRate: 75,
        bio: "I help businesses make data-driven decisions. My skills include machine learning, statistical analysis, and data visualization using Python, Scikit-learn, and Tableau.",
        skills: ['Python', 'Machine Learning', 'Pandas', 'Tableau'],
        jobsCompleted: 8,
        successRate: 100,
        responseTime: '6 hours',
        status: 'Rising Talent',
    },
]

export default function BrowseFreelancersPage() {
  const [view, setView] = useState<'grid' | 'list'>('grid');

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <aside className="w-full md:w-[300px] lg:w-[320px] shrink-0">
        <div className="sticky top-[76px]">
          <FreelancerFilters />
        </div>
      </aside>

      <main className="flex-1">
        <div className="bg-card border rounded-lg p-4 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex-1">
              <h2 className="text-lg font-semibold">Found 124 freelancers</h2>
            </div>
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-muted-foreground">Sort by:</span>
                    <Select defaultValue="match">
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="match">Best Match</SelectItem>
                            <SelectItem value="rating">Highest Rated</SelectItem>
                            <SelectItem value="experience">Most Experience</SelectItem>
                            <SelectItem value="rate_low">Lowest Rate</SelectItem>
                            <SelectItem value="rate_high">Highest Rate</SelectItem>
                            <SelectItem value="recent">Most Recent</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                 <div className="flex items-center gap-1 border rounded-md p-1">
                    <Button variant={view === 'grid' ? 'secondary' : 'ghost'} size="icon" onClick={() => setView('grid')}><LayoutGrid className="h-5 w-5"/></Button>
                    <Button variant={view === 'list' ? 'secondary' : 'ghost'} size="icon" onClick={() => setView('list')}><List className="h-5 w-5"/></Button>
                 </div>
            </div>
          </div>
        </div>

        {view === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {freelancers.map((freelancer, index) => (
              <FreelancerCard key={index} freelancer={freelancer} />
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {freelancers.map((freelancer, index) => (
              <FreelancerListItem key={index} freelancer={freelancer} />
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
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">15</PaginationLink>
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
