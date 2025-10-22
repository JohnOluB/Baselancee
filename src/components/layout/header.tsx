"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, LogOut, Wallet, UserCircle } from 'lucide-react';
import { usePrivy } from '@privy-io/react-auth';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import Logo from '@/components/logo';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

const navLinks = [
  { href: '#find-work', label: 'Find Work' },
  { href: '#find-talent', label: 'Find Talent' },
  { href: '#why-baselance', label: 'Why BaseLance?' },
  { href: '#enterprise', label: 'Enterprise' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { ready, authenticated, user, login, logout } = usePrivy();

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

  const wallet = user?.wallet;
  const shortAddress = wallet?.address ? `${wallet.address.slice(0, 6)}...${wallet.address.slice(-4)}` : '';


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
            {ready && (
              authenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2">
                       <Avatar className="h-6 w-6">
                        <AvatarImage src={user?.wallet?.walletClientType === 'privy' ? '/privy-logo.png' : user?.wallet?.walletClientType==='metamask' ? '/metamask-logo.svg' : '/coinbase-wallet-logo.png'} />
                        <AvatarFallback><UserCircle className="h-5 w-5"/></AvatarFallback>
                      </Avatar>
                      <span>{shortAddress}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <UserCircle className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Wallet className="mr-2 h-4 w-4" />
                      <span>Wallet</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Button variant="ghost" className={linkClasses} onClick={login}>
                    Log In
                  </Button>
                  <Button onClick={login}>
                    Sign Up
                  </Button>
                </>
              )
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
                  {ready && (
                    authenticated ? (
                      <Button variant="outline" className="w-full" onClick={logout}>Log Out</Button>
                    ) : (
                      <>
                        <Button variant="outline" className="w-full" onClick={login}>
                          Log In
                        </Button>
                        <Button className="w-full" onClick={login}>
                          Sign Up
                        </Button>
                      </>
                    )
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
