
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  CheckCircle,
  Clock,
  Briefcase,
  MessageSquare,
  Star,
  Heart,
  MapPin,
  CircleDot,
} from 'lucide-react';
import type { Freelancer } from './freelancer-card';
import Link from 'next/link';

export function FreelancerListItem({ freelancer }: { freelancer: Freelancer }) {
  return (
    <Card className="group transition-all duration-300 hover:border-primary">
      <CardContent className="p-6">
        <div className="grid md:grid-cols-[auto_1fr_auto] gap-6 items-start">
          <Avatar className="w-20 h-20 border-2 border-muted">
            <AvatarImage src={freelancer.avatar} alt={freelancer.name} />
            <AvatarFallback>{freelancer.name.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="space-y-2">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                  <Link href="/dashboard/freelancer/profile">{freelancer.name}</Link>
                </h3>
                {freelancer.isVerified && <CheckCircle className="h-5 w-5 text-primary" />}
              </div>
              {freelancer.status && (
                <Badge
                  className={`${
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
            </div>

            <p className="text-base text-muted-foreground">{freelancer.title}</p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5"><MapPin className="h-4 w-4" />{freelancer.location}</div>
                <div className="flex items-center gap-1.5"><Clock className="h-4 w-4" />GMT+1</div>
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm pt-2">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                <span className="font-semibold text-foreground">{freelancer.rating.toFixed(1)}</span>
                <span className="text-muted-foreground">({freelancer.reviewCount} reviews)</span>
              </div>
              <span className="text-muted-foreground">•</span>
              <span className="font-semibold text-foreground">${freelancer.hourlyRate}/hour</span>
              <span className="text-muted-foreground">•</span>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Briefcase className="h-4 w-4" /> {freelancer.jobsCompleted} jobs
              </div>
               <span className="text-muted-foreground">•</span>
               <span className="text-muted-foreground">{freelancer.successRate}% success</span>
            </div>
            
            <p className="text-sm text-muted-foreground pt-3 line-clamp-2">
                <span className="font-semibold text-foreground">Bio: </span>
                {freelancer.bio}
            </p>
             <div className="flex flex-wrap gap-2 pt-2">
                <span className="text-sm font-semibold text-foreground">Top Skills:</span>
                {freelancer.skills.map((skill) => (
                    <Badge key={skill} variant="secondary">
                    {skill}
                    </Badge>
                ))}
            </div>

             <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2">
                <div className="flex items-center gap-1.5 text-green-600 font-medium"><CircleDot className="h-4 w-4"/>Available now</div>
                <span>•</span>
                <span>Responds within {freelancer.responseTime}</span>
            </div>
            
          </div>
          <div className="flex flex-col items-end gap-2">
             <div className="flex items-center gap-2">
                <Button variant="outline" size="icon"><Heart className="h-4 w-4" /></Button>
                <Button variant="outline">
                    <MessageSquare className="mr-2 h-4 w-4" /> Message
                </Button>
                <Button asChild>
                    <Link href="/dashboard/freelancer/profile">View Profile</Link>
                </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
