"use client"
import '@rainbow-me/rainbowkit/styles.css';
import {
    getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { ReactNode } from 'react';
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";
import React from 'react';

const config=getDefaultConfig({
    appName:"ChromiumHack",
    projectId:"fbb7dd672f032c12e043457e516544f4",
    chains: [mainnet, polygon, optimism, arbitrum, base],
    ssr:true
})

const queryClient = new QueryClient();
export const AppKitProvider = ({ children }: { children: ReactNode }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};