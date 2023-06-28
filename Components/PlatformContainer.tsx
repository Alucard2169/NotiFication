import React, { FC, useRef } from 'react';
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai';
import {BsGlobe} from 'react-icons/bs'

interface PlatformData {
  name: string;
  project_count: number;
  homepage: string | null;
  color: string;
  default_language: string | null;
}

interface PlatformContainerProps {
  data: PlatformData[];
}

const PlatformContainer: FC<PlatformContainerProps> = ({ data }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleLeftScroll = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft -= 500;
    }
  };

  const handleRightScroll = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += 500;
    }
  };

  return (
    <div className='flex flex-col gap-8 items-center justify-center h-fit'>
      <AiFillCaretLeft onClick={handleLeftScroll} className='navIcon'/>
      <div className="scroll-list" ref={scrollRef}>
        {data.map((platform: PlatformData) => (
          <div key={platform.name} style={{ backgroundColor: platform.color }} className="p-2 rounded-md flex flex-col gap-4">
            <h4 className="bg-MAIN rounded-md text-center text-white font-bold px-2 py-1 w-fit">{platform.name}</h4>
            <div className='bg-COMPONENT_BG rounded-md p-2 flex flex-col gap-4'>
              <p className='text-MAIN font-semibold'>Project Count: <span className='text-white bg-PRIMARY p-1 rounded-md font-bold'>{platform.project_count}</span></p>
                    
                      <p className='text-MAIN font-semibold'>Language: {platform.default_language || 'N/A'}</p>
                        {platform.homepage && <p className='bg-MAIN w-fit p-1 rounded-md'><a href={`${platform.homepage}`} target='_blank'><BsGlobe className='text-blue-500 text-2xl'/></a></p>}
                
                </div>
          </div>
        ))}
      </div>
      <AiFillCaretRight onClick={handleRightScroll} className='navIconRight'/>
    </div>
  );
};

export default PlatformContainer;
