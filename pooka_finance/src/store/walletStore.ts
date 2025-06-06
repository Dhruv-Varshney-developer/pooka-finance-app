import {create} from "zustand";

interface WalletStore{
    userWalletAddress:string | undefined;
    setUserWalletAddress:(walletAddress : string | undefined)=>void;
}


export const useWalletStore=create<WalletStore>((set) => ({
    userWalletAddress:undefined,
    setUserWalletAddress:(walletAddress:(string | undefined))=>{
    set(()=>({
        userWalletAddress:walletAddress
    }))
    }
}))