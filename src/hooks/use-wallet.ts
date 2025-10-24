
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

  const checkInitialConnection = useCallback(async () => {
    if (typeof window.ethereum === 'undefined') {
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const { account: initialAccount, chainId: initialChainId } = await checkWalletConnection();
      setChainId(initialChainId);

      if (initialAccount) {
        setAccount(initialAccount);
        if (initialChainId === TARGET_CHAIN_ID) {
          const token = localStorage.getItem('token');
          if (token) {
            // TODO: Add token validation with backend
            setIsAuthenticated(true);
          } else {
            setIsAuthenticated(false);
          }
        } else {
          setError('Please switch to Base Sepolia network.');
          setIsAuthenticated(false);
          localStorage.removeItem('token');
        }
      }
    } catch (err) {
      console.error("Error checking initial connection:", err);
      setError("Failed to check wallet connection.");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleAccountsChanged = useCallback((accounts: string[]) => {
    if (accounts.length === 0) {
      handleDisconnect();
    } else if (accounts[0] !== account) {
      setAccount(accounts[0]);
      setIsAuthenticated(false);
      localStorage.removeItem('token');
      // No need to set error, just requires re-authentication
    }
  }, [account, handleDisconnect]);

  const handleChainChanged = useCallback(() => {
    // Reloading the page is the simplest way to reset state and re-check connection
    window.location.reload();
  }, []);

  const connect = useCallback(async () => {
    if (typeof window.ethereum === 'undefined') {
      setError('Please install MetaMask or another Web3 wallet.');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      // Switch to the correct network first
      await switchToBaseSepolia();
      
      // Request accounts
      const { account: connectedAccount, chainId: connectedChainId } = await connectWalletUtil();
      setAccount(connectedAccount);
      setChainId(connectedChainId);

      // Authenticate with the backend
      const { nonce } = await getNonce(connectedAccount);
      const signature = await signAuthMessage(connectedAccount, nonce);
      const data = await loginWithWallet(connectedAccount, signature);

      if (data.token) {
        localStorage.setItem('token', data.token);
        setIsAuthenticated(true);
        setLoading(false);
        return data; // Return the full data object { token, user }
      } else {
        throw new Error(data.error || 'Authentication failed.');
      }
    } catch (err: any) {
      console.error('Connection or authentication error:', err);
      setError(err.message || 'An unknown error occurred during connection.');
      handleDisconnect(); // Reset state on error
      return { error: err.message || 'An unknown error occurred.' };
    } finally {
      setLoading(false);
    }
  }, [handleDisconnect]);

  const disconnect = useCallback(() => {
    handleDisconnect();
  }, [handleDisconnect]);

  useEffect(() => {
    checkInitialConnection();
  }, [checkInitialConnection]);

  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      const eth = window.ethereum;
      eth.on('accountsChanged', handleAccountsChanged);
      eth.on('chainChanged', handleChainChanged);

      return () => {
        eth.removeListener('accountsChanged', handleAccountsChanged);
        eth.removeListener('chainChanged', handleChainChanged);
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
