// src/components/auth/WalletConnectButton.tsx

import { useState, useEffect } from 'react';
import { connectWallet, checkWalletConnection, formatAddress, getNetworkName } from '../../utils/wallet';

export default function WalletConnectButton({ onConnect }) {
  const [account, setAccount] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if already connected
    checkConnection();

    // Listen for account changes
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', () => window.location.reload());
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      }
    };
  }, []);

  const checkConnection = async () => {
    const result = await checkWalletConnection();
    if (result) {
      setAccount(result.account);
      setChainId(result.chainId);
    }
  };

  const handleAccountsChanged = (accounts) => {
    if (accounts.length === 0) {
      setAccount(null);
      setChainId(null);
    } else {
      setAccount(accounts[0]);
    }
  };

  const handleConnect = async () => {
    setLoading(true);
    setError('');

    try {
      const { account, chainId } = await connectWallet();
      setAccount(account);
      setChainId(chainId);
      
      // Call parent callback if provided
      if (onConnect) {
        onConnect({ account, chainId });
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDisconnect = () => {
    setAccount(null);
    setChainId(null);
    setError('');
  };

  if (account) {
    return (
      <div className="space-y-3">
        <div className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg">
          <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <div className="flex-1">
            <p className="text-sm font-semibold text-green-900">Wallet Connected</p>
            <p className="text-sm text-green-700">{formatAddress(account)}</p>
            {chainId && (
              <p className="text-xs text-green-600 mt-1">
                Network: {getNetworkName(chainId)}
              </p>
            )}
          </div>
        </div>
        
        <button
          onClick={handleDisconnect}
          className="w-full py-2 px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <button
        onClick={handleConnect}
        disabled={loading}
        variant="outline"
        className="w-full flex items-center justify-center gap-3 py-3 px-4 border-2 border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
        {loading ? 'Connecting...' : 'Login with Wallet'}
      </button>

      {error && (
        <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
          <svg className="w-5 h-5 text-red-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}
    </div>
  );
}