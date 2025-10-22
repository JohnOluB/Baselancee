'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, FileText, Briefcase, BarChart2, Star, MessageSquare, Settings, Wallet, LifeBuoy, Users } from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';

const freelanceLinks = [
  { href: '/dashboard/freelancer', label: 'Dashboard', icon: Home },
  { href: '/dashboard/freelancer/jobs', label: 'Browse Jobs', icon: Search },
  { href: '/dashboard/freelancer/proposals', label: 'My Proposals', icon: FileText },
  { href: '/dashboard/freelancer/active', label: 'Active Jobs', icon: Briefcase },
  { href: '/dashboard/freelancer/earnings', label: 'Earnings', icon: BarChart2 },
  { href: '/dashboard/freelancer/reviews', label: 'Reviews', icon: Star },
  { href: '/dashboard/freelancer/messages', label: 'Messages', icon: MessageSquare, badge: '3' },
];

const clientLinks = [
    { href: '/dashboard/client', label: 'Dashboard', icon: Home },
    { href: '/dashboard/client/freelancers', label: 'Browse Freelancers', icon: Users },
    { href: '/dashboard/client/jobs', label: 'My Jobs', icon: Briefcase },
    { href: '/dashboard/client/messages', label: 'Messages', icon: MessageSquare, badge: '1' },
]

const bottomLinks = [
    { href: '/dashboard/settings', label: 'Settings', icon: Settings },
]

export default function DashboardSidebar() {
  const pathname = usePathname();
  const isFreelancer = pathname.includes('/freelancer');
  const isClient = pathname.includes('/client');

  // Determine navLinks based on role
  const navLinks = isClient ? clientLinks : freelanceLinks;


  return (
    <Sidebar>
      <SidebarHeader>
        
      </SidebarHeader>
      <SidebarContent className="p-2">
        <div className='mb-4 p-2'>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-3 w-full text-left p-2 rounded-lg hover:bg-muted transition-colors">
                        <Avatar className="h-9 w-9">
                            <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="User" />
                            <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <div className='flex flex-col'>
                            <span className="text-sm font-medium">John Doe</span>
                            <span className="text-xs text-muted-foreground truncate">0x123...456</span>
                        </div>
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild><Link href="/dashboard/freelancer/profile">View Profile</Link></DropdownMenuItem>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild><Link href="/">Sign Out</Link></DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
        <SidebarMenu>
          {navLinks.map((link) => (
            <SidebarMenuItem key={link.href}>
              <Link href={link.href} passHref>
                <SidebarMenuButton
                  isActive={pathname.startsWith(link.href) && (link.href.split('/').length === pathname.split('/').length || link.href.endsWith(pathname.split('/').pop()!))}
                  tooltip={link.label}
                >
                  <link.icon />
                  <span>{link.label}</span>
                  {link.badge && <span className="ml-auto bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">{link.badge}</span>}
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4 space-y-4">
        <Card className="bg-primary/5 border-primary/20">
            <CardHeader className="p-4">
                <div className="flex items-center gap-2">
                    <Wallet className="h-5 w-5 text-primary" />
                    <CardTitle className="text-sm font-medium">USDC Balance</CardTitle>
                </div>
            </CardHeader>
            <CardContent className="p-4 pt-0">
                <div className="text-xl font-bold">1,234.56 USDC</div>
                <Button size="sm" className="w-full mt-2">Withdraw</Button>
            </CardContent>
        </Card>
        <Button variant="ghost" className="w-full justify-start gap-2">
            <LifeBuoy className="h-5 w-5" />
            <span>Help & Support</span>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
