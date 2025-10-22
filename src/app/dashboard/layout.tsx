
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
          <div className="flex-1 py-4 sm:py-6 md:py-8 ml-3">
            <div className="container mx-auto">
              {children}
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
