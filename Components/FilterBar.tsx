const FilterBar = () => {
    return (
      <div className="bg-PRIMARY  w-5/6 mx-auto p-2 rounded-lg">
        <ul className="flex gap-10">
          <li className="text-white font-bold cursor-pointer hover:bg-white hover:text-PRIMARY transition-all duration-200 rounded-md px-1">Filter</li>
          <li className="text-white font-bold cursor-pointer hover:bg-white hover:text-PRIMARY transition-all duration-200 rounded-md px-1">Sort By</li>
        </ul>
      </div>
    );
}
 
export default FilterBar;