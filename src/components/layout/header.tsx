"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import { usePrivy } from '@privy-io/react-auth';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import Logo from '@/components/logo';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const navLinks = [
  { href: '#find-work', label: 'Find Work' },
  { href: '#find-talent', label: 'Find Talent' },
  { href: '#why-baselance', label: 'Why BaseLance?' },
  { href: '#enterprise', label: 'Enterprise' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { ready, authenticated, login, logout } = usePrivy();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const headerClasses = cn(
    'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
    isScrolled ? 'bg-background shadow-md' : 'bg-background'
  );

  const linkClasses = cn(
    'transition-colors font-medium text-sm',
    'text-foreground hover:text-primary'
  );

  return (
    <header className={headerClasses}>
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <div className="flex items-center gap-10">
          <Link href="/">
            <Logo className="text-foreground" />
          </Link>
        </div>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className={linkClasses}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          {!authenticated ? (
            <>
              <Button variant="ghost" onClick={login} className={linkClasses} disabled={!ready}>
                Log In
              </Button>
              <Button onClick={login} disabled={!ready}>
                Sign Up
              </Button>
            </>
          ) : (
            <Button onClick={logout} disabled={!ready}>
              Log Out
            </Button>
          )}
        </div>

        <div className="md:hidden">
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-foreground hover:bg-black/10">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-background">
              <div className="flex flex-col gap-8 pt-12">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-xl font-medium text-foreground hover:text-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="flex flex-col gap-4">
                  {!authenticated ? (
                    <>
                      <Button variant="outline" className="w-full" onClick={login} disabled={!ready}>
                        Log In
                      </Button>
                      <Button className="w-full" onClick={login} disabled={!ready}>
                        Sign Up
                      </Button>
                    </>
                  ) : (
                    <Button className="w-full" onClick={logout} disabled={!ready}>
                      Log Out
                    </Button>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
