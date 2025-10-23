
'use client';
import { useState } from 'react';
import {
  ArrowUp,
  Award,
  BarChart,
  CheckCircle,
  ChevronDown,
  Clock,
  MoreVertical,
  Repeat,
  Search,
  Star,
  ThumbsUp,
  Trophy,
  MessageCircle,
  Users,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';

const overallStats = {
  rating: 4.8,
  reviewCount: 32,
  isTopRated: true,
};

const summaryCards = [
  {
    title: 'Overall Rating',
    value: '4.82',
    icon: Star,
    subValue: '96% positive',
    change: '+0.2 last month',
  },
  {
    title: 'Total Reviews',
    value: '32',
    icon: MessageCircle,
    subValue: '5 in last 30 days',
  },
  {
    title: 'Response Rate',
    value: '98%',
    icon: CheckCircle,
    subValue: 'You respond to reviews',
  },
  {
    title: 'Repeat Clients',
    value: '6',
    icon: Repeat,
    subValue: '18.75% loyalty',
  },
];

const ratingDistribution = [
    { rating: 5, count: 28, percentage: 87.5 },
    { rating: 4, count: 3, percentage: 9.4 },
    { rating: 3, count: 1, percentage: 3.1 },
    { rating: 2, count: 0, percentage: 0 },
    { rating: 1, count: 0, percentage: 0 },
];

const categoryRatings = [
    { name: 'Quality of Work', rating: 5.0 },
    { name: 'Communication', rating: 4.8 },
    { name: 'Expertise', rating: 4.9 },
    { name: 'Professionalism', rating: 5.0 },
    { name: 'On-Time Delivery', rating: 4.7 },
    { name: 'Value for Money', rating: 4.8 },
];

const reviews = [
  {
    id: 1,
    client: { name: 'TechCorp Inc.', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026706e', location: 'USA', memberSince: 'Jan 2024', jobs: 3, isVerified: true },
    job: { title: 'Build React Dashboard', value: '1,200 USDC' },
    rating: 5,
    categoryRatings: { quality: 5, communication: 5, expertise: 5, professionalism: 5, delivery: 5, value: 5 },
    comment: 'John is an exceptional developer. His attention to detail and communication skills are top-notch. He delivered ahead of schedule and the final product exceeded our expectations. Highly recommended!',
    date: '3 days ago',
    tags: ['Great Communication', 'Fast Delivery', 'Quality Work'],
    isFeatured: true,
    response: null,
  },
  {
    id: 2,
    client: { name: 'SaaSify', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d', location: 'Canada', memberSince: 'Mar 2024', jobs: 1, isVerified: true },
    job: { title: 'API Integration for SaaS', value: '2,000 USDC' },
    rating: 5,
    categoryRatings: { quality: 5, communication: 5, expertise: 5, professionalism: 5, delivery: 5, value: 4 },
    comment: 'Working with John was a great experience. He understood our requirements perfectly and integrated the API flawlessly. Will definitely hire again.',
    date: '1 week ago',
    tags: ['Excellent Work', 'Proactive'],
    isFeatured: false,
    response: { text: "Thank you for the kind words! It was a pleasure working with you and I look forward to future collaborations.", date: '6 days ago' },
  },
  {
    id: 3,
    client: { name: 'Crypto-Innovate', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026707d', location: 'Global', memberSince: 'Feb 2024', jobs: 1, isVerified: false },
    job: { title: 'Senior Blockchain Engineer', value: '$150/hr' },
    rating: 4,
    categoryRatings: { quality: 4, communication: 4, expertise: 5, professionalism: 5, delivery: 4, value: 4 },
    comment: 'Good expertise in Solidity, but communication could be slightly more proactive. Overall, a solid freelancer.',
    date: '2 weeks ago',
    tags: ['Deep Expertise'],
    isFeatured: false,
    response: null,
  },
];


function RatingStars({ rating, size = 'md' }: { rating: number; size?: 'sm' | 'md' | 'lg' }) {
    const starSize = { sm: 'h-4 w-4', md: 'h-5 w-5', lg: 'h-6 w-6' }[size];
    return (
        <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
                <Star key={i} className={`${starSize} ${i < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground/30'}`} />
            ))}
        </div>
    );
}

function ReviewCard({ review }: { review: any }) {
    const [isResponding, setIsResponding] = useState(false);
    return (
        <Card>
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div className="flex items-start gap-4">
                        <Avatar className="h-12 w-12">
                            <AvatarImage src={review.client.avatar} />
                            <AvatarFallback>{review.client.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <div className="flex items-center gap-2">
                                <h4 className="font-semibold">{review.client.name}</h4>
                                {review.client.isVerified && <CheckCircle className="h-4 w-4 text-primary"/>}
                            </div>
                            <p className="text-sm text-muted-foreground">{review.client.location} • Member since {review.client.memberSince}</p>
                            <p className="text-sm text-muted-foreground">{review.client.jobs} jobs with you</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-sm text-muted-foreground">{review.date}</p>
                        {review.isFeatured && <Badge className="mt-1 bg-yellow-400 text-black">Featured</Badge>}
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex items-center gap-2 mb-2">
                    <RatingStars rating={review.rating} />
                    <span className="font-bold">{review.rating.toFixed(1)}</span>
                </div>
                <p className="text-muted-foreground italic">"{review.comment}"</p>
                <div className="flex flex-wrap gap-2 my-4">
                    {review.tags.map((tag: string) => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                </div>
                <Separator />
                <div className="mt-4 text-sm">
                    <p><span className="font-semibold">Project:</span> <Link href="#" className="text-primary hover:underline">{review.job.title}</Link></p>
                    <p><span className="font-semibold">Value:</span> {review.job.value}</p>
                </div>
                {review.response && (
                    <div className="mt-4 bg-muted/50 p-3 rounded-lg">
                        <p className="text-sm font-semibold">Your Response</p>
                        <p className="text-sm text-muted-foreground italic mt-1">"{review.response.text}"</p>
                        <p className="text-xs text-muted-foreground text-right mt-2">{review.response.date}</p>
                    </div>
                )}
            </CardContent>
            <CardFooter className="justify-between">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Button variant="ghost" size="sm" className="flex items-center gap-1"><ThumbsUp className="h-4 w-4"/> 12</Button>
                    <span>Was this helpful?</span>
                </div>
                <div className="flex items-center gap-2">
                    {!review.response && <Button onClick={() => setIsResponding(!isResponding)}>{isResponding ? 'Cancel' : 'Respond'}</Button>}
                    <Button variant="outline">Share</Button>
                </div>
            </CardFooter>
            {isResponding && (
                <div className="p-6 pt-0 border-t mt-4">
                    <h4 className="font-semibold mb-2">Your Response</h4>
                    <Textarea placeholder="Thank the client and address their feedback..." />
                    <div className="flex justify-end gap-2 mt-2">
                        <Button variant="ghost" onClick={() => setIsResponding(false)}>Cancel</Button>
                        <Button>Post Response</Button>
                    </div>
                </div>
            )}
        </Card>
    )
}

export default function ReviewsPage() {
    const [activeTab, setActiveTab] = useState('all');

    const filteredReviews = reviews.filter(review => {
        if(activeTab === 'pending') return !review.response;
        return true;
    });

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Reviews & Ratings</h1>
          <p className="text-muted-foreground mt-1">Manage your feedback and reputation.</p>
        </div>
        {overallStats.isTopRated && (
             <Badge className="text-base py-2 px-4 bg-green-100 text-green-800 border-green-300">
                <Trophy className="mr-2 h-5 w-5 text-green-600"/> Top Rated Freelancer
            </Badge>
        )}
      </div>

       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {summaryCards.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.subValue}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      
       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="lg:col-span-1">
                <CardHeader>
                    <CardTitle>Rating Distribution</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                     {ratingDistribution.map(item => (
                        <div key={item.rating} className="flex items-center gap-2 text-sm">
                            <span className="w-12">{item.rating} star{item.rating > 1 ? 's' : ''}</span>
                            <Progress value={item.percentage} className="w-full h-2" />
                            <span className="w-16 text-right text-muted-foreground">{item.count}</span>
                        </div>
                    ))}
                </CardContent>
            </Card>
             <Card className="lg:col-span-2">
                <CardHeader>
                    <CardTitle>Ratings by Category</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-4">
                    {categoryRatings.map(cat => (
                        <div key={cat.name}>
                            <p className="font-medium text-sm">{cat.name}</p>
                            <div className="flex items-center gap-1">
                                <RatingStars rating={cat.rating} size="sm" />
                                <span className="text-sm text-muted-foreground">{cat.rating.toFixed(1)}</span>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
       </div>


      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="flex justify-between items-center">
            <TabsList>
                <TabsTrigger value="all">All Reviews ({reviews.length})</TabsTrigger>
                <TabsTrigger value="pending">
                    Pending Response ({reviews.filter(r => !r.response).length})
                </TabsTrigger>
                <TabsTrigger value="public">Public View</TabsTrigger>
            </TabsList>
            <div className="flex items-center gap-2">
                 <div className="relative w-full max-w-sm">
                    <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search by client or job..." className="pl-8" />
                </div>
                 <Button variant="outline">
                    Sort by: Recent <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
            </div>
        </div>

        <div className="mt-6 space-y-6">
          {filteredReviews.length > 0 ? (
            filteredReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))
          ) : (
            <Card className="text-center py-12">
              <CardContent>
                <Star className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">No reviews in this category yet</h3>
              </CardContent>
            </Card>
          )}
        </div>
      </Tabs>
    </div>
  );
}
