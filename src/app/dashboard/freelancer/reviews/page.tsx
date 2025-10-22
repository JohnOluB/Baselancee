
'use client';
import { useState } from 'react';
import {
  Star,
  CheckCircle,
  MoreVertical,
  ThumbsUp,
  Share2,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';

const reviewsData = [
  {
    id: 1,
    client: {
      name: 'TechCorp Inc.',
      avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026706e',
      isVerified: true,
      location: 'San Francisco, CA',
      jobs: 3,
    },
    jobTitle: 'Build a React Dashboard for Analytics Platform',
    rating: 5,
    comment:
      'John is an exceptional developer. He delivered high-quality work ahead of schedule and was a pleasure to communicate with. Highly recommended!',
    date: 'Oct 15, 2025',
    budget: '1,200 USDC',
    response: null,
  },
  {
    id: 2,
    client: {
      name: 'Creative Solutions',
      avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026708d',
      isVerified: true,
      location: 'Canada',
      jobs: 1,
    },
    jobTitle: 'UI/UX Designer for Mobile App',
    rating: 4,
    comment:
      'Good work on the designs. There were a few revisions needed but John was quick to address them. Overall a positive experience.',
    date: 'Sep 28, 2025',
    budget: '3,000 USDC',
    response:
      'Thank you for the feedback! I\'m glad we were able to get the designs just right. It was a pleasure working with you.',
  },
];

const ratingDistribution = [
  { rating: 5, count: 25, percentage: 89 },
  { rating: 4, count: 3, percentage: 11 },
  { rating: 3, count: 0, percentage: 0 },
  { rating: 2, count: 0, percentage: 0 },
  { rating: 1, count: 0, percentage: 0 },
];

function ReviewCard({ review, publicView = false }: { review: any, publicView?: boolean }) {
  const [showResponse, setShowResponse] = useState(false);

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={review.client.avatar} />
              <AvatarFallback>{review.client.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{review.client.name}</p>
              <div className="text-xs text-muted-foreground flex items-center gap-2">
                <span>{review.client.location}</span>
                <span>•</span>
                <span>{review.client.jobs} jobs with you</span>
              </div>
            </div>
          </div>
          <div className="text-xs text-muted-foreground text-right">
            <p>{review.date}</p>
            <p>{review.budget}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-5 w-5 ${
                i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted'
              }`}
            />
          ))}
        </div>
        <p className="font-semibold italic">"{review.comment}"</p>
        <p className="text-sm text-muted-foreground mt-1">
          For job: {review.jobTitle}
        </p>

        {review.response && (
          <div className="mt-4 p-3 bg-muted/50 rounded-lg">
            <p className="text-sm font-semibold">Your Response</p>
            <p className="text-sm text-muted-foreground">{review.response}</p>
          </div>
        )}

        {!review.response && showResponse && !publicView && (
          <div className="mt-4 space-y-2">
            <Textarea placeholder="Write your public response..." />
            <div className="flex justify-end gap-2">
              <Button variant="ghost" onClick={() => setShowResponse(false)}>
                Cancel
              </Button>
              <Button>Post Response</Button>
            </div>
          </div>
        )}
      </CardContent>
      {!publicView && (
        <CardFooter className="justify-end gap-2">
          {!review.response && !showResponse && (
            <Button onClick={() => setShowResponse(true)}>Respond</Button>
          )}
          <Button variant="outline">
            <Share2 className="h-4 w-4 mr-2" /> Share
          </Button>
        </CardFooter>
      )}
       {publicView && review.response && (
         <CardFooter className="justify-end gap-2">
            <Button variant="ghost" size="sm"><ThumbsUp className="h-4 w-4 mr-2" /> Helpful (3)</Button>
        </CardFooter>
       )}
    </Card>
  );
}

export default function ReviewsPage() {
    const [reviews, setReviews] = useState(reviewsData);
    const pendingReviews = reviews.filter(r => r.response === null);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Reviews & Ratings</h1>
        <p className="text-muted-foreground mt-1">
          Manage your public reputation.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Overall Rating</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="text-center">
            <p className="text-7xl font-bold">4.8</p>
            <div className="flex items-center justify-center gap-1 mt-2">
                {[...Array(4)].map((_, i) => (
                    <Star key={i} className="h-8 w-8 text-yellow-400 fill-yellow-400" />
                ))}
                <Star className="h-8 w-8 text-yellow-400 fill-yellow-400" style={{clipPath: 'inset(0 20% 0 0)'}}/>
            </div>
            <p className="text-muted-foreground mt-2">Based on {reviews.length} reviews</p>
          </div>
          <div className="space-y-2">
            {ratingDistribution.map((item) => (
              <div key={item.rating} className="flex items-center gap-2 text-sm">
                <span className="w-12">{item.rating} stars</span>
                <Progress value={item.percentage} className="w-full h-2" />
                <span className="w-16 text-right text-muted-foreground">
                  {item.count}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Reviews ({reviews.length})</TabsTrigger>
          <TabsTrigger value="pending">Pending Response ({pendingReviews.length})</TabsTrigger>
          <TabsTrigger value="public">Public View</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-6 space-y-6">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </TabsContent>
        <TabsContent value="pending" className="mt-6 space-y-6">
            {pendingReviews.length > 0 ? (
                pendingReviews.map((review) => (
                    <ReviewCard key={review.id} review={review} />
                ))
            ) : (
                <Card className="text-center py-12">
                    <CardContent>
                        <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
                        <h3 className="mt-4 text-lg font-medium">You're all caught up!</h3>
                        <p className="mt-2 text-sm text-muted-foreground">You have responded to all your reviews.</p>
                    </CardContent>
                </Card>
            )}
        </TabsContent>
        <TabsContent value="public" className="mt-6 space-y-6">
            <Card className="bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-700/50">
                <CardContent className="p-4 text-sm text-blue-800 dark:text-blue-200">
                    This is a preview of how clients see your reviews on your public profile.
                </CardContent>
            </Card>
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} publicView={true} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
