
import React, { useState, useEffect } from 'react';
import { X, ExternalLink, Loader2 } from 'lucide-react';
import { WalletType } from '../types';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect: (address: string, type: WalletType) => void;
}

export const WalletModal: React.FC<WalletModalProps> = ({ isOpen, onClose, onConnect }) => {
  const [isConnecting, setIsConnecting] = useState<WalletType | null>(null);
  const [installedWallets, setInstalledWallets] = useState<{
    metamask: boolean;
    trust: boolean;
    coinbase: boolean;
  }>({ metamask: false, trust: false, coinbase: false });

  // Check for installed wallets on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const { ethereum, trustwallet } = window;
      
      let hasMetaMask = false;
      let hasCoinbase = false;
      let hasTrust = !!trustwallet;

      if (ethereum) {
        if (ethereum.isMetaMask) hasMetaMask = true;
        if (ethereum.isCoinbaseWallet) hasCoinbase = true;
        if (ethereum.isTrust) hasTrust = true;
        
        // Check providers array if multiple are injected
        if (ethereum.providers) {
          hasMetaMask = ethereum.providers.some(p => p.isMetaMask);
          hasCoinbase = ethereum.providers.some(p => p.isCoinbaseWallet);
          hasTrust = ethereum.providers.some(p => p.isTrust);
        }
      }

      setInstalledWallets({
        metamask: hasMetaMask,
        trust: hasTrust,
        coinbase: hasCoinbase
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const connectToProvider = async (provider: any, type: WalletType) => {
    try {
      setIsConnecting(type);
      const accounts = await provider.request({ method: 'eth_requestAccounts' });
      if (accounts && accounts.length > 0) {
        onConnect(accounts[0], type);
      }
    } catch (error: any) {
      console.error("Connection rejected or failed", error);
      alert("Connection failed: " + (error.message || "User rejected request"));
    } finally {
      setIsConnecting(null);
    }
  };

  const handleConnect = async (type: WalletType) => {
    const { ethereum, trustwallet } = window;

    // Handle Trust Wallet
    if (type === 'trust') {
      if (trustwallet) {
        return connectToProvider(trustwallet, type);
      }
      // Check providers array for Trust
      if (ethereum?.providers) {
        const trustProvider = ethereum.providers.find(p => p.isTrust);
        if (trustProvider) return connectToProvider(trustProvider, type);
      }
      // Fallback to generic if isTrust is true on main
      if (ethereum?.isTrust) {
        return connectToProvider(ethereum, type);
      }
      
      window.open('https://trustwallet.com/browser-extension', '_blank');
      return;
    }

    // Handle MetaMask
    if (type === 'metamask') {
      if (ethereum?.isMetaMask && !ethereum.providers) {
         return connectToProvider(ethereum, type);
      }
      if (ethereum?.providers) {
         const mmProvider = ethereum.providers.find(p => p.isMetaMask);
         if (mmProvider) return connectToProvider(mmProvider, type);
      }
      
      // If no specific provider found but ethereum exists, try it (user might have MM as default)
      if (ethereum) {
         return connectToProvider(ethereum, type);
      }

      window.open('https://metamask.io/download/', '_blank');
      return;
    }

    // Handle Coinbase
    if (type === 'coinbase') {
       if (ethereum?.isCoinbaseWallet) {
          return connectToProvider(ethereum, type);
       }
       if (ethereum?.providers) {
          const cbProvider = ethereum.providers.find(p => p.isCoinbaseWallet);
          if (cbProvider) return connectToProvider(cbProvider, type);
       }

       window.open('https://www.coinbase.com/wallet/downloads', '_blank');
       return;
    }

    // Handle WalletConnect / Abstract / Other
    // Without external libraries like @walletconnect/web3-provider or wagmi, 
    // we cannot implement the QR code modal easily in this environment.
    // We will show a friendly message.
    if (type === 'walletconnect' || type === 'abstract') {
        alert(`${type === 'walletconnect' ? 'WalletConnect' : 'Abstract'} integration requires additional library configuration. Please use MetaMask, Coinbase, or Trust Wallet for this demo.`);
    }
  };

  const WalletItem = ({ 
    type, 
    name, 
    logo, 
    isInstalled = false 
  }: { 
    type: WalletType, 
    name: string, 
    logo: React.ReactNode, 
    isInstalled?: boolean 
  }) => (
    <button 
      onClick={() => handleConnect(type)}
      disabled={isConnecting !== null}
      className="w-full bg-[#0a0a0f] hover:bg-[#25252e] disabled:opacity-50 p-4 flex items-center justify-between transition-all group border-b border-white/5 last:border-0"
    >
      <div className="flex items-center gap-4">
        <div className="w-8 h-8 flex items-center justify-center">
            {isConnecting === type ? <Loader2 className="animate-spin text-[#00BFFF]" /> : logo}
        </div>
        <span className="font-bold text-white text-lg">{name}</span>
      </div>
      
      {isInstalled ? (
        <div className="bg-[#333] text-gray-300 text-[10px] font-bold px-2 py-1 rounded">
          Installed
        </div>
      ) : (
        <ExternalLink size={16} className="text-gray-500 group-hover:text-white transition-colors" />
      )}
    </button>
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-[#15151a] w-full max-w-md rounded-2xl border border-white/10 shadow-2xl overflow-hidden animate-float flex flex-col">
        
        {/* Header */}
        <div className="absolute top-4 right-4 z-10">
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="flex flex-col">
            {/* Trust Wallet */}
            <WalletItem 
              type="trust" 
              name="Trust Wallet" 
              isInstalled={installedWallets.trust}
              logo={
                <svg viewBox="0 0 32 32" className="w-8 h-8">
                  <path fill="#0500FF" d="M16 32C7.163 32 0 24.837 0 16S7.163 0 16 0s16 7.163 16 16-7.163 16-16 16z"/>
                  <path fill="#FFF" d="M23.5 8c-1.7 0-3.3.4-4.8 1.1-1.7.8-3.1 2-4.2 3.4-1.1-1.4-2.5-2.6-4.2-3.4C8.8 8.4 7.2 8 5.5 8 5.2 8 5 8.2 5 8.5v8c0 6.6 4.9 12 11 12 6.1 0 11-5.4 11-12V8.5c0-.3-.2-.5-.5-.5z"/>
                </svg>
              }
            />

            {/* MetaMask */}
            <WalletItem 
              type="metamask" 
              name="MetaMask" 
              isInstalled={installedWallets.metamask}
              logo={
                <svg viewBox="0 0 32 32" className="w-8 h-8">
                  <path fill="#E17726" d="M26.4 20.3c.7-1.8.8-3.4.1-4.7-2.3-1.6-4.5-1.9-6.9-1.3-.2-3.1-2-5.4-4.7-6.2.1-1.6-1.1-3.1-2.9-3.4-1.9-.3-3.7.6-4.5 2.1-2.9 1-4.6 3.4-4.5 6.5-2.3-.6-4.6-.3-6.8 1.3-.7 1.3-.6 2.9.1 4.7-1.8 1.5-2.1 4.5-.4 6.2 3.6 4 9.1 5.9 15.3 4.3 5.4 1.3 11-1 14.7-5.1 1.7-1.8 1.3-4.8-.5-6.3V18.4z"/>
                </svg>
              }
            />

            {/* Coinbase Wallet */}
            <WalletItem 
              type="coinbase" 
              name="Coinbase Wallet" 
              isInstalled={installedWallets.coinbase}
              logo={
                <svg viewBox="0 0 32 32" className="w-8 h-8">
                  <circle cx="16" cy="16" r="16" fill="#0052FF"/>
                  <path fill="#FFF" d="M16 8.5c-4.1 0-7.5 3.4-7.5 7.5s3.4 7.5 7.5 7.5 7.5-3.4 7.5-7.5-3.4-7.5-7.5-7.5zm0 11c-1.9 0-3.5-1.6-3.5-3.5s1.6-3.5 3.5-3.5 3.5 1.6 3.5 3.5-1.6 3.5-3.5 3.5z"/>
                </svg>
              }
            />

            {/* WalletConnect */}
            <WalletItem 
              type="walletconnect" 
              name="WalletConnect" 
              logo={
                <svg viewBox="0 0 32 32" className="w-8 h-8">
                  <path fill="#3B99FC" d="M6.3 11.2c5.3-5.3 14-5.3 19.3 0 .4.4.4 1.1 0 1.5l-1.3 1.3c-.4.4-1.1.4-1.5 0-3.7-3.6-9.6-3.6-13.3 0-.4.4-1.1.4-1.5 0L6.7 12.7c-.4-.4-.4-1.1-.4-1.5zm22.3 3l2.8 2.8c.4.4.4 1.1 0 1.5l-15 15c-.4.4-1.1.4-1.5 0l-15-15c-.4-.4-.4-1.1 0-1.5l2.8-2.8c.4-.4 1.1-.4 1.5 0l1.4 1.4c.4.4 1.1.4 1.5 0l8.4-8.4c.4-.4 1.1-.4 1.5 0l8.4 8.4c.4.4 1.1.4 1.5 0l1.4-1.4c.5-.4 1.1-.4 1.5 0z"/>
                </svg>
              }
            />

            {/* Abstract */}
            <WalletItem 
              type="abstract" 
              name="Abstract" 
              logo={
                <svg viewBox="0 0 32 32" className="w-8 h-8">
                  <rect width="32" height="32" rx="8" fill="#00C06D"/>
                  <path fill="#FFF" d="M16 8l-6 6 6 6 6-6-6-6zm0 16l-4-4-4 4 8 8 8-8-4-4-4 4z"/>
                </svg>
              }
            />

            {/* More Options */}
            <button className="w-full bg-[#0a0a0f] hover:bg-[#25252e] p-5 text-left transition-all group border-t border-white/5">
                <span className="font-bold text-white text-lg group-hover:text-[#00BFFF] transition-colors">More Wallet Options</span>
            </button>
        </div>
      </div>
    </div>
  );
};
