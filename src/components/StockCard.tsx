'use client';

import  type { SymbolData } from "~/api/financeData";
import { Button } from "./ui/button";
import Link from "next/link";
import {  Heart, HeartOff } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import {DeleteFavorite,PostFavorite } from "~/api/financeData";

type StockCardProps = {
    symbol: SymbolData;
    isFavorited: boolean;
    onToggleFavorite: () => void;
  };
export default function StockCard ( {symbol,isFavorited,onToggleFavorite}: StockCardProps) {
     
     const {isSignedIn,getToken} = useAuth();
    


     
     
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
                {isSignedIn && 
                (
                    !isFavorited ?
                        (
                            <Button className="w-auto mt-2 h-full bg-green-500" onClick={onToggleFavorite}>
                                <Heart />
                            </Button>
                        ) : (
                            <Button className="w-auto mt-2 h-full bg-red-500" onClick={onToggleFavorite}>
                                <HeartOff />
                            </Button>
                        )
                )
            }
                
            </div>
        </div>
       
    )
};