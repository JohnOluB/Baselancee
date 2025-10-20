
'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Wallet } from 'lucide-react';
import Image from 'next/image';

const walletOptions = [
  { name: 'MetaMask', icon: '/metamask.svg' },
  { name: 'Coinbase Wallet', icon: '/coinbase.svg' },
  { name: 'WalletConnect', icon: '/walletconnect.svg' },
];

export function ConnectWalletModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Wallet className="mr-2 h-4 w-4" />
          Connect Wallet
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Connect a Wallet</DialogTitle>
          <DialogDescription>
            Choose your wallet from the options below to sign in.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {walletOptions.map((wallet) => (
            <Button key={wallet.name} variant="outline" className="justify-start text-base py-6">
              <Image src={wallet.icon} alt={`${wallet.name} logo`} width={24} height={24} className="mr-4" />
              {wallet.name}
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
