'use client';

import type { StockPriceData } from "~/api/financeData";
const labelMap: Record<keyof StockPriceData, string> = {
    

     c: "Current Price:",

     d: "Change:",

     dp: "Percent Change:",

     h: "High price:",

      l: "Low Price:",

     o: "Open price:",
     
     pc: "Previous Day Close Price:"
  };

  type StockPriceCardProps = {
    data?: StockPriceData; 
  };
  

export default function stockPriceCard({data}: StockPriceCardProps) {

    if(!data) {
        return <div className="text-muted-foreground p-2">Loading prices...</div>;
    }
    return(
        <div className="flex">
            {(Object.keys(labelMap) as (keyof StockPriceData)[]).map((key) => 
        <div key={key}>
          <p className="text-muted-foreground p-2">                      
            {labelMap[key]} {data[key]?.toLocaleString?.() ?? "N/A"} 
          </p>
        </div>
      )}

        </div>
     
    );
};