"use client"

import { Stack, StackDivider, VStack } from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import AlertBox from "../alertDialog";

import { SortContext, SortContextProps } from "@/context/sortContext";
import { Loading } from "../loading";
import CardComponent from "./card";



export interface CardContainerProps {
  rank: number;
  forks: number;
  name: string;
  homepage: string;
  stars: string;
  platform: string;
  description: string;
  language: string;
  latest_release_number: string;
  latest_release_published_at: string;
}

const CardContainer = () => {
  const params: { query: string } = useParams();
  const { sort } = useContext<SortContextProps>(SortContext)
  const { Licenses, Languages, Keywords, Platforms } = sort;
  const { query } = params;
  const [data, setData] = useState <CardContainerProps[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading]  = useState(true);

  const fetchData = async (query: string) => {
    try {
      const key = process.env.NEXT_PUBLIC_API_KEY;
      if (!key) throw new Error("API key is not set");
      setIsLoading(true);

      // Construct the base URL
      let apiUrl = `https://libraries.io/api/search?q=${encodeURIComponent(
        query
      )}&api_key=${key}&per_page=10`;

      // Check if any property in the sort object is not empty
      if (Licenses || Languages || Keywords || Platforms) {
        // Include sort parameters in the URL if they are not empty
        apiUrl += `&licenses=${encodeURIComponent(
          Licenses
        )}&languages=${encodeURIComponent(
          Languages
        )}&keyword=${encodeURIComponent(
          Keywords
        )}&platforms=${encodeURIComponent(Platforms)}`;
      }


      const response = await fetch(apiUrl, { next: { revalidate: 3600 } });

      if (!response.ok) {
        // Handle HTTP errors
        const error = await response.text();
        throw new Error(error);
      }

      const data = await response.json();
      setData(data);
      setIsLoading(false);
    } catch (error : any) {
      // Type check for error handling
      console.log(error)
      if (error instanceof Error) {
        setError(error.message)
        setIsLoading(false);
      }

      setError("An unexpected error occurred");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(query)
  },[query,sort])

  if (error) {
    return (
      <div className="mt-10 w-full sm:w-1/2 mx-auto flex flex-col justify-center gap-8">
        <AlertBox
          status="error"
          title="Response Error"
          description={`${error} request`}
        />
        
      </div>
    );
  }

  if (data && data.length === 0) {
    return (
      <div className="mt-10 w-full sm:w-1/2 mx-auto flex flex-col justify-center gap-8">
        <AlertBox
          status="warning"
          title="Response Error"
          description="No data available for specific request"
        />
      </div>
    );
  }

  if (isLoading) {
    return <Loading/>
  }

  return (
    <div className="w-full  mt-[19px] p-4 sm:p-6 pt-0 rounded-md max-h-[35rem] overflow-scroll scroll-smooth">
      <VStack
        divider={<StackDivider borderColor="gray.200" />}
        spacing={4}
        align="stretch"
      >
        <Stack spacing="4">
          {data &&
            data.map((result: CardContainerProps, i: number) => (
              <CardComponent key={i} data={result} />
            ))}
        </Stack>
      </VStack>
    </div>
  );
};

export default CardContainer;
