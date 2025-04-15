import Link from "next/link";
import React from "react";


import { Button } from "~/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"
  
type NewsItem = {
  category: string;
  datetime: number;
  headline: string;
  id: number;
  image: string;
  source: string;
  summary: string;
  url: string;
};

type NewsCardProps = {
  news: NewsItem;
};

  export default function NewsCard({ news }: NewsCardProps) {
  return(
        <Card className="aspect-video rounded-xl bg-muted/50 ">
        <CardHeader>

          <CardTitle>Category: {news.category}</CardTitle>
          <p className="  text-2xl  p-2 pl-1 font-medium  ">
            Headline:
          </p>
          <CardDescription>{news.headline}</CardDescription>
        </CardHeader>
        <CardContent>
          {news.image &&
          <div className="flex justify-center">
            
          <img  src={news.image } width={400} height={400} alt={news.headline} />
          </div>
          }
          <p className=" text-2xl font-medium p-2 pl-1  ">
            Summary:
          </p>
          <p className="pt-3">{news.summary}</p>
        </CardContent>
        <CardFooter className="flex justify-between mt-auto ">
          <div>
          
          <p className=" text-sm font-medium me-2 px-2.5 py-0.5 rounded-full ">
            Source: {news.source}
          </p>
          
          </div>
          
          <Button variant="outline" asChild >
            <Link href={news.url} target="_blank" rel="noopener noreferrer"> View </Link>
            </Button>
          
        </CardFooter>
      </Card>
  )
}