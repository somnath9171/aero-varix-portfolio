
import React, { useState, useEffect } from 'react';
import { NFT_ITEMS } from '../constants';
import { DollarSign, Settings, Loader2, Download, AlertCircle, X, Database, TrendingUp, TrendingDown } from 'lucide-react';
import { NftCardProps } from '../types';
import { Button } from './Button';

export const NftSection: React.FC = () => {
  const [nfts, setNfts] = useState<NftCardProps[]>(NFT_ITEMS);
  const [ethPrice, setEthPrice] = useState<number>(0);
  const [eth24hChange, setEth24hChange] = useState<number>(0);
  
  // Admin State
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [collectionSlug, setCollectionSlug] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Check for admin URL parameter on mount
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.get('admin') === 'true') {
      setIsAdminMode(true);
    }
  }, []);

  // Live Price Ticker Logic (OpenSea Style)
  useEffect(() => {
    // API Fetcher (CoinGecko - OpenSea's Oracle)
    const fetchOpenSeaOraclePrice = async () => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd&include_24hr_change=true');
        const data = await response.json();
        
        if (data.ethereum && data.ethereum.usd) {
          const price = data.ethereum.usd;
          const change = data.ethereum.usd_24h_change || 0;
          
          // Update state directly - no fake jitter, no interpolation.
          // This ensures the price only changes when the market actually updates.
          setEthPrice(price);
          setEth24hChange(change);
        }
      } catch (err) {
        console.error("CoinGecko fetch error", err);
      }
    };

    // Initial Fetch immediately on load
    fetchOpenSeaOraclePrice();

    // Poll every 30 seconds to match typical marketplace refresh rates
    // This removes the fake 10ms ticker and ensures updates happen only when new data is available.
    const interval = setInterval(fetchOpenSeaOraclePrice, 30000);

    // Cleanup
    return () => clearInterval(interval);
  }, []);

  const calculateUsd = (ethString: string) => {
    if (!ethPrice) return 'Loading...';
    const ethValue = parseFloat(ethString.replace(' ETH', ''));
    if (isNaN(ethValue)) return '---';
    const usdValue = (ethValue * ethPrice).toFixed(2);
    return `$${Number(usdValue).toLocaleString()}`;
  };

  const importCollection = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKey || !collectionSlug) {
      setError('Please provide both API Key and Collection Slug');
      return;
    }
    
    setIsLoading(true);
    setError('');

    try {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          'x-api-key': apiKey
        }
      };

      // OpenSea API v2 endpoint for collection NFTs
      const response = await fetch(`https://api.opensea.io/api/v2/collection/${collectionSlug}/nfts?limit=4`, options);
      
      if (!response.ok) {
        throw new Error('Failed to fetch collection. Check your API Key and Slug.');
      }

      const data = await response.json();
      
      if (data.nfts && data.nfts.length > 0) {
        const mappedNfts: NftCardProps[] = data.nfts.map((nft: any, index: number) => ({
          id: nft.identifier || index,
          title: nft.name || `#${nft.identifier}`,
          // Mocking price since metadata endpoint doesn't provide listing price
          price: (Math.random() * 2 + 0.1).toFixed(2) + ' ETH', 
          imageUrl: nft.image_url || nft.display_image_url || 'https://via.placeholder.com/400',
          creator: collectionSlug,
          permalink: nft.opensea_url
        }));
        
        setNfts(mappedNfts);
        setShowAdminPanel(false); // Close panel on success
      } else {
        setError('No NFTs found in this collection.');
      }
    } catch (err: any) {
      setError(err.message || 'Error fetching data from OpenSea');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-[#FF3131] py-24 relative overflow-hidden">
        {/* Background Patterns */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-10 left-10 w-96 h-96 bg-black rounded-full mix-blend-overlay filter blur-[100px]"></div>
            <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-white rounded-full mix-blend-overlay filter blur-[120px]"></div>
        </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-16">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
              <div className="relative inline-flex items-center gap-4 group">
                <div className="absolute inset-0 transform translate-x-2 translate-y-2 border-2 border-black bg-transparent transition-transform group-hover:translate-x-1 group-hover:translate-y-1 pointer-events-none"></div>
                <div className="relative bg-black text-[#FF3131] px-8 py-3 text-xl font-black uppercase tracking-widest inline-block z-10 shadow-xl shadow-[#00BFFF]/50">
                    OpenSea
                </div>
                
                {/* Admin Trigger - Only visible if ?admin=true */}
                {isAdminMode && (
                  <button 
                    onClick={() => setShowAdminPanel(true)}
                    className="w-10 h-10 flex items-center justify-center bg-black text-white hover:bg-[#00BFFF] transition-all rounded-full z-20 shadow-lg border-2 border-white/20"
                    title="Open CMS Settings"
                  >
                    <Settings size={18} />
                  </button>
                )}
              </div>
              
              <h2 className="text-5xl md:text-7xl font-black text-black leading-none max-w-2xl mt-8">
                Latest Drops <br/>From The <span className="text-white bg-black px-4 py-1 transform -skew-x-12 inline-block shadow-[8px_8px_0_0_#00BFFF]">OpenSea</span>
              </h2>
            </div>

            <div className="flex flex-col items-end gap-1">
               {/* Market Info */}
               {ethPrice > 0 && (
                 <div className="flex flex-col items-end gap-1">
                     <div className="bg-black/10 backdrop-blur-sm px-4 py-3 rounded-xl border border-black/10 flex items-center gap-6 min-w-[260px] justify-between shadow-sm hover:bg-black/15 transition-colors">
                        <div className="flex items-center gap-3">
                            <div className="w-2.5 h-2.5 rounded-full bg-green-500 relative">
                                {/* Removed animate-pulse to indicate stable, real-time data status */}
                            </div>
                            <div className="flex flex-col">
                                <span className="text-black font-extrabold text-xs leading-none uppercase tracking-wider mb-1">ETH/USD</span>
                                <div className={`flex items-center gap-1 text-[10px] font-bold leading-none ${eth24hChange >= 0 ? 'text-green-800' : 'text-red-800'}`}>
                                    {eth24hChange >= 0 ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                                    {eth24hChange > 0 ? '+' : ''}{eth24hChange.toFixed(2)}%
                                </div>
                            </div>
                        </div>
                        <span className="text-black font-black text-2xl tracking-tighter tabular-nums">
                            ${ethPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                     </div>
                 </div>
               )}
            </div>
          </div>
        </div>

        {/* Dashboard / CMS Modal Overlay */}
        {showAdminPanel && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-[#15151a] w-full max-w-lg rounded-2xl shadow-2xl border border-white/10 overflow-hidden animate-float">
               
               {/* Header */}
               <div className="bg-[#0a0a0f] p-4 border-b border-white/5 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                     <Database className="text-[#00BFFF]" size={20} />
                     <h3 className="text-white font-bold text-lg">Collection Import</h3>
                  </div>
                  <button onClick={() => setShowAdminPanel(false)} className="text-gray-400 hover:text-white">
                    <X size={20} />
                  </button>
               </div>

               {/* Body */}
               <div className="p-8">
                 <p className="text-gray-400 text-sm mb-6">
                    Connect your OpenSea collection to display your latest NFTs dynamically.
                 </p>

                 <form onSubmit={importCollection} className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-gray-500 tracking-wider">OpenSea API Key</label>
                      <input 
                        type="password" 
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        placeholder="sk_..." 
                        className="w-full bg-[#0a0a0f] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#00BFFF] focus:outline-none transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-gray-500 tracking-wider">Collection Slug</label>
                      <input 
                        type="text" 
                        value={collectionSlug}
                        onChange={(e) => setCollectionSlug(e.target.value)}
                        placeholder="e.g. bored-ape-yacht-club" 
                        className="w-full bg-[#0a0a0f] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#00BFFF] focus:outline-none transition-colors"
                      />
                    </div>

                    {error && (
                        <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-2 text-red-400 text-xs font-bold">
                            <AlertCircle size={14} /> {error}
                        </div>
                    )}

                    <div className="pt-2">
                        <Button variant="secondary" className="w-full py-3" disabled={isLoading}>
                            {isLoading ? (
                            <span className="flex items-center justify-center gap-2">
                                <Loader2 className="animate-spin" size={18} /> Connecting...
                            </span>
                            ) : (
                            <span className="flex items-center justify-center gap-2">
                                <Download size={18} /> Import Data
                            </span>
                            )}
                        </Button>
                    </div>
                 </form>
               </div>

               {/* Footer */}
               <div className="bg-[#0a0a0f] p-4 text-center border-t border-white/5">
                  <p className="text-[10px] text-gray-600 uppercase font-bold tracking-widest">Powered by OpenSea API v2</p>
               </div>
            </div>
          </div>
        )}

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-4">
          {nfts.map((item) => (
            <div 
                key={item.id} 
                className="group bg-white p-4 rounded-2xl shadow-[8px_8px_0_rgba(0,0,0,1)] transition-all duration-300 hover:-translate-y-3 hover:shadow-[12px_12px_0_rgba(0,0,0,1)] border-2 border-black relative flex flex-col h-full"
            >
              {/* Card Image */}
              <div className="relative overflow-hidden rounded-xl aspect-[4/5] bg-gray-900 border border-black/10">
                <img 
                  src={item.imageUrl} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400?text=No+Image';
                  }}
                />
              </div>
              
              <div className="pt-5 pb-2 px-1 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                    <div className="max-w-[60%] overflow-hidden">
                        <h3 className="text-black font-extrabold text-lg leading-tight truncate" title={item.title}>{item.title}</h3>
                        <p className="text-gray-500 text-xs font-bold mt-1 uppercase tracking-wider truncate" title={item.creator}>@{item.creator}</p>
                    </div>
                    <div className="text-right shrink-0">
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Price</p>
                        <p className="text-[#00BFFF] font-black text-lg">{item.price}</p>
                    </div>
                </div>
                
                {/* USD Price Indicator */}
                <div className="flex items-center justify-between bg-gray-50 rounded-lg p-2 mb-4 border border-gray-100 mt-auto">
                    <div className="flex items-center gap-1 text-gray-400">
                        <DollarSign size={12} />
                        <span className="text-[10px] font-bold uppercase">USD Value</span>
                    </div>
                    <span className="text-black font-bold text-sm">
                        {calculateUsd(item.price)}
                    </span>
                </div>
                
                {/* Buy Button - Links to OpenSea */}
                <a 
                  href={item.permalink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-shimmer w-full bg-black text-white font-black py-3 rounded-lg text-sm uppercase hover:bg-[#00BFFF] active:bg-[#00BFFF] transition-all border border-transparent flex items-center justify-center gap-2 group-hover:gap-3 relative overflow-hidden"
                >
                    <span className="relative z-10 flex items-center justify-center gap-2">Buy on OpenSea</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
