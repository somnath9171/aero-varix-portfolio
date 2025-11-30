import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { NftSection } from './components/NftSection';
import { Portfolio } from './components/Portfolio';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white selection:bg-[#FF3131] selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <NftSection />
        <Portfolio />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;