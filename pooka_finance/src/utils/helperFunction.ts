export const NormalizeContractData=(value:bigint)=>{
    return Number(value)/10**8;
}

export const getPastDate = (): string => {
    const now = new Date();
    now.setFullYear(now.getFullYear() - 1);
    now.setMonth(now.getMonth() - 5);
    now.setDate(now.getDate() - 29);
    const result=returnFormattedDate(now)
    return result
};

export const returnFormattedDate=(now:Date):string=>{
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, "0"); 
    const dd = String(now.getDate()).padStart(2, "0");
  
    return `${yyyy}-${mm}-${dd}`;
}