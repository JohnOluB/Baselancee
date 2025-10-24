'use client';

import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { baseSepolia } from 'wagmi/chains';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient();

// TODO: Replace with your actual WalletConnect Project ID
const WALLETCONNECT_PROJECT_ID = 'YOUR_PROJECT_ID_HERE';

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
