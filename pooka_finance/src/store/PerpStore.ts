import { PERP_MM } from "@/utils/constants";
import {create} from "zustand";

interface PerpStore{
    selectedPerp:string;
    leverage:string;
    maintenanceMargin : number;
    timeframe:string;
    setMaintenanceMargin: (maintenanceMargin : number) => void;
    setSelectedPerp:(perp:string)=>void;
    setLeverage:(leverage:string)=>void;
    setTimeFrame:(timeframe:string)=>void;
}


export const usePerpStore=create<PerpStore>((set) => ({
    selectedPerp:"BTC/USD",
    leverage:"1",
    timeframe:'daily',
    maintenanceMargin:PERP_MM.BTC,
    setSelectedPerp: (perp:string)=>{
    set(()=>({
        selectedPerp:perp
    }))
    },
    setLeverage:(leverage:string)=>{
        set(()=>({
            leverage:leverage
    }))
    },
    setMaintenanceMargin:(margin:number)=>{
        set(()=>({
            maintenanceMargin:margin
        }))
    },
    setTimeFrame:(timeframe:string)=>{
        set(()=>({
            timeframe:timeframe
        }))
    }
}))