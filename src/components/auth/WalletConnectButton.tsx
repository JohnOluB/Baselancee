
// src/components/auth/WalletConnectButton.tsx

import { useState, useEffect } from 'react';
import { 
  connectWallet, 
  checkWalletConnection, 
  formatAddress, 
  getNetworkName,
  signAuthMessage 
} from '../../utils/wallet';
import { Button } from '@/components/ui/button';
import { Wallet } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { CheckCircle, AlertCircle } from 'lucide-react';

export default function WalletConnectButton({ onConnect }) {
  const [account, setAccount] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [signingMessage, setSigningMessage] = useState(false);

  const handleConnect = async () => {
    setLoading(true);
    setError('');

    try {
      // Step 1: Connect wallet
      const { account, chainId } = await connectWallet();
      setAccount(account);
      setChainId(chainId);
      
      // Step 2: Get nonce from backend for signature
      setSigningMessage(true);
      const nonceResponse = await fetch('/api/auth/get-nonce', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ walletAddress: account })
      });
      
      if (!nonceResponse.ok) {
        const errorData = await nonceResponse.json();
        throw new Error(errorData.error || 'Failed to get nonce from server.');
      }
      
      const { nonce } = await nonceResponse.json();
      
      // Step 3: Sign message to prove wallet ownership
      const signature = await signAuthMessage(account, nonce);
      
      // Step 4: Send to backend for authentication
      if (onConnect) {
        await onConnect({ 
          account, 
          chainId, 
          signature, 
          nonce 
        });
      }
    } catch (err) {
      setError(err.message);
      setAccount(null);
      setChainId(null);
    } finally {
      setLoading(false);
      setSigningMessage(false);
    }
  };

  const handleDisconnect = () => {
    // We can't programmatically disconnect, but we can clear our state
    setAccount(null);
    setChainId(null);
    setError('');
  };

  if (account && !signingMessage) {
    return (
      <div className="space-y-3">
        <Alert variant="default" className="bg-green-50 border-green-200 text-green-800">
           <CheckCircle className="h-4 w-4 !text-green-600" />
           <AlertTitle className="text-green-900 font-semibold">Wallet Connected</AlertTitle>
           <AlertDescription>
                {formatAddress(account)} on {getNetworkName(chainId)}
           </AlertDescription>
        </Alert>
        
        <Button
          onClick={handleDisconnect}
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
        disabled={loading || signingMessage}
        className="w-full"
        size="lg"
        variant="outline"
      >
        <Wallet className="mr-2 h-5 w-5"/>
        {signingMessage ? 'Please sign message...' : loading ? 'Connecting...' : 'Login with Wallet'}
      </Button>

      {error && (
        <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Connection Failed</AlertTitle>
            <AlertDescription>
                {error}
            </AlertDescription>
        </Alert>
      )}

      <div className="text-xs text-muted-foreground text-center px-4">
        You'll be asked to sign a message to verify ownership. This is free and does not cost gas.
      </div>
    </div>
  );
}
