import { FC } from "react";

interface FilterMenuProps {
  filterDisplay: boolean;
 
  handleFilterDisplay: () => void;
}


const FilterMenu:FC<FilterMenuProps> = ({filterDisplay,handleFilterDisplay}) => {
    return (
        <form className={`${!filterDisplay ? 'hidden' : null} absolute bg-PRIMARY p-2 z-50 top-10 rounded-md w-56 pl-2 flex flex-col gap-4`}>
        <label htmlFor="language" className="flex flex-col gap-2 bg-MAIN rounded-md p-1">
          Language
          <input type="text" id="language" className="rounded-md p-1 text-MAIN font-semibold focus:outline-none"/>
        </label>
        <label htmlFor="licenses" className="flex flex-col gap-2 bg-MAIN rounded-md p-1">
          Licenses
          <input type="text" id="licenses" className="rounded-md p-1 text-MAIN font-semibold focus:outline-none"/>
        </label>
        <label htmlFor="keywords" className="flex flex-col gap-2 bg-MAIN rounded-md p-1">
          Keywords
          <input type="text" id="keywords" className="rounded-md p-1 text-MAIN font-semibold focus:outline-none"/>
        </label>
        <label htmlFor="platforms" className="flex flex-col gap-2 bg-MAIN rounded-md p-1">
          Platforms
          <input type="text" id="platforms" className="rounded-md p-1 text-MAIN font-semibold focus:outline-none"/>
            </label>
            <input type="submit" value="Submit" className="bg-MAIN text-PRIMARY px-2 py-1 rounded-full hover:bg-white cursor-pointer"/>
      </form>
    );
}
 
export default FilterMenu;