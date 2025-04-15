'use client';

import  type { SymbolData } from "~/api/financeData";
import { Button } from "./ui/button";
import Link from "next/link";
import { Heart, HeartOff } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import {DeleteFavorite,PostFavorite } from "~/api/financeData";

type StockCardProps = {
    symbol: SymbolData;
  };
  
export default function StockCard ( {symbol}: StockCardProps) {
     
     const {isSignedIn,getToken} = useAuth();
     const [favorited, setFavorited] = useState<boolean | null>(null);

     useEffect(() => {
       
       setFavorited(symbol.favorited ?? false);
     }, [symbol.favorited]);
     const syncing = favorited === null;

     async function toggleFavorite() {
        if (favorited === null) return;

        const newState = !favorited;
            setFavorited(newState);
        try {
            const token = await getToken();
            if (!token) throw new Error("No token available");
            if(newState) {
                await PostFavorite(token,symbol.symbol);
            } else {
                await DeleteFavorite(token,symbol.symbol);
            }
        } catch (error) {
            console.error("Failed to update favorite:", error);
            setFavorited(!newState);
        }
     };
     
    return(

        
            <div className="flex flex-col flex-wrap aspect-video h-20 w-full rounded-lg bg-muted/50">
                <div className="grid grid-cols-5 gap-4">
                <div className="col-span-4 ">
                <Link href={{
                    pathname: `/stocks/${symbol.symbol}`,
                    query: { description: symbol.description }
                }}>

                    
                        <p className="pl-4 pt-2">{symbol.symbol}</p>
                        <p className="pl-4 pt-2">{symbol.description}</p>
                    

                </Link>
                </div>
                {!syncing && isSignedIn && 
                (
                    !favorited ?
                        (
                            <Button className="w-auto mt-2 h-full bg-green-500" onClick={toggleFavorite}>
                                <Heart />
                            </Button>
                        ) : (
                            <Button className="w-auto mt-2 h-full bg-red-500" onClick={toggleFavorite}>
                                <HeartOff />
                            </Button>
                        )
                )
            }
                
            </div>
        </div>
       
    )
};