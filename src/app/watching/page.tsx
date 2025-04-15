'use client';

import { useEffect, useState, useRef } from "react";
import StockCard from '~/components/StockCard';
import  type { SymbolData } from "~/api/financeData";

import { fetchSymbols, GetFavorite } from "~/api/financeData";
import { SearchForm } from "~/components/search-form";

import { useAuth } from "@clerk/nextjs";
import { UseInfiniteScroll } from "~/hooks/useInfiniteScroll";
export default function WatchingPage() {
  const { isSignedIn,getToken} = useAuth();

  // State
   const [symbols,setSymbols] = useState<SymbolData[]>([]);
   const [VisibleSymbolsCount,setVisibleSymbolsCount] = useState(50);
   const [visibleSymbols,setVisibleSymbols] = useState<SymbolData[]>([]);
   const [loading,setLoading] = useState(true);
   const [searchTerm,setSearchTerm] = useState("");

   const loadMoreRef = useRef<HTMLDivElement | null>(null);
   const hasMore = VisibleSymbolsCount < symbols.length;
  
   // Fetch Data
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
  
      const [fetchedSymbols, token] = await Promise.all([
        fetchSymbols(),
        getToken()
      ]);
      if (!token) throw new Error("No token available");
      const favorites = await GetFavorite(token);

      
      const favoriteSymbols = new Set(favorites.map(f => f.symbol));
  
      const merged = fetchedSymbols.map(symbol => ({
        ...symbol,
        favorited: favoriteSymbols.has(symbol.symbol)
      }));
      
      const sorted = merged.sort((a, b) => a.symbol.localeCompare(b.symbol));
      const filtered = sorted.filter((a) => a.favorited == true);
      setSymbols(filtered);
      console.log(filtered);
      setLoading(false);
    };
  
    if (isSignedIn) {
      void loadData();
    }
    
  }, [getToken, isSignedIn]);
   

  
  useEffect(() => {
    let filtered = symbols
    if(searchTerm.length > 0) {
      filtered = filtered.filter((item) =>
      item.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );
    }
    setVisibleSymbols(filtered.slice(0,VisibleSymbolsCount));
    
  },[searchTerm,symbols,VisibleSymbolsCount]);

  // Scroll Hook
  UseInfiniteScroll({
    ref:loadMoreRef,
    hasMore,
    loadMore: () => setVisibleSymbolsCount(prev => prev + 50)
  })

  return (
        <div className="flex flex-1 flex-col gap-4 p-4">
          <SearchForm 
            searchTerm={searchTerm}
            onSearchChange={(value) => setSearchTerm(value)}
          />
        <div className="grid auto-rows-min gap-4 grid-cols-2">
              {visibleSymbols.map((symbolItem: SymbolData) => (
                
                 <StockCard key={symbolItem.symbol} symbol={symbolItem}/>
              ))}
              {!loading && hasMore && (
            <div ref={loadMoreRef} className="h-8 bg-transparent" />
          )}
    
        </div>
            
          {loading && <p className="text-center mt-4">Loading symbols...</p>}
    
    
          {!loading && !hasMore && (
            <p className="text-center mt-6 text-gray-500">All symbols loaded</p>
          )}
          
      </div>
      )
    }
