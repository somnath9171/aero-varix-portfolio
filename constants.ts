import { NavItem, PortfolioItem, NftCardProps } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '#hero' },
  { label: 'Explore', href: '#portfolio' },
  { label: 'Activity', href: '#activity' },
  { label: 'Community', href: '#community' },
];

export const NFT_ITEMS: NftCardProps[] = [
  {
    id: 1,
    title: "Cyber Skull #04",
    price: "0.85 ETH",
    imageUrl: "https://picsum.photos/300/400?random=1",
    creator: "@AeroVarix",
    permalink: "https://opensea.io/"
  },
  {
    id: 2,
    title: "Neon Genesis",
    price: "1.20 ETH",
    imageUrl: "https://picsum.photos/300/400?random=2",
    creator: "@AeroVarix",
    permalink: "https://opensea.io/"
  },
  {
    id: 3,
    title: "Abstract Cube",
    price: "0.55 ETH",
    imageUrl: "https://picsum.photos/300/400?random=3",
    creator: "@AeroVarix",
    permalink: "https://opensea.io/"
  },
  {
    id: 4,
    title: "Void Walker",
    price: "2.10 ETH",
    imageUrl: "https://picsum.photos/300/400?random=4",
    creator: "@AeroVarix",
    permalink: "https://opensea.io/"
  }
];

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  { id: 1, title: 'Brand Identity V1', category: 'Branding', imageUrl: 'https://picsum.photos/600/600?random=10' },
  { id: 2, title: 'Neo-Tokyo Illustration', category: 'Illustration', imageUrl: 'https://picsum.photos/600/400?random=11' },
  { id: 3, title: 'Product Render X', category: '3D Render', imageUrl: 'https://picsum.photos/600/800?random=12' },
  { id: 4, title: 'App UI Concept', category: 'UI/UX', imageUrl: 'https://picsum.photos/600/600?random=13' },
  { id: 5, title: 'Festival Poster', category: 'Print', imageUrl: 'https://picsum.photos/600/600?random=14' },
  { id: 6, title: 'Character Study', category: '3D Sculpt', imageUrl: 'https://picsum.photos/600/600?random=15' },
];