
'use client';
import { useState, useEffect, useCallback, createContext, useContext } from 'react';
import {
  connectWallet as connectWalletUtil,
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
    setLoading(false);
  }, []);

  const handleAccountsChanged = useCallback((accounts: string[]) => {
    if (accounts.length === 0) {
      handleDisconnect();
    } else if (accounts[0] !== account) {
      setAccount(accounts[0]);
      setIsAuthenticated(false);
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
    if (typeof window.ethereum === 'undefined') {
      setError('Please install MetaMask or another Web3 wallet.');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      await switchToBaseSepolia();
      const { account: connectedAccount, chainId: connectedChainId } = await connectWalletUtil();
      setAccount(connectedAccount);
      setChainId(connectedChainId);

      if (connectedChainId !== TARGET_CHAIN_ID) {
        throw new Error('Please switch your wallet to the Base Sepolia network.');
      }
      
      const { nonce } = await getNonce(connectedAccount);
      const signature = await signAuthMessage(connectedAccount, nonce);
      const data = await loginWithWallet(connectedAccount, signature);

      if (data.token) {
        localStorage.setItem('token', data.token);
        setIsAuthenticated(true);
        setLoading(false);
        return data;
      } else {
        throw new Error(data.error || 'Authentication failed.');
      }
    } catch (err: any) {
      console.error('Connection or authentication error:', err);
      setError(err.message || 'An unknown error occurred.');
      setLoading(false);
      handleDisconnect();
    }
  }, [handleDisconnect]);

  const disconnect = useCallback(() => {
    handleDisconnect();
  }, [handleDisconnect]);

  useEffect(() => {
    const checkInitialConnection = async () => {
      if (typeof window.ethereum !== 'undefined') {
        try {
          const { account: initialAccount, chainId: initialChainId } = await checkWalletConnection();
          if (initialAccount) {
            setAccount(initialAccount);
            setChainId(initialChainId);
            if (localStorage.getItem('token')) {
                setIsAuthenticated(true);
            }
             if (initialChainId !== TARGET_CHAIN_ID) {
              setError(`Please switch to Base Sepolia network.`);
            }
          }
        } catch (err) {
          console.error("Error checking initial connection:", err);
        }
      }
      setLoading(false);
    };
    checkInitialConnection();
  }, []);

  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);

      return () => {
        if (window.ethereum.removeListener) {
            window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
            window.ethereum.removeListener('chainChanged', handleChainChanged);
        }
      };
    }
  }, [handleAccountsChanged, handleChainChanged]);

  const value: WalletState = {
    account,
    chainId,
    networkName: getNetworkName(chainId),
    isAuthenticated,
    loading,
    error,
    connect,
    disconnect,
    clearError,
  };

  return (
    <WalletContext.Provider value={value}>
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
