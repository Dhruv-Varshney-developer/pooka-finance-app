/* eslint-disable @typescript-eslint/no-unused-vars */
import crypto from 'crypto'

export class DataStreamsService {
  private readonly baseUrl = 'https://api.testnet-dataengine.chain.link'
  private readonly apiKey = process.env.NEXT_PUBLIC_STREAMS_API_KEY
  private readonly apiSecret = process.env.STREAMS_API_SECRET
  
  private readonly feedIds = {
    'ETH/USD': '0x000362205e10b3a147d02792eccee483dca6c7b44ecce7012cb8c6e0b68b3ae9',
    'BTC/USD': '0x00037da06d56d083fe599397a4769a042d63aa73dc4ef57709d31e9971a5b439'
  }

  async getLatestPrice(symbol: 'ETH/USD' | 'BTC/USD') {
    if (!this.apiKey || !this.apiSecret) {
      throw new Error('API credentials missing')
    }

    const feedId = this.feedIds[symbol]
    const path = `/api/v1/reports/latest?feedID=${feedId}`
    const headers = this.generateAuthHeaders('GET', path)
    
    const response = await fetch(`${this.baseUrl}${path}`, { 
      method: 'GET', 
      headers 
    })
    
    const data = await response.json()
    return {
      symbol,
      price: this.extractPrice(data.report.fullReport), // TODO: implement
      timestamp: data.report.observationsTimestamp,
      proof: data.report.fullReport
    }
  }

  private generateAuthHeaders(method: string, path: string) {
    const timestamp = Date.now()
    const bodyHash = crypto.createHash('sha256').update('').digest('hex')
    const stringToSign = `${method} ${path} ${bodyHash} ${this.apiKey} ${timestamp}`
    const signature = crypto.createHmac('sha256', this.apiSecret!).update(stringToSign).digest('hex')

    return {
      'Authorization': this.apiKey!,
      'X-Authorization-Timestamp': timestamp.toString(),
      'X-Authorization-Signature-SHA256': signature
    }
  }

  private extractPrice(fullReport: string): number {
    // TODO: Implement when you get real data
    return 0
  }
}

export const dataStreamsService = new DataStreamsService()