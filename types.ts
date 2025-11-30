
export interface NavItem {
  label: string;
  href: string;
}

export interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  imageUrl: string;
}

export interface NftCardProps {
  id: number | string;
  title: string;
  price: string;
  priceUsd?: string;
  imageUrl: string;
  creator: string;
  permalink?: string;
}

export type WalletType = 'metamask' | 'coinbase' | 'trust' | 'walletconnect' | 'abstract' | 'other' | null;

export interface EthereumProvider {
  isMetaMask?: boolean;
  isCoinbaseWallet?: boolean;
  isTrust?: boolean;
  request: (args: { method: string; params?: any[] }) => Promise<any>;
  on: (eventName: string, handler: (params: any) => void) => void;
  removeListener: (eventName: string, handler: (params: any) => void) => void;
  providers?: EthereumProvider[];
}

declare global {
  interface Window {
    ethereum?: EthereumProvider;
    trustwallet?: EthereumProvider;
  }
}
