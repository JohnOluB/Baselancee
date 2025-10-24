
'use client';
import { useState, useEffect, useCallback, createContext, useContext } from 'react';
import {
  connectWallet,
  checkWalletConnection,
  switchToBaseSepolia,
  getNetworkName,
  signAuthMessage
} from '@/utils/wallet';
import { getNonce, loginWithWallet } from '@/lib/api';

const TARGET_CHAIN_ID = '0x14a34'; // Base Sepolia

interface WalletState {
  account: string | null;
  chainId: string | null;
  networkName: string;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  connect: () => Promise<any>;
  disconnect: () => void;
  clearError: () => void;
}

const WalletContext = createContext<WalletState | undefined>(undefined);

export const WalletProvider = ({ children }: { children: React.ReactNode }) => {
  const [account, setAccount] = useState<string | null>(null);
  const [chainId, setChainId] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const clearError = () => setError(null);

  const handleDisconnect = useCallback(() => {
    setAccount(null);
    setChainId(null);
    setIsAuthenticated(false);
    localStorage.removeItem('token');
    setError(null);
  }, []);

  const handleAccountsChanged = useCallback((accounts: string[]) => {
    if (accounts.length === 0) {
      handleDisconnect();
    } else if (accounts[0] !== account) {
      setAccount(accounts[0]);
      setIsAuthenticated(false); // Force re-auth on account change
      localStorage.removeItem('token');
    }
  }, [account, handleDisconnect]);

  const handleChainChanged = useCallback((newChainId: string) => {
    setChainId(newChainId);
    if (newChainId !== TARGET_CHAIN_ID) {
      setIsAuthenticated(false);
      setError(`Please switch to Base Sepolia network.`);
    } else {
      setError(null);
    }
  }, []);

  const connect = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await switchToBaseSepolia();
      const { account, chainId } = await connectWallet();
      setAccount(account);
      setChainId(chainId);

      if (chainId !== TARGET_CHAIN_ID) {
        throw new Error('Please switch your wallet to the Base Sepolia network.');
      }
      
      const { nonce } = await getNonce(account);
      const signature = await signAuthMessage(account, nonce);
      const data = await loginWithWallet(account, signature);

      if (data.token) {
        localStorage.setItem('token', data.token);
        setIsAuthenticated(true);
      } else {
        throw new Error(data.error || 'Authentication failed.');
      }
      setLoading(false);
      return data;
    } catch (err: any) {
      console.error(err);
      setError(err.message);
      setLoading(false);
      handleDisconnect();
    }
  }, [handleDisconnect]);

  const disconnect = useCallback(() => {
    handleDisconnect();
  }, [handleDisconnect]);

  useEffect(() => {
    const checkConnection = async () => {
      setLoading(true);
      if (typeof window.ethereum !== 'undefined') {
        const { account, chainId } = await checkWalletConnection();
        if (account) {
          setAccount(account);
          setChainId(chainId);
          if (localStorage.getItem('token')) {
              setIsAuthenticated(true);
          }
        }
      }
      setLoading(false);
    };
    checkConnection();
  }, []);

  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);

      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      };
    }
  }, [handleAccountsChanged, handleChainChanged]);

  return (
    <WalletContext.Provider
      value={{
        account,
        chainId,
        networkName: getNetworkName(chainId),
        isAuthenticated,
        loading,
        error,
        connect,
        disconnect,
        clearError,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = (): WalletState => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};
