
import CardContainer from "../ui/query/cardContainer";
import Sort from "../ui/query/sort/sort";

const Page = () => {
  
  return (
    <main className="grid grid-cols-1 sm:grid-cols-[40%,60%] w-full">
      <div className="mt-16">
        <h1 className="font-bold text-xl">Sort</h1>
        <Sort/>
      </div>
      <CardContainer />
    </main>
  );
};

export default Page;
