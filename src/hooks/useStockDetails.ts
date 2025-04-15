'use client';


import { useEffect, useState } from "react";
import {
    fetchCompanyNews,
    fetchStockMetric,
    fetchStockPrice,
    type NewsArticle,
    type StockMetricData,
    type StockPriceData,
  } from "../api/financeData";

  type UseStockDetailsResult = {
    NewsArticles: NewsArticle[] | undefined;
    StockMetric: StockMetricData | undefined;
    stockPrice: StockPriceData | undefined;
  };
  
  export function useStockDetails(symbol: string): UseStockDetailsResult {
    const [StockMetric, setStockMetric] = useState<StockMetricData>();
    const [NewsArticles, setNewsArticles] = useState<NewsArticle[]>();
    const [stockPrice, setStockPrice] = useState<StockPriceData>();
  
    useEffect(() => {
      const load = async (): Promise<void>=> {
        try {
          const [news, metric, price] = await Promise.all([
            fetchCompanyNews(symbol),
            fetchStockMetric(symbol),
            fetchStockPrice(symbol),
          ]);
          setNewsArticles(news);
          setStockMetric(metric);
          setStockPrice(price);
        } catch (error) {
          console.error("Failed to fetch data:", error);
        }
      };
  
      if (symbol) void load();
    }, [symbol]);
  
    return { NewsArticles, StockMetric, stockPrice };
  }