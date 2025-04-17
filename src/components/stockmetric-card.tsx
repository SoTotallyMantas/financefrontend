'use client';

import type { StockMetricData } from "~/api/financeData";
const labelMap: Record<keyof StockMetricData, string> = {
    "52WeekHigh": "52 Week High:",
    "52WeekLow": "52 Week Low:",
    "10DayAverageTradingVolume": "10-Day Avg Volume:",
    dividendGrowthRate5Y: "Dividend Growth (5Y):",
    dividendYieldIndicatedAnnual: "Dividend Yield (Indicated):",
    currentDividendYieldTTM: "Current Dividend Yield (TTM):",
    epsAnnual: "EPS (Annual):",
    epsTTM: "EPS (TTM):",
    epsGrowthTTMYoy: "EPS Growth (YoY):",
    epsGrowth5Y: "EPS Growth (5Y):",
    grossMarginTTM: "Gross Margin (TTM):",
    operatingMarginTTM: "Operating Margin (TTM):",
    netProfitMarginTTM: "Net Profit Margin (TTM):",
    roiTTM: "ROI (TTM):",
    roaTTM: "ROA (TTM):",
    roeTTM: "ROE (TTM):",
    revenueGrowthTTMYoy: "Revenue Growth (YoY):",
    revenueGrowth5Y: "Revenue Growth (5Y):"
  };

  type StockMetricCardProps = {
    data?: StockMetricData; 
  };
  

export default function stockMetricCard({data}: StockMetricCardProps) {

    if(!data) {
        return <div className="text-muted-foreground p-2">Loading metrics...</div>;
    }
    return(
        <div className="grid grid-cols-3">
            {Object.entries(labelMap).map(([key,label])=> (
             <div key={key}>
            <p className="text-muted-foregroun p-2">{label} {data[key as keyof StockMetricData]?.toLocaleString() ?? "N/A" }</p>
            </div>
            ))}

        </div>
     
    );
};