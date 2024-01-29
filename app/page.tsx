import SearchForum from "./ui/home/forum";


export default function Home() {

  return (
    <main className="h-full flex justify-center items-center">
      <section className="w-full sm:w-2/5 text-center">
        <h1 className="text-NEUTRAL  font-extrabold text-2xl">
          Welcome to{" "}
          <span className="bg-COMPONENT_BG p-2 pt-3 rounded-md text-MAIN">
            Notify
          </span>
        </h1>
       <SearchForum/>
        <p className="text-NEUTRAL text-sm leading-normal">
          Notify makes it easy to search and subscribe to packages and
          libraries. Stay informed with version update notifications.
        </p>
      </section>
    </main>
  );
}
