
export const connectWallet = async () => {
    if (typeof window.ethereum === 'undefined') {
      throw new Error('Please install MetaMask or another Web3 wallet');
    }
  
    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });
  
      if (accounts.length === 0) {
        throw new Error('No accounts found. Please unlock your wallet.');
      }
  
      const chainId = await window.ethereum.request({ 
        method: 'eth_chainId' 
      });
  
      return {
        account: accounts[0],
        chainId
      };
    } catch (error) {
      console.error('Connect wallet error:', error);
      
      // Handle specific error codes
      if (error.code === 4001) {
        throw new Error('User rejected the connection request');
      } else if (error.code === -32002) {
        throw new Error('Connection request already pending. Please check your wallet.');
      } else {
        throw new Error(error.message || 'Failed to connect wallet');
      }
    }
  };
  
  export const signAuthMessage = async (account, nonce) => {
    try {
      const message = `Sign this message to authenticate with BaseLance.\n\nNonce: ${nonce}\nWallet: ${account}`;
      
      const signature = await window.ethereum.request({
        method: 'personal_sign',
        params: [message, account],
      });
      
      return signature;
    } catch (error) {
      console.error('Sign message error:', error);
      
      if (error.code === 4001) {
        throw new Error('User rejected signature request');
      } else {
        throw new Error(error.message || 'Failed to sign message');
      }
    }
  };

  export const checkWalletConnection = async () => {
    if (typeof window.ethereum === 'undefined') {
      return { account: null, chainId: null };
    }
  
    const accounts = await window.ethereum.request({ method: 'eth_accounts' });
    if (accounts.length > 0) {
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      return { account: accounts[0], chainId };
    }
    return { account: null, chainId: null };
  };
  
  export const formatAddress = (address) => {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };
  
  export const getNetworkName = (chainId) => {
    switch (chainId) {
      case '0x1': return 'Ethereum Mainnet';
      case '0x2105': return 'Base Mainnet';
      case '0x14a34': return 'Base Sepolia';
      case '0xaa36a7': return 'Sepolia Testnet';
      default: return `Unknown Network (${chainId})`;
    }
  };
  
