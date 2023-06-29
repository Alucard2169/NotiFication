import { useRouter } from "next/router";

import Image from "next/image";
import pfp from '@/public/1.jpg'
import { useState , FC} from "react";
import Link from "next/link";

const Navbar: FC = () => {
    
    
// Get the current route using the useRouter hook
  const router = useRouter();

  // Check if the current route is the homepage (index.tsx)
  const isHomepage = router.pathname === "/";

  // Render the navbar only if it's not the homepage
  if (isHomepage) {
    return null;
  }
  const [select, setSelect] = useState<string>('tech');

    const handleSelect = (prop:string):void => {
        setSelect(prop)
    }



    return ( 
        <nav className="w-screen px-8 py-2 flex justify-between items-center bg-PRIMARY">
            <ul className="flex gap-4 items-center">
                <li className={`${select==='tech' ? 'custom-list':'custom-list-N'} transition-all duration-200`} onClick={()=>handleSelect('tech')}><Link href='/tech'>Tech</Link></li>
                <li className={`${select!=='tech' ? 'custom-list':'custom-list-N'} transition-all duration-200`} onClick={()=>handleSelect('project')}>Projects</li>
            </ul>
 
                <ul className="flex gap-8 items-center">
                    <li className="px-2 py-1 text-white bg-COMPONENT_BG text-MAIN font-semibold rounded-lg cursor-pointer"  >Logout</li>
                    <Image alt="userPfp" className="rounded-full w-10 h-10 object-cover" width={50} height={70} src={pfp} />
                </ul>
         
        </nav>
     );
}
 
export default Navbar;









