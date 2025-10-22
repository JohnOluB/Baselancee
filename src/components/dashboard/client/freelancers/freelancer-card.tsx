
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Clock, Briefcase, MessageSquare, Star } from 'lucide-react';
import Link from 'next/link';

export type Freelancer = {
  name: string;
  title: string;
  location: string;
  avatar: string;
  isVerified: boolean;
  rating: number;
  reviewCount: number;
  hourlyRate: number;
  bio: string;
  skills: string[];
  jobsCompleted: number;
  successRate: number;
  responseTime: string;
  status: 'Top Rated' | 'Rising Talent' | 'Featured' | null;
};

export function FreelancerCard({ freelancer }: { freelancer: Freelancer }) {
  return (
    <Card className="group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <CardContent className="p-6 text-center">
        {freelancer.status && (
          <Badge
            className={`absolute top-4 left-4 ${
              freelancer.status === 'Top Rated'
                ? 'bg-yellow-400 text-black hover:bg-yellow-500'
                : freelancer.status === 'Rising Talent'
                ? 'bg-green-100 text-green-800'
                : 'bg-primary/10 text-primary'
            }`}
          >
            {freelancer.status}
          </Badge>
        )}
        <Avatar className="w-20 h-20 mx-auto mb-4 border-2 border-muted">
          <AvatarImage src={freelancer.avatar} alt={freelancer.name} />
          <AvatarFallback>{freelancer.name.slice(0, 2)}</AvatarFallback>
        </Avatar>
        <div className="flex items-center justify-center gap-2">
          <h3 className="text-lg font-bold">{freelancer.name}</h3>
          {freelancer.isVerified && <CheckCircle className="h-5 w-5 text-primary" />}
        </div>
        <p className="text-sm text-muted-foreground">{freelancer.title}</p>
        <p className="text-xs text-muted-foreground mt-1">📍 {freelancer.location}</p>

        <div className="flex items-center justify-center gap-4 text-sm my-4">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
            <span className="font-semibold">{freelancer.rating.toFixed(1)}</span>
            <span className="text-muted-foreground">({freelancer.reviewCount})</span>
          </div>
          <span className="font-semibold">${freelancer.hourlyRate}/hour</span>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2 h-10">{freelancer.bio}</p>

        <div className="flex flex-wrap gap-1 justify-center my-4 min-h-[22px]">
          {freelancer.skills.slice(0, 3).map((skill) => (
            <Badge key={skill} variant="secondary">
              {skill}
            </Badge>
          ))}
        </div>

        <div className="flex justify-around text-xs text-muted-foreground border-t pt-4">
          <div className="flex items-center gap-1">
            <Briefcase className="h-4 w-4" /> {freelancer.jobsCompleted} jobs
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" /> {freelancer.responseTime}
          </div>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-2">
          <Button variant="outline" className="flex-1" asChild>
            <Link href="/dashboard/freelancer/profile">
                <MessageSquare className="mr-2 h-4 w-4" /> Message
            </Link>
          </Button>
          <Button className="flex-1" asChild>
            <Link href="/dashboard/freelancer/profile">View Profile</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
