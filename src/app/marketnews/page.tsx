'use client';

import * as React from "react"
import NewsCard from "~/components/NewsCard";
import {fetchMarketNews} from "~/api/financeData";
import type { NewsArticle } from "~/api/financeData";
import { useRef } from "react";

export default function Page() {
  const [news, setNews] = React.useState<NewsArticle[]>([]);
  const [VisibleArticles,setVisibleArticles] = React.useState(30);
  const [Loading,setLoading] = React.useState(true);

  React.useEffect(() => {
    const loadNews = async () => {
      const data = await fetchMarketNews();
      setNews(data);
      setLoading(false);
    };
    void loadNews();
  }, []);

  const visibleNews = news.slice(0, VisibleArticles);
  const hasMore = VisibleArticles < news.length;

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (!hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setVisibleArticles((prev) => prev + 30);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 1.0,
      }
    );

    const current = loadMoreRef.current;
    if (current) {
      observer.observe(current);
    }

    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, [hasMore]);
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 ">
      <div className="grid auto-rows-min gap-4 sm:grid-cols-2 md:grid-cols-2  2xl:grid-cols-3" >
        {visibleNews.map((article) => (
          <NewsCard key={article.id} news={article}/>
        ))}
        <div ref={loadMoreRef} className="h-8 bg-transparent" />

      </div>
      {Loading && <p className="text-center mt-4">Loading news...</p>}
      {!hasMore && !Loading && (
          <p className="text-center mt-6 text-gray-500">You reached the end</p>
        )}
    </div>
  )
}
