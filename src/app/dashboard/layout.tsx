
import { SidebarProvider } from '@/components/ui/sidebar';
import DashboardHeader from '@/components/dashboard/header';
import DashboardSidebar from '@/components/dashboard/sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <DashboardSidebar />
        <main className="flex-1 flex flex-col bg-muted/30">
          <DashboardHeader />
          <div className="flex-1 p-4 sm:p-6 md:p-8 ml-3">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
