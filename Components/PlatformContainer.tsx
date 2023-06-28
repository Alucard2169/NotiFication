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
      scrollRef.current.scrollLeft -= 400;
    }
  };

  const handleRightScroll = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += 400;
    }
  };

  return (
    <div className='flex flex-col gap-8 items-center justify-center h-fit'>
      <AiFillCaretLeft onClick={handleLeftScroll} className='navIcon'/>
      <div className="scroll-list" ref={scrollRef}>
        {data.map((platform: PlatformData) => (
          <div key={platform.name} style={{ backgroundColor: platform.color }} className="p-2 rounded-md flex flex-col gap-4">
            <h4 className="bg-MAIN rounded-md text-center text-white font-bold px-2 w-fit">{platform.name}</h4>
            <div className='bg-COMPONENT_BG rounded-md p-2 flex flex-col gap-4'>
              <p className='text-MAIN font-semibold'>Project Count: <span className='text-PRIMARY font-bold'>{platform.project_count}</span></p>
                    <ul className='flex gap-2 items-center'>
                        {platform.homepage && <li><a href={`${platform.homepage}`} target='_blank'><BsGlobe className='text-blue-500 text-2xl'/></a></li>}
                        {platform.default_language && <li className='text-MAIN font-semibold'>{platform.default_language}</li>}
                </ul>
                </div>
          </div>
        ))}
      </div>
      <AiFillCaretRight onClick={handleRightScroll} className='navIconRight'/>
    </div>
  );
};

export default PlatformContainer;
