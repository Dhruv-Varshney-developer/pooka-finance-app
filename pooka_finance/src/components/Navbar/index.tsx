"use client"
import React from 'react';
import "./styles.scss"
import { ConnectButton } from '@rainbow-me/rainbowkit';
const Navbar = () => {


  return (
    <nav className="navbar">
      <div className="navbar-content">
        {/* Left: Logo */}
        <div className="navbar-brand">
          <div className="logo">
            <div className="logo-icon"></div>
            <span className="logo-text">PookaFinance</span>
          </div>
        </div>

        <div className="navbar-nav">
          <a href="#" className="nav-link active">Dashboard</a>
          <a href="#" className="nav-link">Markets</a>
          <a href="#" className="nav-link">Portfolio</a>
          <a href="#" className="nav-link">Leaderboard</a>
        </div>

       
        <div className="navbar-actions">
         
          <ConnectButton/>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;