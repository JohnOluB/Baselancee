
'use client';
import { useState } from 'react';
import {
  Trophy,
  Wallet,
  CheckCircle,
  Gem,
  Lock,
  ChevronDown,
  Sparkles,
  Search,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';

const badges = [
    {
        name: 'Top Rated',
        tier: 'Blue',
        description: 'Awarded to elite freelancers on BaseLance.',
        status: 'minted',
        earnedOn: '2025-09-15',
        mintedOn: '2025-09-16',
        tokenId: '#1234',
        imageUrl: '/badges/top-rated.gif', // Placeholder, ideally a real animated image
        rarity: 'Epic',
        requirements: { 'Jobs Completed': '10', 'Rating': '4.7+' },
        benefits: ['30% proposal boost', '1.8% platform fee']
    },
    {
        name: 'Rising Talent',
        tier: 'Green',
        description: 'Recognizes new, high-potential freelancers.',
        status: 'earned',
        earnedOn: '2025-06-20',
        imageUrl: '/badges/rising-talent.gif',
        rarity: 'Common',
        requirements: { 'Profile Completion': '100%', 'Proposals Sent': '10+' },
        benefits: ['15% proposal boost', 'First withdrawal fee waived']
    },
    {
        name: 'Top Rated Plus',
        tier: 'Gold',
        description: 'The highest honor for the absolute best on the platform.',
        status: 'in-progress',
        progress: 75,
        imageUrl: '/badges/top-rated-plus.gif',
        rarity: 'Legendary',
        requirements: { 'Total Earnings': '75,000/100,000 USDC', 'Client Rehire Rate': '45%/50%+' },
        benefits: ['50% proposal boost', '1.5% platform fee', 'VIP Support']
    },
     {
        name: 'Century Club',
        tier: 'Milestone',
        description: 'Awarded for completing 100 jobs.',
        status: 'earned',
        earnedOn: '2025-10-01',
        imageUrl: '/badges/century-club.gif',
        rarity: 'Rare',
        requirements: { 'Jobs Completed': '100' },
        benefits: ['Profile flair', 'Bonus visibility']
    },
    {
        name: 'Code Wizard',
        tier: 'Specialist',
        description: 'Top 5% in the Web Development category.',
        status: 'locked',
        imageUrl: '/badges/code-wizard.gif',
        rarity: 'Rare',
        requirements: { 'Category Jobs': '15/20', 'Category Rating': '4.7/4.8+' },
        benefits: ['Specialist badge on profile', 'Higher ranking in category']
    }
];

function BadgeCard({ badge }: { badge: any }) {
    const getTierColor = (tier: string) => {
        switch(tier) {
            case 'Green': return 'text-green-500 border-green-500/50 bg-green-500/10';
            case 'Blue': return 'text-blue-500 border-blue-500/50 bg-blue-500/10';
            case 'Gold': return 'text-yellow-500 border-yellow-500/50 bg-yellow-500/10';
            case 'Milestone': return 'text-purple-500 border-purple-500/50 bg-purple-500/10';
            case 'Specialist': return 'text-indigo-500 border-indigo-500/50 bg-indigo-500/10';
            default: return 'text-muted-foreground border-muted-foreground/50 bg-muted-foreground/10'
        }
    }

    return (
        <Card className={cn("flex flex-col group", {
            "grayscale opacity-60 hover:grayscale-0 hover:opacity-100": badge.status === 'locked' || badge.status === 'in-progress'
        })}>
            <CardHeader className="p-4">
                <div className="relative aspect-square bg-muted rounded-md flex items-center justify-center overflow-hidden">
                    {/* Placeholder for animated badge */}
                    <Gem className="w-1/2 h-1/2 text-muted-foreground" />
                    {badge.status === 'minted' && (
                        <div className="absolute top-2 right-2 text-xs font-bold bg-green-500 text-white px-2 py-1 rounded-full shadow-lg">MINTED</div>
                    )}
                     {badge.status === 'locked' && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <Lock className="w-12 h-12 text-white/50" />
                        </div>
                    )}
                </div>
            </CardHeader>
            <CardContent className="p-4 pt-0 flex-grow">
                <div className="flex justify-between items-center">
                    <h3 className="font-bold text-lg">{badge.name}</h3>
                    <div className={cn("text-xs font-bold px-2 py-0.5 rounded-full", getTierColor(badge.tier))}>{badge.tier}</div>
                </div>
                <p className="text-sm text-muted-foreground mt-1 h-10">{badge.description}</p>
                
                {badge.status === 'in-progress' && (
                    <div className="mt-2">
                        <Progress value={badge.progress} />
                        <p className="text-xs text-muted-foreground mt-1 text-center">{badge.progress}% to unlock</p>
                    </div>
                )}
            </CardContent>
            <CardFooter className="p-4 pt-0">
                {badge.status === 'earned' && <Button className="w-full">Mint as NFT</Button>}
                {badge.status === 'minted' && <Button variant="outline" className="w-full">View on OpenSea</Button>}
                {(badge.status === 'in-progress' || badge.status === 'locked') && <Button variant="secondary" className="w-full">View Requirements</Button>}
            </CardFooter>
        </Card>
    );
}

export default function AchievementsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('all');

    const filteredBadges = badges.filter(badge => {
        const matchesTab = activeTab === 'all' || badge.status === activeTab;
        const matchesSearch = badge.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesTab && matchesSearch;
    });

    const getTabContent = () => {
        const badgesToDisplay = activeTab === 'all' ? filteredBadges : badges.filter(b => b.status === activeTab && b.name.toLowerCase().includes(searchQuery.toLowerCase()));
        
        if (badgesToDisplay.length === 0) {
            return (
                 <Card className="text-center py-12 col-span-full">
                    <CardContent>
                        <Gem className="mx-auto h-12 w-12 text-muted-foreground" />
                        <h3 className="mt-4 text-lg font-medium">No Badges Found</h3>
                        <p className="mt-2 text-sm text-muted-foreground">
                            No badges match your current filters. Try adjusting your search or filter settings.
                        </p>
                    </CardContent>
                </Card>
            )
        }

        return badgesToDisplay.map((badge, index) => <BadgeCard key={index} badge={badge} />)
    }

    return (
        <div className="space-y-8">
             <div>
                <h1 className="text-3xl font-bold">My Achievements & NFT Badges</h1>
                <p className="text-muted-foreground mt-1">Showcase your success on-chain.</p>
            </div>
            <div className="flex justify-between items-center">
                <Button variant="outline">
                    <Wallet className="mr-2 h-4 w-4" />
                    0x1234...5678
                </Button>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Badges Earned</CardTitle>
                        <Trophy className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">3</div>
                        <p className="text-xs text-muted-foreground">out of 15 possible badges</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Badges Minted</CardTitle>
                        <CheckCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">1</div>
                        <p className="text-xs text-muted-foreground">on Base blockchain</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Rarity Score</CardTitle>
                        <Sparkles className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">720</div>
                        <p className="text-xs text-muted-foreground">Top 15% of freelancers</p>
                    </CardContent>
                </Card>
            </div>

            <div>
                <Tabs defaultValue="all" onValueChange={setActiveTab}>
                    <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-4">
                        <TabsList>
                            <TabsTrigger value="all">All</TabsTrigger>
                            <TabsTrigger value="earned">Earned</TabsTrigger>
                            <TabsTrigger value="minted">Minted</TabsTrigger>
                            <TabsTrigger value="in-progress">In Progress</TabsTrigger>
                            <TabsTrigger value="locked">Locked</TabsTrigger>
                        </TabsList>
                        <div className="flex items-center gap-2">
                            <div className="relative w-full max-w-sm">
                                <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input 
                                    placeholder="Search badges..." 
                                    className="pl-8" 
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                             <Button variant="outline">
                                Sort by: Rarity <ChevronDown className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                     <TabsContent value="all">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {getTabContent()}
                        </div>
                     </TabsContent>
                     <TabsContent value="earned">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                           {getTabContent()}
                        </div>
                     </TabsContent>
                     <TabsContent value="minted">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {getTabContent()}
                        </div>
                     </TabsContent>
                     <TabsContent value="in-progress">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {getTabContent()}
                        </div>
                     </TabsContent>
                      <TabsContent value="locked">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {getTabContent()}
                        </div>
                     </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
