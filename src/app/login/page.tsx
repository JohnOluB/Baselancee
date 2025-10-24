
'use client';
import {useRouter} from 'next/navigation';
import Logo from '@/components/logo';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import WalletConnectButton from '@/components/auth/WalletConnectButton';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = async () => {
    // This is for the email/password demo login
    const user = {
      name: 'John Doe',
      roles: ['freelancer', 'client']
    };

    if (user.roles.length > 1) {
      sessionStorage.setItem('pendingUser', JSON.stringify(user));
      router.push('/select-role');
    } else {
      // Default to client for demo purposes
      router.push('/dashboard/client');
    }
  };

  const handleWalletConnect = (data: any) => {
    // This function is called by WalletConnectButton on successful authentication
    if (data && data.user) {
        const roles = data.user.roles || []; // Default to empty array if no roles
        
        if (roles.length > 1) {
          sessionStorage.setItem('pendingUser', JSON.stringify(data.user));
          router.push('/select-role');
        } else if (roles.includes('freelancer')) {
          router.push('/dashboard/freelancer');
        } else {
          // Default to client dashboard if role is 'client' or if no roles are specified
          router.push('/dashboard/client');
        }
    } else {
       // Error is handled within the useWallet hook and displayed by WalletConnectButton
       console.error('Authentication failed or user data is missing from onConnect callback.');
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="absolute top-4 left-4">
        <Link href="/">
          <Logo />
        </Link>
      </div>
      <Card className="mx-auto max-w-sm w-full">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Connect your wallet to sign in securely.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <WalletConnectButton onConnect={handleWalletConnect} />
            <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-muted"></div>
                <span className="flex-shrink mx-4 text-xs text-muted-foreground">OR</span>
                <div className="flex-grow border-t border-muted"></div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link href="#" className="ml-auto inline-block text-sm underline">
                  Forgot your password?
                </Link>
              </div>
              <Input id="password" type="password" required />
            </div>
            <Button onClick={handleLogin} className="w-full">
              Login with Email
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
