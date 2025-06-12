import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import axios from "axios";
import dotenv from "dotenv";
import { returnFormattedDate, getPastDate } from "@/utils/helperFunction";
dotenv.config()

interface ApiData{
    v:number,
    vw: number,
    o: number,
    c: number,
    h: number,
    l: number,
    t: number,
    n: number
  }



export async function GET(request:NextRequest) {
    try{
      const { searchParams } = new URL(request.url);
      const perp = searchParams.get("perp");
     console.log("THe requested data",perp);
     if(perp===undefined || perp==="" || perp===null) {
      return NextResponse.json(
        { error: `Error fetching data from Polygon API because of invalid perp name: ${perp}` },
        { status: 400 }
      );
     }
     const DATE_NOW=returnFormattedDate(new Date(new Date().setDate(new Date().getDate()-2))) || "2024-08-09";
   
     const BASE_URL="https://api.polygon.io/v2/aggs/ticker";
     const DATE_TO= getPastDate() || "2025-06-05";
     console.log("The Dat is",DATE_NOW, DATE_TO)
     const API_KEY=process.env.API_KEY;
     const CURRENCY_TICKER:string=perp.toString().replace("/","");
     const PARTS:"day" | "month" | "week" | "hour"="day";
     console.log("The api key is",API_KEY)
     const URL_POLYGON=`${BASE_URL}/X:${CURRENCY_TICKER}/range/1/${PARTS}/${DATE_TO}/${DATE_NOW}?adjusted=true&sort=asc&apiKey=${API_KEY}`;
     console.log(URL_POLYGON)
     const result=await axios.get(URL_POLYGON)

     const ohlcData = result.data.results.map((item:ApiData) => ({
        time: new Date(item.t).toISOString().split("T")[0],
        open: item.o, 
        high: item.h, 
        low: item.l, 
        close: item.c, 
      }));
     

     return NextResponse.json(
        { data: ohlcData },
        { status: 200 }
      );
    }catch(err){
        console.log(err)
        return NextResponse.json(
            { error: "Error fetching data from Polygon API" },
            { status: 400 }
          );
    }

}


// BTCUSD"
//X:ETHUSD