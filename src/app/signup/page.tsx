
import Link from 'next/link';
import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Logo from '@/components/logo';
import { Laptop, Briefcase } from 'lucide-react';

export default function ChooseRolePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 sm:p-6 md:p-8">
      <div className="absolute top-4 left-4 md:top-6 md:left-6">
        <Logo />
      </div>
      <div className="w-full max-w-4xl text-center">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Welcome to BaseLance</h1>
        <p className="mt-3 text-lg text-muted-foreground">How do you want to get started?</p>

        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
          <Card className="group flex flex-col text-center p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-glow focus-within:shadow-glow">
            <div className="flex-grow">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary mb-6">
                    <Laptop className="h-8 w-8" />
                </div>
                <CardTitle className="text-2xl mb-2">I&apos;m a Freelancer</CardTitle>
                <CardDescription className="text-base">
                    Find jobs and get paid for your skills
                </CardDescription>
            </div>
            <Button asChild size="lg" className="mt-8 w-full">
              <Link href="/signup/freelancer">Sign Up as Freelancer</Link>
            </Button>
          </Card>
          <Card className="group flex flex-col text-center p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_20px_hsl(var(--accent))] focus-within:shadow-[0_0_20px_hsl(var(--accent))]">
             <div className="flex-grow">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 text-accent mb-6">
                    <Briefcase className="h-8 w-8" />
                </div>
                <CardTitle className="text-2xl mb-2">I&apos;m a Client</CardTitle>
                <CardDescription className="text-base">
                    Hire talent for your projects
                </CardDescription>
            </div>
            <Button asChild size="lg" className="mt-8 w-full bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href="/signup/client">Sign Up as Client</Link>
            </Button>
          </Card>
        </div>

        <div className="mt-10 text-center text-sm">
            <p className="text-muted-foreground">
                Already have an account?{' '}
                <Link href="/login" className="font-medium text-primary hover:underline underline-offset-4">
                    Sign In
                </Link>
            </p>
        </div>
      </div>
    </div>
  );
}
