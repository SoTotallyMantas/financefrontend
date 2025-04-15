'use client';

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { DeleteFavorite, GetFavorite, PostFavorite, type NewsArticle, type StockMetricData, type StockPriceData} from "~/api/financeData";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import {Heart, HeartOff} from "lucide-react";
import { Button } from "~/components/ui/button";
import StockMetricCard from "~/components/stockmetric-card";
import StockPriceCard from "~/components/stockprice-card";
import NewsCard from "~/components/NewsCard";
import {useStockDetails} from "~/hooks/useStockDetails"
import { SelectSeparator } from "~/components/ui/select";
import { useAuth } from "@clerk/nextjs";
  export default function Stock() {
    const params = useParams();
    const symbol = params.symbol as string;
    const searchParams = useSearchParams();
    const description = searchParams.get("description") ?? "";
    const {isSignedIn,getToken} = useAuth();
    const [favorited, setFavorited] = useState<boolean | null>(null);
    // I am confused nothing fixes it 
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const {NewsArticles,StockMetric,stockPrice} = useStockDetails(symbol) as {
      NewsArticles: NewsArticle[] ;
      StockMetric: StockMetricData;
      stockPrice: StockPriceData ;
    };;
   
    
     useEffect(() => {
        const loadData = async () => {
          
          try{
          const token = await getToken()
          if (!token) throw new Error("No token available");
          const favorites = await GetFavorite(token);
          const isFavorited = favorites.some((fav: {symbol:string}) => fav.symbol === symbol)
          setFavorited(isFavorited);
        } catch(error){
          console.error("Failed to laod favorites:" , error)
        }
        };
      
        if (isSignedIn) {
          void loadData();
        }
        
      }, [getToken, isSignedIn,symbol]);

        
         const syncing = favorited === null;

    async function toggleFavorite() {
            if (favorited === null) return;
    
            const newState = !favorited;
                setFavorited(newState);
            try {
                const token = await getToken();
                if (!token) throw new Error("No token available");
                if(newState) {
                    await PostFavorite(token,symbol);
                } else {
                    await DeleteFavorite(token,symbol);
                }
            } catch (error) {
                console.error("Failed to update favorite:", error);
                setFavorited(!newState);
            }
         };
  return (
    <div className="flex flex-1 flex-row gap-4 justify-center align-items: center; p-4">
    
      <Card className="aspect-video rounded-xl bg-muted/50  w-[1000px] ">
        <CardHeader>
          <div className="grid grid-cols-5">
            <div className="col-span-4">
          <CardTitle>{symbol}</CardTitle>
          <CardDescription>{description}</CardDescription>
          </div>

          {!syncing && isSignedIn &&
                    (
                        !favorited ?
                            (
                                <Button className="w-auto h-full bg-green-500" onClick={toggleFavorite}>
                                    <Heart />
                                </Button>
                            ) : (
                                <Button className="w-auto  h-full bg-red-500" onClick={toggleFavorite}>
                                    <HeartOff />
                                </Button>
                            )
                    )
                }
          </div>
          <SelectSeparator/>
          <StockPriceCard data={stockPrice}/>
        </CardHeader>
        <SelectSeparator/>
        <CardContent>
          <StockMetricCard data={StockMetric}/>
        </CardContent>
        <SelectSeparator/>
        <CardFooter className="flex justify-center">
          <div className="  text-sm font-medium me-2 px-2.5 py-0.5 ">
          <p className="p-5 text-3xl">Company News</p>
           {NewsArticles && NewsArticles.length > 0 ?  (

           
            NewsArticles?.map((Article) => 
            <NewsCard key={Article.id} news={Article} />
            )
          ) : (
            <p className="text-center"> No News</p>
          )}
          
          </div>
        </CardFooter>
      </Card>
    

  </div>
  )
}


