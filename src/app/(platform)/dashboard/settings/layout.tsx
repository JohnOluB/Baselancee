
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  User,
  Shield,
  CreditCard,
  Bell,
  Globe,
  Settings,
  ShieldCheck,
  LifeBuoy,
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const settingsNav = [
  { href: '/dashboard/settings', label: 'Profile Settings', icon: User },
  { href: '/dashboard/settings/account', label: 'Account & Security', icon: Shield },
  { href: '/dashboard/settings/payment', label: 'Payment Methods', icon: CreditCard },
  { href: '/dashboard/settings/notifications', label: 'Notifications', icon: Bell },
  { href: '/dashboard/settings/language', label: 'Language & Region', icon: Globe },
  { href: '/dashboard/settings/preferences', label: 'Preferences', icon: Settings },
  { href: '/dashboard/settings/privacy', label: 'Privacy', icon: ShieldCheck },
  { href: '/dashboard/settings/support', label: 'Help & Support', icon: LifeBuoy },
];

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8">
      <aside className="md:col-span-1">
        <nav className="flex flex-col space-y-1">
          {settingsNav.map((item) => (
            <Button
              key={item.href}
              asChild
              variant={pathname === item.href ? 'secondary' : 'ghost'}
              className="justify-start"
            >
              <Link href={item.href}>
                <item.icon className="mr-2 h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            </Button>
          ))}
        </nav>
      </aside>
      <div className="md:col-span-3 lg:col-span-4">{children}</div>
    </div>
  );
}
