'use client';
import {useEffect} from 'react';
import {useRouter} from 'next/navigation';
import {usePrivy} from '@privy-io/react-auth';
import Logo from '@/components/logo';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';

export default function LoginPage() {
  const router = useRouter();
  const {
    ready,
    authenticated,
    login,
  } = usePrivy();

  useEffect(() => {
    if (ready && authenticated) {
      // TODO: Check user role and redirect accordingly
      // For now, default to freelancer dashboard
      router.push('/dashboard/freelancer');
    }
  }, [ready, authenticated, router]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="absolute top-4 left-4">
        <Logo />
      </div>
      <Card className="mx-auto max-w-sm w-full">
        <CardHeader>
          <CardTitle className="text-2xl">Login or Sign Up</CardTitle>
          <CardDescription>
            Connect your wallet or enter your email to continue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <Button onClick={login} className="w-full" disabled={!ready}>
              Login with Privy
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
