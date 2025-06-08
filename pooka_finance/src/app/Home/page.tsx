"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Navigation } from "@/components/HomeNavigation"
import { CryptoTicker } from "@/components/CryptoTicker"
import { HeroSection } from "@/components/HeroSection"
import { StatsSection } from "@/components/StatsSection"
import { SuperAppSection } from "@/components/SuperAppSection"
import { BuiltForSection } from "@/components/BuiltForSection"
import { Footer } from "@/components/HomeFooter"
import { CTASection } from "@/components/CTASection"
import "./styles.scss"

interface LandingPageProps {
  onLaunchApp?: () => void
}

const LandingPage: React.FC<LandingPageProps> = ({ onLaunchApp }) => {
  const [currentVolume, setCurrentVolume] = useState(15000000)
  const [currentUsers, setCurrentUsers] = useState(7200)

  // Animate numbers on mount
  useEffect(() => {
    const volumeInterval = setInterval(() => {
      setCurrentVolume((prev) => prev + Math.floor(Math.random() * 10000))
    }, 3000)

    const usersInterval = setInterval(() => {
      setCurrentUsers((prev) => prev + Math.floor(Math.random() * 10))
    }, 5000)

    return () => {
      clearInterval(volumeInterval)
      clearInterval(usersInterval)
    }
  }, [])

  const handleTradeNow = () => {
    onLaunchApp?.()
  }

  return (
    <div className="HomeWrapper">
      <Navigation onLaunchApp={onLaunchApp} />
      <HeroSection onTradeNow={handleTradeNow} />
      <StatsSection volume={currentVolume} users={currentUsers} />
      <SuperAppSection />
      <CryptoTicker />
      <BuiltForSection />
      <CTASection onLaunchApp={onLaunchApp} />
      <Footer />
    </div>
  )
}

export default LandingPage
