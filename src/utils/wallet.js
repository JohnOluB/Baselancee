// src/utils/wallet.js

export const connectWallet = async () => {
    if (window.ethereum) {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const chainId = await window.ethereum.request({ method: 'eth_chainId' });
            return { account: accounts[0], chainId };
        } catch (error) {
            throw new Error('User denied account access');
        }
    } else {
        throw new Error('No Ethereum wallet detected. Please install MetaMask.');
    }
};

export const checkWalletConnection = async () => {
    if (window.ethereum) {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_accounts' });
            if (accounts.length > 0) {
                const chainId = await window.ethereum.request({ method: 'eth_chainId' });
                return { account: accounts[0], chainId };
            }
        } catch (error) {
            console.error('Could not check wallet connection:', error);
        }
    }
    return null;
};

export const formatAddress = (address) => {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
};

export const getNetworkName = (chainId) => {
    switch (chainId) {
        case '0x1': return 'Mainnet';
        case '0xaa36a7': return 'Sepolia';
        case '0x89': return 'Polygon';
        case '0x13881': return 'Mumbai';
        case '0xa4b1': return 'Arbitrum One';
        case '0xa': return 'Optimism';
        case '0x2105': return 'Base';
        case '0x14a33': return 'Base Goerli';
        default: return 'Unknown Network';
    }
}


// Add this new function for authentication
export const signAuthMessage = async (account, nonce) => {
    try {
      const message = `Sign this message to authenticate with BaseLance.\n\nNonce: ${nonce}\nWallet: ${account}`;
      
      const signature = await window.ethereum.request({
        method: 'personal_sign',
        params: [message, account],
      });
      
      return signature;
    } catch (error) {
      throw new Error('User rejected signature request');
    }
  };