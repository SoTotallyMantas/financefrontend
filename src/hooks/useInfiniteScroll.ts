import { useEffect } from "react";


type UseInfiniteScrollProps = {
    ref: React.RefObject<HTMLElement | null>;      // DOM element to watch
    hasMore: boolean;                   // Whether more data is available
    loadMore: () => void;               // What to do when you want more data
    threshold?: number;                 // How much of the element must be visible (default = 1.0)
  };

  
export function UseInfiniteScroll({
    ref,
    hasMore,
    loadMore,
    threshold = 1.0,
  }: UseInfiniteScrollProps) {
useEffect(() => {
    if (!hasMore) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          loadMore();
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 1.0,
      }
    );

    const current = ref.current;
    if (current) {
      observer.observe(current);
    }

    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  },[ref, hasMore, loadMore, threshold]);
}