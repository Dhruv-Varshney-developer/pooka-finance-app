import {create} from "zustand";

interface PerpStore{
    selectedPerp:string;
    leverage:string;
    setSelectedPerp:(perp:string)=>void;
    setLeverage:(leverage:string)=>void;
}


export const usePerpStore=create<PerpStore>((set) => ({
    selectedPerp:"BTC/USD",
    leverage:"1",
    setSelectedPerp: (perp:string)=>{
    set(()=>({
        selectedPerp:perp
    }))
    },
    setLeverage:(leverage:string)=>{
        set(()=>({
            leverage:leverage
    }))
    }
}))