

export interface SymbolData {
    symbol: string;
    description: string;
    favorited?: boolean;
}
export interface FavoritedData {
  symbol: string;
  favorited: boolean;
}
export interface StockMetricData {
  "52WeekHigh": number;
  "52WeekLow": number;
  "10DayAverageTradingVolume": number;
  dividendGrowthRate5Y: number;
  dividendYieldIndicatedAnnual: number;
  currentDividendYieldTTM: number;
  epsAnnual: number;
  epsTTM: number;
  epsGrowthTTMYoy: number;
  epsGrowth5Y: number;
  grossMarginTTM: number;
  operatingMarginTTM: number;
  netProfitMarginTTM: number;
  roiTTM: number;
  roaTTM: number;
  roeTTM: number;
  revenueGrowthTTMYoy: number;
  revenueGrowth5Y: number;
}
export interface NewsArticle {
    category: string;
    datetime: number;  // Unix TimeStamp
    headline: string;
    id: number;
    image: string;
    source: string;
    summary: string;
    url: string;
  }

  export interface StockPriceData {
    // Current price
    c: number;
    // Change
    d: number;
    // Percent Change
    dp: number;
    // High price 
    h: number;
    // Low price
     l: number;
    // Open price
    o: number;
    // Previous day Close Price
    pc: number;
  }
export async function fetchStockPrice(symbol:string): Promise<StockPriceData>{
  const apiUrl = process.env.APIURL;
 const response = await fetch(`${apiUrl}/finance/StockPrice?symbol=${symbol}`)
 const data: StockPriceData = await response.json() as StockPriceData
 return data;
};
  // Retrieve Stock Symbols
export async function fetchSymbols(): Promise<SymbolData[]>{
   const apiUrl = process.env.APIURL;
    const response = await fetch(`${apiUrl}/finance/Symbols`)
  const data: SymbolData[] = await response.json() as SymbolData[];
  const formatedData: SymbolData[] = data.map(symbol => ({
    ...symbol,
    favorited: symbol.favorited ?? false
  }))
  return formatedData;
  console.log(data);
  };
  // Get Market News
  export async function  fetchMarketNews(): Promise<NewsArticle[]>{
   const apiUrl = process.env.APIURL;
    const response = await fetch(`${apiUrl}/finance/MarketNews`)
  const data: NewsArticle[] = await response.json() as NewsArticle[];
  return data;
  console.log(data);
  };
  // get Company news of stock
  export async function  fetchCompanyNews(symbol: string): Promise<NewsArticle[]>{
   const apiUrl = process.env.APIURL;
    const response = await fetch(`${apiUrl}/finance/CompanyNews?symbol=${symbol}`)
    const data: NewsArticle[] = await response.json() as NewsArticle[];
    return data;
  console.log(data);
  };
  // Get Stock metrics of Stock
  export async function  fetchStockMetric(symbol:string): Promise<StockMetricData>{
   const apiUrl = process.env.APIURL;
    const response = await fetch(`${apiUrl}/finance/StockMetric?symbol=${symbol}`)
    const data: StockMetricData = await response.json() as StockMetricData;
    return data;
  console.log(data);
  };
  // TODO 
  export async function GetFavorite(token:string): Promise<FavoritedData[]>{
   const apiUrl = process.env.APIURL;
    const response = await fetch(`${apiUrl}/user/favorites`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
           
    }
    
  });
  const data = await response.json() as FavoritedData[]
   
  return data;
  console.log(data);
  };
  export async function PostFavorite(token:string,symbol:string){
      const apiUrl = process.env.APIURL;
    const response = await fetch(`${apiUrl}/user/favorites?symbol=${symbol}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
           
    }
   
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  };

  export async function DeleteFavorite(token:string,symbol:string){
    const apiUrl = process.env.APIURL;
    const response = await fetch(`${apiUrl}/user/favorites?symbol=${symbol}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
           
    }
   
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  };