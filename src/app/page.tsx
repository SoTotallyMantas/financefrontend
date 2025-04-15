'use client';

import { Button } from "~/components/ui/button";

import Link from 'next/link';

export default function HomePage() {
  
  
  return (

   
    
    <div>
      <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px] py-24 lg:py-32">
       
        {/* Title */}
        <div className="mt-5 max-w-2xl text-center mx-auto">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            Finance Data and News
          </h1>
        </div>
        {/* End Title */}
        <div className="mt-5 max-w-3xl text-center mx-auto">
          <p className="text-xl text-muted-foreground">
            Over 100+ stocks and metrics with stock news and general news
          </p>
        </div>
      
        <div className="mt-8 gap-3 flex justify-center">
          <Button size={"lg"} asChild>
            <Link href="/stocks">
            Stocks
            </Link>
            
          </Button>
          <Button size={"lg"} asChild>
            <Link href="/marketnews">
            Market News
            </Link>
            
          </Button>
        
        </div>
        
        
      </div>
    </div>
   
  );
}
