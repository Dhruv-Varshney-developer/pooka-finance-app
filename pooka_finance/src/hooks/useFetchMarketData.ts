/* eslint-disable @typescript-eslint/no-unused-vars */
import {useReadContracts } from "wagmi"
import { useAccount } from "wagmi";
import { useWalletStore } from "@/store/walletStore";
import { POOKA_ABI } from "@/components/ABI/PookaFinanceABI";
import { Abi, parseEther } from "viem";
import { CONTRACT_ADDRESS_PRICE_FEED_SEPOLIA } from "@/utils/constants";
import { use, useEffect, useState } from "react";
import { useReadContract } from "wagmi";
import { usePerpStore } from "@/store/PerpStore";
import { useShallow } from "zustand/react/shallow";
import { stat } from "fs";
import { PRICE_FEED_ABI } from "@/components/ABI/PriceOracleABI";
import { NormalizeContractData } from "@/utils/helperFunction";

interface MarketData{
    price24hHigh:number,
    price24hLow:number,
    currentPrice:number,
    priceChange : number,
    changePercent: number
}

export const useFetchMarketData=()=>{
  const [query, setQuery]=useState<boolean>(false);
  const {
    selectedPerp
  }=usePerpStore(useShallow((state)=>({
    selectedPerp: state.selectedPerp
  })))
  
  const {
    data,
    error,
    isLoading,
    isError,
  } = useReadContract({
    abi: PRICE_FEED_ABI as Abi,
    address:CONTRACT_ADDRESS_PRICE_FEED_SEPOLIA as `0x${string}`,
    functionName: 'get24hData',
    args: [
        selectedPerp
    ],
    query:{
        enabled: selectedPerp!=="",
        refetchInterval:30000 
    }
  });
  
  if(isError){
    console.log("The error is",error)
  }


  const marketData:MarketData= !isLoading && !isError ?{
    currentPrice: NormalizeContractData((data as bigint[])[0]) as number || 0,
    price24hHigh: NormalizeContractData((data as bigint[])[1]) as number || 0,
    price24hLow: NormalizeContractData((data as bigint[])[2]) as number || 0,
    priceChange: NormalizeContractData((data as bigint[])[3]) as number || 0,
    changePercent: Number((data as bigint[])[4])/100 as number || 0,
  } : {} as MarketData;

   return {
    marketData,
    error,
    isError,
    isLoading
   }   

}