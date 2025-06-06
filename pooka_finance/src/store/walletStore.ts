import {create} from "zustand";

interface WalletStore{
    userWalletAddress:string | undefined;
    setUserWalletAddress:(walletAddress : string)=>void;
}


export const useWalletStore=create<WalletStore>((set) => ({
    userWalletAddress:undefined,
    setUserWalletAddress:(walletAddress:string)=>{
    set(()=>({
        userWalletAddress:walletAddress
    }))
    }
}))