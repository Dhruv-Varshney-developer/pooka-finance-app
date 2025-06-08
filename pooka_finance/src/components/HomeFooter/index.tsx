"use client"

import type React from "react"
import "./styles.scss"

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footerContainer">
        <div className="footerContent">
          <div className="footerSection">
            <div className="footerLogo">
              <div className="footerLogoIcon">
                <span className="logoPlaceholder">LOGO</span>
              </div>
              <span className="footerLogoText">PookaFinance</span>
            </div>
            <h4 className="footerTitle">Trade Anything on PookaFinance</h4>
            <p className="footerCopyright">© 2025</p>
          </div>

          <div className="footerLinks">
            <div className="footerColumn">
              <h5 className="footerColumnTitle">Resources</h5>
              <a href="#blog" className="footerLink">
                Blog ↗
              </a>
              <a href="#docs" className="footerLink">
                Docs ↗
              </a>
              <a href="#brand" className="footerLink">
                Brand Kit ↗
              </a>
            </div>

            <div className="footerColumn">
              <h5 className="footerColumnTitle">Community</h5>
              <a href="#twitter" className="footerLink">
                Twitter ↗
              </a>
              <a href="#telegram" className="footerLink">
                Telegram ↗
              </a>
              <a href="#discord" className="footerLink">
                Discord ↗
              </a>
            </div>

            <div className="footerColumn">
              <h5 className="footerColumnTitle">Product</h5>
              <a href="#trading" className="footerLink">
                Trading Platform ↗
              </a>
              <a href="#api" className="footerLink">
                API ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
