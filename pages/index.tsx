import { FC } from 'react'
import PlatformContainer from '@/Components/PlatformContainer'


interface platformData {
  name: string,
  project_count: number,
  homepage: string | null,
  color: string,
  default_language: string | null,
}

interface homeProps {
  platformData: platformData[]
}

const Home:FC<homeProps> = ({platformData}) => {


  return (
    <div className='bg-MAIN flex flex-col p-2 w-screen'>
      <h1>Techs</h1>
      <div className='mt-8 flex flex-col gap-8'>
         <h3 className='text-white text-xl font-bold'>Available Package Managers</h3>
      <PlatformContainer data={platformData}/>
     </div>
    </div>
    )
}

export default Home;

export async function getServerSideProps() {
  try {
      // get platforms
  const response = await fetch(`https://libraries.io/api/platforms?api_key=${process.env.NEXT_PUBLIC_LIB_API_KEY}`);
    const platformData = await response.json();

  

  return {
    props: {
      // Add any server-side data you want to pass as props
      platformData
    },
  };
  } catch (err) {
    console.log(err)
    return {
      props: {
        
      }
    }
  }
}