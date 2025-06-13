import { useState, useEffect } from 'react'
import { dataStreamsService } from '@/services/dataStreams'

export function useDataStreams() {
  const [ethPrice, setEthPrice] = useState(0)
  const [btcPrice, setBtcPrice] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const updatePrices = async () => {
      setIsLoading(true)
      try {
        const [eth, btc] = await Promise.all([
          dataStreamsService.getLatestPrice('ETH/USD'),
          dataStreamsService.getLatestPrice('BTC/USD')
        ])
        setEthPrice(eth.price)
        setBtcPrice(btc.price)
      } catch (error) {
        console.error('Failed to fetch prices:', error)
      } finally {
        setIsLoading(false)
      }
    }

    updatePrices()
    const interval = setInterval(updatePrices, 15 * 60 * 1000) // 15 minutes
    return () => clearInterval(interval)
  }, [])

  return { ethPrice, btcPrice, isLoading }
}