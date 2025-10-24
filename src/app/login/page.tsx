
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

  const handleLogin = () => {
    // For now, just redirect to the client dashboard
    router.push('/dashboard/client');
  };

  const handleWalletConnect = async ({ account, chainId }: { account: string; chainId: string }) => {
    // Send wallet address to your backend
    try {
      const response = await fetch('/api/auth/wallet-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ walletAddress: account, chainId })
      });
      
      if (response.ok) {
        // Redirect to dashboard or profile setup
        router.push('/dashboard/client');
      } else {
        console.error('Authentication failed:', await response.json());
      }
    } catch (error) {
      console.error('Authentication failed:', error);
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
