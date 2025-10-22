'use client';

import PrivyProviderWrapper from './privy-provider-wrapper';

export function Providers({children}: {children: React.ReactNode}) {
  return <PrivyProviderWrapper>{children}</PrivyProviderWrapper>;
}
