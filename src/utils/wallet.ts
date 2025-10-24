
import { ethers } from 'ethers';

// Define the network details for Base Sepolia
const baseSepolia = {
  chainId: '0x14a34', // 84532
  chainName: 'Base Sepolia',
  nativeCurrency: {
    name: 'Sepolia ETH',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: ['https://sepolia.base.org'],
  blockExplorerUrls: ['https://sepolia.basescan.org'],
};

const getProvider = () => {
    if (typeof window.ethereum === 'undefined') {
        throw new Error('Please install MetaMask or another Web3 wallet.');
    }
    return new ethers.BrowserProvider(window.ethereum);
}

// Function to switch to or add the Base Sepolia network
export const switchToBaseSepolia = async () => {
    const provider = getProvider();
    try {
        await provider.send('wallet_switchEthereumChain', [{ chainId: baseSepolia.chainId }]);
    } catch (switchError: any) {
        // This error code indicates that the chain has not been added to MetaMask.
        if (switchError.code === 4902) {
            try {
                await provider.send('wallet_addEthereumChain', [baseSepolia]);
            } catch (addError) {
                console.error('Failed to add Base Sepolia network:', addError);
                throw new Error('Failed to add Base Sepolia network. Please add it manually.');
            }
        } else {
            console.error('Failed to switch network:', switchError);
            throw new Error('Failed to switch to Base Sepolia network. Please switch manually.');
        }
    }
};

// Function to connect to the user's wallet
export const connectWallet = async (): Promise<{ account: string; chainId: string }> => {
    const provider = getProvider();
    try {
        const accounts = await provider.send('eth_requestAccounts', []);
        
        if (accounts.length === 0) {
            throw new Error('No accounts found. Please unlock your wallet.');
        }

        const network = await provider.getNetwork();
        const chainId = `0x${network.chainId.toString(16)}`;

        return {
            account: accounts[0],
            chainId,
        };
    } catch (error: any) {
        console.error('Connect wallet error:', error);
        if (error.code === 4001) {
            throw new Error('User rejected the connection request.');
        } else if (error.code === -32002) {
            throw new Error('Connection request already pending. Please check your wallet.');
        } else {
            throw new Error(error.message || 'Failed to connect wallet.');
        }
    }
};

// Function to sign an authentication message
export const signAuthMessage = async (account: string, nonce: string): Promise<string> => {
    const provider = getProvider();
    const signer = await provider.getSigner(account);
    const message = `Sign this message to authenticate: ${nonce}`;
    try {
        const signature = await signer.signMessage(message);
        return signature;
    } catch (error: any) {
        console.error('Sign message error:', error);
        if (error.code === 'ACTION_REJECTED' || error.code === 4001) {
            throw new Error('You rejected the signature request. Please sign to authenticate.');
        } else {
            throw new Error(error.message || 'Failed to sign message.');
        }
    }
};

// Function to check if a wallet is already connected
export const checkWalletConnection = async (): Promise<{ account: string | null; chainId: string | null }> => {
    if (typeof window.ethereum === 'undefined') {
        return { account: null, chainId: null };
    }
    const provider = getProvider();
    const accounts = await provider.listAccounts();
    if (accounts.length > 0) {
        const network = await provider.getNetwork();
        const chainId = `0x${network.chainId.toString(16)}`;
        return { account: accounts[0].address, chainId };
    }
    return { account: null, chainId: null };
};

// Utility function to format wallet address
export const formatAddress = (address: string | null): string => {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
};

// Utility function to get the network name from chainId
export const getNetworkName = (chainId: string | null): string => {
    if (!chainId) return 'Unknown Network';
    switch (chainId) {
        case '0x1': return 'Ethereum Mainnet';
        case baseSepolia.chainId: return 'Base Sepolia';
        case '0xaa36a7': return 'Sepolia Testnet';
        default: return `Unknown Network (${chainId})`;
    }
};
