
// src/components/auth/WalletConnectButton.tsx

import { useState } from 'react';
import { 
  connectWallet, 
  formatAddress, 
  getNetworkName,
  signAuthMessage 
} from '../../utils/wallet';
import { Button } from '@/components/ui/button';
import { Wallet } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { CheckCircle } from 'lucide-react';

export default function WalletConnectButton({ onConnect }) {
  const [account, setAccount] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [signingMessage, setSigningMessage] = useState(false);

  const handleConnect = async () => {
    setLoading(true);
    setSigningMessage(false);
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
    }  catch (err) {
      console.error('Wallet connection error:', err);
      
      // Clear account state on error
      setAccount(null);
      setChainId(null);
      
      // User-friendly error messages
      if (err.message.includes('User rejected') || err.message.includes('User denied')) {
        setError('Connection cancelled. Please approve the wallet connection to continue.');
      } else if (err.message.includes('install MetaMask')) {
        setError('Please install MetaMask or another Web3 wallet to continue.');
      } else if (err.message.includes('signature request')) {
        setError('Signature cancelled. You need to sign the message to verify your wallet.');
      } else {
        setError(err.message || 'Failed to connect wallet. Please try again.');
      }
    } finally {
      setLoading(false);
      setSigningMessage(false);
    }
  };

  const handleDisconnect = () => {
    setAccount(null);
    setChainId(null);
    setError('');
  };

  const dismissError = () => {
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
        <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
          <svg className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div className="flex-1">
            <p className="text-sm text-red-800">{error}</p>
          </div>
          <button 
            onClick={dismissError}
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
            You'll be asked to sign a message to verify your wallet. This is <strong>free</strong> and doesn't cost any gas fees.
          </p>
        </div>
      )}
    </div>
  );
}
