'use client';
import {PrivyProvider} from '@privy-io/react-auth';
import {
  base,
  arbitrum,
  mainnet,
  optimism,
  polygon,
} from '@privy-io/react-auth';

export default function PrivyProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || ''}
      config={{
        loginMethods: ['email', 'wallet'],
        embeddedWallets: {
          createOnLogin: 'users-without-wallets',
        },
        appearance: {
          theme: 'light',
          accentColor: '#0052FF',
          logo: '/logo.svg',
        },
        supportedChains: [mainnet, polygon, arbitrum, optimism, base],
        defaultChain: mainnet,
      }}
    >
      {children}
    </PrivyProvider>
  );
}
