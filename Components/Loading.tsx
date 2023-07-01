import Image from "next/image";
import { FC } from "react";
import loadingGIF from '@/public/loading.gif'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const Loading = () => {
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleStart = () => {
      setLoading(true);
    };

    const handleComplete = () => {
      setLoading(false);
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router]);

  if (isLoading) {
    return (<div className="text-center flex flex-col gap-8 justify-center items-center w-screen h-screen">
            <Image src={loadingGIF} alt="loading animation" width={400} height={200} />
            <p className="text-white font-bold">Loading...</p>
         </div>);
  }

  return null;
};

export default Loading;
