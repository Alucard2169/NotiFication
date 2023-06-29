import { FC } from 'react'

import PlatformContainer from '@/Components/PlatformContainer'
import PreviewTech from '@/Components/PreviewTech'


interface platformData {
  name: string,
  project_count: number,
  homepage: string | null,
  color: string,
  default_language: string | null,
}

interface techData {
  contributions_count: number,
  dependent_repos_count: number,
  dependents_count: number,
  deprecation_reason: null | string,
  description: string,
  forks: number,
  homepage: string,
  keywords: string[],
  language: string,
  latest_download_url: string,
  latest_release_number: string,
  latest_release_published_at: string,
  latest_stable_release_number:string,
  latest_stable_release_published_at: string,
  license_normalized: boolean,
  licenses: string,
  name: string,
  normalized_licenses: string[],
  package_manager_url: string,
  platform: string,
  rank: number,
  repository_license: string,
  repository_status: null | string,
  repository_url: string,
  stars: number,
  status: null | string,
  versions: versions[]
}

interface versions {
  number: string,
  published_at: string,
  spdx_expression: string,
  original_license: string,
  researched_at: null | string,
  repository_sources: string[]
}

interface homeProps {
  platformData: platformData[],
  techResult : techData[]
}

const Tech:FC<homeProps> = ({platformData,techResult}) => {


  return (
    <div className='bg-MAIN flex flex-col gap-8 p-4 w-screen'>
      <div className='flex flex-col gap-8'>
        <h3 className='text-white text-xl font-bold'>Available Package Managers <span className='text-COMPONENT_BG text-md'>{platformData.length}</span></h3>
      <PlatformContainer data={platformData}/>
      </div>
      <div className='flex flex-col gap-8'>
        <h3 className='text-white text-xl font-bold'>Tech</h3>
        <PreviewTech data={techResult} />
      </div>
    </div>
    )
}

export default Tech;

export async function getServerSideProps() {
  try {
    const apiBaseUrl = 'https://libraries.io/api';
    const apiKey = process.env.NEXT_PUBLIC_LIB_API_KEY;

    const [platformResponse, reactResponse] = await Promise.all([
      fetch(`${apiBaseUrl}/platforms?api_key=${apiKey}`).then(response => response.json()),
      fetch(`${apiBaseUrl}/search?q=react&api_key=${apiKey}`).then(response => response.json()),
    ]);

    const platformData = platformResponse;
    const rawTechData = reactResponse.slice(0,9)
    const techResult = rawTechData ;

    return {
      props: {
        platformData,
        techResult
        // Add any server-side data you want to pass as props
      }
    };
  } catch (err) {
    console.log(err);
    return {
      props: {}
    };
  }
}
