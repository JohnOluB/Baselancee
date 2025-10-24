'use client';

import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { baseSepolia } from 'wagmi/chains';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient();

const WALLETCONNECT_PROJECT_ID = 'd16d3373a6e9603f74e6ca37b868de5b';

const config = getDefaultConfig({
  appName: 'BaseLance',
  projectId: WALLETCONNECT_PROJECT_ID,
  chains: [baseSepolia],
  ssr: true, 
});

export const Web3Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
