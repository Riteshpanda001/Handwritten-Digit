import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import './About.css';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import TechnologyStack from '../components/home/TechnologyStack';
import Features from '../components/home/Features';
import HowItWorks from '../components/home/HowItWorks';

export default function About() {
  return (
    <div className="about-page">
      <Navbar />

      <main className="about-main">
        <div className="container">
          <div className="back-home-bar">
            <Link to="/" className="back-home-btn">
              <ArrowLeft size={16} /> Back to Home
            </Link>
          </div>

          <div className="about-header">
            <h1 className="about-title">
              About <span className="text-gradient">Handwritten Digit AI</span>
            </h1>
            <p className="about-description">
              Handwritten Digit Classification is an end-to-end full-stack computer vision application engineered with React, Vite, PyTorch, and FastAPI.
            </p>
          </div>

          <Features />
          <HowItWorks />
          <TechnologyStack />
        </div>
      </main>

      <Footer />
    </div>
  );
}
