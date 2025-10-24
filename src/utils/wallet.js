// src/utils/wallet.js

export const connectWallet = async () => {
    if (typeof window.ethereum === 'undefined') {
      throw new Error('Please install MetaMask or another Web3 wallet');
    }
  
    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });
  
      const chainId = await window.ethereum.request({ 
        method: 'eth_chainId' 
      });
  
      return {
        account: accounts[0],
        chainId
      };
    } catch (error) {
      if (error.code === 4001) {
        throw new Error('Connection rejected by user');
      }
      throw new Error('Failed to connect wallet');
    }
  };
  
  export const checkWalletConnection = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ 
          method: 'eth_accounts' 
        });
        if (accounts.length > 0) {
          const chainId = await window.ethereum.request({ 
            method: 'eth_chainId' 
          });
          return { account: accounts[0], chainId };
        }
      } catch (error) {
        console.error('Error checking wallet:', error);
      }
    }
    return null;
  };
  
  export const switchToBaseNetwork = async () => {
    const baseMainnet = '0x2105'; // Chain ID 8453
    
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: baseMainnet }],
      });
    } catch (error) {
      if (error.code === 4902) {
        // Network not added, add it
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [{
            chainId: baseMainnet,
            chainName: 'Base',
            nativeCurrency: {
              name: 'Ethereum',
              symbol: 'ETH',
              decimals: 18
            },
            rpcUrls: ['https://mainnet.base.org'],
            blockExplorerUrls: ['https://basescan.org']
          }],
        });
      } else {
        throw error;
      }
    }
  };
  
  export const formatAddress = (address) => {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };
  
  export const getNetworkName = (chainId) => {
    const networks = {
      '0x1': 'Ethereum',
      '0x2105': 'Base',
      '0x14a34': 'Base Sepolia',
      '0x89': 'Polygon',
    };
    return networks[chainId] || 'Unknown Network';
  };