import React from 'react';
import './Home.css';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Hero from '../components/home/Hero';
import Features from '../components/home/Features';
import ModelPreview from '../components/home/ModelPreview';
import HowItWorks from '../components/home/HowItWorks';
import TechnologyStack from '../components/home/TechnologyStack';

export default function Home() {
  return (
    <div className="home-page">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <ModelPreview />
        <TechnologyStack />
      </main>
      <Footer />
    </div>
  );
}
