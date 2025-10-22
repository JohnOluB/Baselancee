
'use client';
import { Search, Bell, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSidebar } from '@/components/ui/sidebar';

export default function DashboardHeader() {
    const { toggleSidebar } = useSidebar();
  return (
    <header className="sticky top-0 z-10 flex h-[60px] items-center gap-4 border-b bg-background px-6">
      <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleSidebar}>
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle sidebar</span>
      </Button>
      <div className="flex-1">
        {/* We can add breadcrumbs or page title here later */}
      </div>
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search..." className="w-full md:w-[200px] lg:w-[300px] pl-9" />
        </div>
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
        </Button>
        {/* Wallet address and user menu will go here */}
      </div>
    </header>
  );
}
