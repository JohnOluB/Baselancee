"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, Wallet } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import Logo from '@/components/logo';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const navLinks = [
  { href: '#how-it-works', label: 'How It Works' },
  { href: '#for-freelancers', label: 'Freelancers' },
  { href: '#for-clients', label: 'Clients' },
  { href: '#pricing', label: 'Pricing' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const headerClasses = cn(
    'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
    isScrolled ? 'bg-background shadow-md' : 'bg-transparent'
  );

  const linkClasses = cn(
    'transition-colors font-medium text-sm',
    isScrolled ? 'text-foreground hover:text-primary' : 'text-primary-foreground hover:opacity-80'
  );

  return (
    <header className={headerClasses}>
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <Link href="/">
          <Logo className={cn(isScrolled ? "text-foreground" : "text-primary-foreground")} />
        </Link>
        <nav className="hidden items-center gap-[30px] md:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className={linkClasses}>
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <Button variant="ghost" className={linkClasses}>sIGN IN</Button>
          <Button>Get Started</Button>
        </div>
        <div className="md:hidden">
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className={cn(isScrolled ? "text-foreground" : "text-primary-foreground", "hover:bg-black/10")}>
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-background">
              <div className="flex flex-col gap-8 pt-12">
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href} className="text-xl font-medium text-foreground hover:text-primary" onClick={() => setIsMenuOpen(false)}>
                    {link.label}
                  </Link>
                ))}
                <div className="flex flex-col gap-4">
                  <Button variant="outline">Sign In</Button>
                  <Button>Get Started</Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
