
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Briefcase,
  CheckCircle,
  Clock,
  DollarSign,
  MapPin,
  MessageSquare,
  Save,
  Star,
} from 'lucide-react';
import Image from 'next/image';

const freelancer = {
  name: 'John Doe',
  title: 'Full-Stack Developer',
  location: 'Lagos, Nigeria',
  timezone: 'GMT+1',
  avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
  isVerified: true,
  rating: 4.8,
  reviewCount: 28,
  jobsCompleted: 28,
  totalEarned: 4560,
  hourlyRate: 50,
  responseTime: 'Within 1 hour',
  memberSince: 'January 2025',
  bio: "I'm a passionate full-stack developer with 5+ years of experience building web applications. I specialize in React, Node.js, and creating intuitive user experiences. I've worked with startups and enterprises across various industries.",
  whatIOffer: [
    'Clean, maintainable code',
    'Excellent communication',
    'On-time delivery',
    'Post-launch support',
  ],
  availability: {
    status: 'Available Now',
    canStart: 'Immediately',
    hoursPerWeek: '40 hrs/week',
  },
};

const skills = [
    { name: 'React', rating: 5, endorsements: 18, level: 'Expert' },
    { name: 'Node.js', rating: 5, endorsements: 15, level: 'Expert' },
    { name: 'TypeScript', rating: 4, endorsements: 12, level: 'Advanced' },
    { name: 'MongoDB', rating: 4, endorsements: 10, level: 'Advanced' },
    { name: 'Figma', rating: 3, endorsements: 5, level: 'Intermediate' },
]

const portfolio = [
    { title: 'E-commerce Platform', image: 'https://picsum.photos/seed/p1/400/300', dataAiHint: 'ecommerce platform' },
    { title: 'Dashboard Analytics', image: 'https://picsum.photos/seed/p2/400/300', dataAiHint: 'dashboard analytics' },
    { title: 'Mobile App Design', image: 'https://picsum.photos/seed/p3/400/300', dataAiHint: 'mobile app' },
]

const reviews = [
    { client: 'TechCorp Inc.', date: '2 days ago', rating: 5, comment: "Excellent work! Would hire again!" },
    { client: 'Sarah M.', date: '5 days ago', rating: 5, comment: "Professional and delivered on time." },
    { client: 'Mike T.', date: '1 week ago', rating: 5, comment: "Great communication throughout." },
]

function SkillRating({ rating, max = 5 }: { rating: number, max?: number }) {
    return (
        <div className="flex items-center gap-1 text-yellow-400">
            {[...Array(max)].map((_, i) => (
                <Star key={i} className={`h-4 w-4 ${i < rating ? 'fill-current' : 'text-muted'}`} />
            ))}
        </div>
    )
}

export default function FreelancerProfilePage() {
  return (
    <div className="w-full">
      <header className="relative h-48 bg-gradient-to-r from-primary to-teal rounded-lg">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[calc(100%-2rem)] sm:w-[calc(100%-4rem)]">
          <Card className="shadow-lg">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <Avatar className="w-24 h-24 md:w-32 md:h-32 border-4 border-background">
                  <AvatarImage src={freelancer.avatar} alt={freelancer.name} />
                  <AvatarFallback>{freelancer.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-2">
                    <h1 className="text-2xl md:text-3xl font-bold">{freelancer.name}</h1>
                    {freelancer.isVerified && (
                      <Badge variant="outline" className="text-green-600 border-green-600/50">
                        <CheckCircle className="h-4 w-4 mr-1" /> Verified
                      </Badge>
                    )}
                  </div>
                  <p className="text-lg text-muted-foreground mt-1">{freelancer.title}</p>
                  <div className="text-sm text-muted-foreground flex flex-wrap justify-center md:justify-start items-center gap-x-4 gap-y-1 mt-2">
                    <div className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> {freelancer.location}</div>
                    <div className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> {freelancer.timezone}</div>
                  </div>
                   <div className="mt-4 flex flex-wrap justify-center md:justify-start items-center gap-x-4 gap-y-2 text-sm">
                        <div className="flex items-center gap-1 text-muted-foreground"><Star className="h-4 w-4 text-yellow-400 fill-yellow-400"/> <span className="font-bold text-foreground">{freelancer.rating}</span> ({freelancer.reviewCount} reviews)</div>
                        <div className="flex items-center gap-1 text-muted-foreground"><Briefcase className="h-4 w-4"/> {freelancer.jobsCompleted} jobs</div>
                        <div className="flex items-center gap-1 text-muted-foreground"><DollarSign className="h-4 w-4"/> ${freelancer.totalEarned.toLocaleString()} earned</div>
                   </div>
                </div>
                <div className="flex items-center gap-2 mt-4 md:mt-0">
                    <Button variant="outline"><MessageSquare /> <span className="hidden sm:inline ml-2">Message</span></Button>
                    <Button>Hire Me</Button>
                    <Button variant="ghost" size="icon"><Save /></Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </header>

      <main className="mt-28">
        <Tabs defaultValue="overview">
          <div className="sticky top-[60px] bg-background/80 backdrop-blur-sm z-10 border-b">
            <div className="container mx-auto">
                <TabsList className="bg-transparent p-0 h-14">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
                    <TabsTrigger value="reviews">Reviews</TabsTrigger>
                    <TabsTrigger value="work-history">Work History</TabsTrigger>
                    <TabsTrigger value="skills">Skills</TabsTrigger>
                </TabsList>
            </div>
          </div>
          <div className="container mx-auto py-8">
            <TabsContent value="overview">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-2 space-y-8">
                  <Card>
                    <CardHeader><CardTitle>About Me</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-muted-foreground">{freelancer.bio}</p>
                      <div>
                        <h4 className="font-semibold mb-2">What I offer:</h4>
                        <ul className="list-disc list-inside text-muted-foreground space-y-1">
                          {freelancer.whatIOffer.map(item => <li key={item}>{item}</li>)}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader><CardTitle>Skills & Expertise</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        {skills.map(skill => (
                            <div key={skill.name}>
                                <div className="flex justify-between items-center">
                                    <span className="font-medium">{skill.name}</span>
                                    <span className="text-sm text-muted-foreground">{skill.endorsements} endorsements</span>
                                </div>
                                <div className="flex items-center gap-2 mt-1">
                                    <SkillRating rating={skill.rating} />
                                    <span className="text-sm text-muted-foreground">{skill.level}</span>
                                </div>
                            </div>
                        ))}
                        <Button variant="link" className="p-0 h-auto">Show all 12 skills</Button>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader><CardTitle>Featured Work</CardTitle></CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {portfolio.map(item => (
                                <div key={item.title} className="group">
                                    <Image src={item.image} alt={item.title} width={400} height={300} className="rounded-lg object-cover aspect-[4/3] group-hover:opacity-90 transition-opacity" data-ai-hint={item.dataAiHint} />
                                    <p className="font-medium mt-2 text-sm text-center">{item.title}</p>
                                </div>
                            ))}
                        </div>
                        <Button variant="link" className="p-0 h-auto mt-4">View Full Portfolio &rarr;</Button>
                    </CardContent>
                  </Card>
                   <Card>
                    <CardHeader><CardTitle>Client Reviews</CardTitle></CardHeader>
                    <CardContent className="space-y-6">
                        {reviews.map(review => (
                            <div key={review.client}>
                                <div className="flex items-center gap-2">
                                     <SkillRating rating={review.rating} />
                                     <p className="font-semibold text-sm">"{review.comment}"</p>
                                </div>
                               <p className="text-sm text-muted-foreground mt-1">- {review.client} &bull; {review.date}</p>
                            </div>
                        ))}
                        <Button variant="link" className="p-0 h-auto">View All 28 Reviews &rarr;</Button>
                    </CardContent>
                  </Card>
                </div>
                <div className="lg:col-span-1 sticky top-[120px] space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <span className="relative flex h-3 w-3">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                                </span>
                                {freelancer.availability.status}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm space-y-2">
                            <p><span className="font-medium text-foreground">Can start:</span> <span className="text-muted-foreground">{freelancer.availability.canStart}</span></p>
                            <p><span className="font-medium text-foreground">Availability:</span> <span className="text-muted-foreground">{freelancer.availability.hoursPerWeek}</span></p>
                             <Separator className="my-4" />
                            <div className="space-y-1">
                                <p><span className="font-medium text-foreground">Hourly Rate:</span> <span className="text-muted-foreground">${freelancer.hourlyRate}/hour</span></p>
                                <p><span className="font-medium text-foreground">Response Time:</span> <span className="text-muted-foreground">{freelancer.responseTime}</span></p>
                                <p><span className="font-medium text-foreground">Member Since:</span> <span className="text-muted-foreground">{freelancer.memberSince}</span></p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="portfolio"><p>Portfolio items will be listed here.</p></TabsContent>
            <TabsContent value="reviews"><p>All reviews will be listed here.</p></TabsContent>
            <TabsContent value="work-history"><p>Work history will be listed here.</p></TabsContent>
            <TabsContent value="skills"><p>All skills will be listed here.</p></TabsContent>
          </div>
        </Tabs>
      </main>
    </div>
  );
}

    