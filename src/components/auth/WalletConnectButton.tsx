
'use client';
import { useState, useEffect } from 'react';
import { useWallet } from '@/hooks/use-wallet';
import { Button } from '@/components/ui/button';
import { Wallet, CheckCircle, Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { formatAddress } from '@/utils/wallet';

export default function WalletConnectButton({ onConnect }: { onConnect: (data: any) => void }) {
  const { 
    account, 
    chainId,
    networkName,
    isAuthenticated,
    loading,
    error,
    connect, 
    disconnect,
    clearError
  } = useWallet();

  const handleConnect = async () => {
    const data = await connect();
    if (data && data.token && onConnect) {
      onConnect(data);
    }
  }

  if (account && isAuthenticated) {
    return (
      <div className="space-y-3">
        <Alert variant="default" className="bg-green-50 border-green-200 text-green-800">
           <CheckCircle className="h-4 w-4" style={{ color: 'hsl(var(--success-green))' }} />
           <AlertTitle className="text-green-900 font-semibold">
            Wallet Authenticated
           </AlertTitle>
           <AlertDescription>
                {formatAddress(account)} on {networkName}
           </AlertDescription>
        </Alert>
        
        <Button
          onClick={disconnect}
          variant="outline"
          className="w-full"
        >
          Disconnect Wallet
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <Button
        onClick={handleConnect}
        disabled={loading}
        className="w-full"
        size="lg"
      >
        {loading ? (
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
        ) : (
            <Wallet className="mr-2 h-5 w-5"/>
        )}
        {loading ? 'Connecting...' : 'Connect Wallet'}
      </Button>

      {error && (
        <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
          <svg className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div className="flex-1">
            <p className="text-sm text-red-800">{error}</p>
          </div>
          <button 
            onClick={clearError}
            className="text-red-600 hover:text-red-800"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
      {!error && (
        <div className="flex items-start gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <svg className="w-5 h-5 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-xs text-blue-800">
            You'll be asked to connect your wallet and sign a message to authenticate. This is <strong>free</strong> and doesn't cost any gas fees.
          </p>
        </div>
      )}
    </div>
  );
}
