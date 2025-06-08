"use client"

import type React from "react"
import "./styles.scss"

interface StatsSectionProps {
  volume: number
  users: number
}

export const StatsSection: React.FC<StatsSectionProps> = ({ volume, users }) => {
  return (
    <section className="statsSection">
      <div className="statsContainer">
        <div className="statItem">
          <div className="statLabel">
            Total Volume <span className="betaBadge">Beta</span>
          </div>
          <div className="statValue">${volume.toLocaleString()}</div>
        </div>

        <div className="statItem">
          <div className="statLabel">
            Total Users <span className="betaBadge">Beta</span>
          </div>
          <div className="statValue">{users.toLocaleString()}</div>
        </div>
      </div>
    </section>
  )
}

