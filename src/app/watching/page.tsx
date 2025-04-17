'use client';

import { useEffect, useState, useRef } from "react";
import StockCard from '~/components/StockCard';
import type { SymbolData } from "~/api/financeData";

import { DeleteFavorite, fetchSymbols, GetFavorite, PostFavorite } from "~/api/financeData";
import { SearchForm } from "~/components/search-form";

import { useAuth } from "@clerk/nextjs";
import { UseInfiniteScroll } from "~/hooks/useInfiniteScroll";
export default function WatchingPage() {
  const { isSignedIn, getToken } = useAuth();


  const [symbols, setSymbols] = useState<SymbolData[]>([]);
  const [VisibleSymbolsCount, setVisibleSymbolsCount] = useState(50);
  const [visibleSymbols, setVisibleSymbols] = useState<SymbolData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const hasMore = VisibleSymbolsCount < symbols.length;
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [favoritesLoaded, setFavoritesLoaded] = useState(false);

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
      setFavorites(favoriteSymbols);
      setFavoritesLoaded(true);

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

  const handleToggleFavorite = async (symbol: string) => {
    const token = await getToken();
    if (!token) return;

    const isNowFavorited = !favorites.has(symbol);

    setFavorites(prev => {
      const next = new Set(prev);
      if (isNowFavorited) next.add(symbol);
      else next.delete(symbol);
      return next;
    });

    try {
      if (isNowFavorited) {
        await PostFavorite(token, symbol);
      } else {
        await DeleteFavorite(token, symbol);
      }
    } catch (err) {
      console.error("Failed to update favorite", err);
      // Revert optimistic update
      setFavorites(prev => {
        const next = new Set(prev);
        if (isNowFavorited) next.delete(symbol);
        else next.add(symbol);
        return next;
      });
    }
  };

  useEffect(() => {
    let filtered = symbols
    if (searchTerm.length > 0) {
      filtered = filtered.filter((item) =>
        item.symbol.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setVisibleSymbols(filtered.slice(0, VisibleSymbolsCount));

  }, [searchTerm, symbols, VisibleSymbolsCount]);

  // Scroll Hook
  UseInfiniteScroll({
    ref: loadMoreRef,
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
      {favoritesLoaded &&
          visibleSymbols.map((symbolItem: SymbolData) => (
            <StockCard
              key={symbolItem.symbol}
              symbol={symbolItem}
              isFavorited={favorites.has(symbolItem.symbol)}
              onToggleFavorite={() => handleToggleFavorite(symbolItem.symbol)}
            />
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
