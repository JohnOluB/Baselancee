
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
    // For this demo, we'll simulate a user with both roles.
    const user = {
      name: 'John Doe',
      roles: ['freelancer', 'client']
    };

    if (user.roles.length > 1) {
      sessionStorage.setItem('pendingUser', JSON.stringify(user));
      router.push('/select-role');
    } else {
      router.push('/dashboard/client');
    }
  };

  const handleWalletConnect = async (data) => {
    try {
      if (data && data.token) {
        localStorage.setItem('token', data.token);
        const user = data.user || {};
        
        const roles = user.roles || ['client', 'freelancer'];
        
        if (roles.length > 1) {
          sessionStorage.setItem('pendingUser', JSON.stringify(user));
          router.push('/select-role');
        } else if (roles.includes('freelancer')) {
          router.push('/dashboard/freelancer');
        } else {
          router.push('/dashboard/client');
        }

      } else {
        alert(data.error || 'Authentication failed');
      }
    } catch (error) {
      console.error('Authentication failed:', error);
      alert('Failed to authenticate. Please try again.');
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
            Connect your wallet or enter your email to login.
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
              Login
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
