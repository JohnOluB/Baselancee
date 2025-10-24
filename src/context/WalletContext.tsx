import React, { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';

const WalletContext = createContext();

const API_BASE_URL = 'http://localhost:5000/api';
const BASE_SEPOLIA_CHAIN_ID = '0x14a34'; // 84532 in hex

export function WalletProvider({ children }) {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);
  const [chainId, setChainId] = useState(null);

  useEffect(() => {
    checkIfWalletConnected();
    setupEventListeners();
    
    return () => {
      removeEventListeners();
    };
  }, []);

  const setupEventListeners = () => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);
    }
  };

  const removeEventListeners = () => {
    if (window.ethereum) {
      window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      window.ethereum.removeListener('chainChanged', handleChainChanged);
    }
  };

  const checkIfWalletConnected = async () => {
    try {
      if (!window.ethereum) return;

      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      const currentChainId = await window.ethereum.request({ method: 'eth_chainId' });
      
      setChainId(currentChainId);

      if (accounts.length > 0) {
        const ethersProvider = new ethers.BrowserProvider(window.ethereum);
        const ethersSigner = await ethersProvider.getSigner();
        
        setAccount(accounts[0]);
        setProvider(ethersProvider);
        setSigner(ethersSigner);
        
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
          setToken(storedToken);
        }
      }
    } catch (error) {
      console.error('Error checking wallet connection:', error);
    }
  };

  const handleAccountsChanged = (accounts) => {
    if (accounts.length === 0) {
      disconnectWallet();
    } else {
      setAccount(accounts[0]);
      setToken(null);
      localStorage.removeItem('token');
    }
  };

  const handleChainChanged = (newChainId) => {
    setChainId(newChainId);
    window.location.reload();
  };

  const switchToBaseSepolia = async () => {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: BASE_SEPOLIA_CHAIN_ID }],
      });
      setChainId(BASE_SEPOLIA_CHAIN_ID);
    } catch (error) {
      if (error.code === 4902) {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [{
            chainId: BASE_SEPOLIA_CHAIN_ID,
            chainName: 'Base Sepolia',
            nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
            rpcUrls: ['https://sepolia.base.org'],
            blockExplorerUrls: ['https://sepolia.basescan.org']
          }]
        });
        setChainId(BASE_SEPOLIA_CHAIN_ID);
      } else {
        throw error;
      }
    }
  };

  const authenticateWithBackend = async (walletAddress, walletSigner) => {
    try {
      // 1. Get nonce
      const nonceRes = await fetch(`${API_BASE_URL}/auth/nonce/${walletAddress}`);
      if (!nonceRes.ok) throw new Error('Failed to get nonce');
      const { nonce } = await nonceRes.json();

      // 2. Sign message
      const message = `Sign this message to authenticate: ${nonce}`;
      const signature = await walletSigner.signMessage(message);

      // 3. Login
      const loginRes = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ walletAddress, signature })
      });

      if (!loginRes.ok) throw new Error('Authentication failed');
      const { token: authToken } = await loginRes.json();

      localStorage.setItem('token', authToken);
      setToken(authToken);

      return authToken;
    } catch (error) {
      throw new Error(`Authentication failed: ${error.message}`);
    }
  };

  const connectWallet = async () => {
    setIsConnecting(true);
    setError(null);

    try {
      if (!window.ethereum) {
        throw new Error('MetaMask is not installed. Please install MetaMask to continue.');
      }

      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const walletAddress = accounts[0];

      const ethersProvider = new ethers.BrowserProvider(window.ethereum);
      const ethersSigner = await ethersProvider.getSigner();

      setAccount(walletAddress);
      setProvider(ethersProvider);
      setSigner(ethersSigner);

      await switchToBaseSepolia();
      await authenticateWithBackend(walletAddress, ethersSigner);

      return walletAddress;
    } catch (error) {
      setError(error.message);
      setAccount(null);
      setProvider(null);
      setSigner(null);
      setToken(null);
      throw error;
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    setProvider(null);
    setSigner(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  const isCorrectNetwork = () => {
    return chainId === BASE_SEPOLIA_CHAIN_ID;
  };

  // Create the value object
  const value = {
    account,
    provider,
    signer,
    token,
    chainId,
    isConnecting,
    error,
    isConnected: !!account,
    isAuthenticated: !!token,
    isCorrectNetwork: isCorrectNetwork(),
    connectWallet,
    disconnectWallet,
    switchToBaseSepolia
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
}

// Custom hook to use wallet context
export function useWallet() {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}