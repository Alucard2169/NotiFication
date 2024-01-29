

interface ReleaseProps {
  stable: string;
  stable_date: string;
  latest: string;
  latest_date: string;
}

export const formatDate = (date: string) => {
  const dateString: string = date;
  const dateObject: Date = new Date(dateString);

  // Format the date
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZoneName: "short",
  };

  const formattedDate: string = dateObject.toLocaleDateString("en-US", options);

  return formattedDate;
};

const Releases = ({ data }: { data: ReleaseProps }) => {
  
  


  const { stable, stable_date, latest, latest_date } = data;

    return (
      <section className="mt-8">
        <h4 className="text-blue-500  text-xl font-bold">Releases</h4>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-8 mt-4">
          {stable && (
            <div className="bg-PRIMARY_BG py-2 px-4 rounded-md">
              <p className="text-MAIN text-sm sm:text-md font-bold">
                Latest Stable Release{" "}
                <span className="text-NEUTRAL font-normal text-sm sm:text-md">
                  {stable}
                </span>
              </p>
              <p className="text-MAIN font-bold mt-2 text-sm sm:text-md">
                Published At{" "}
                <span className="text-NEUTRAL font-normal text-sm sm:text-md">
                  {formatDate(stable_date)}
                </span>
              </p>
            </div>
          )}

          {latest && (
            <div className="bg-PRIMARY_BG py-2 px-4 rounded-md">
              <p className="text-MAIN font-bold text-sm sm:text-md">
                Latest Release Number{" "}
                <span className="text-NEUTRAL font-normal text-sm sm:text-md">
                  {latest}
                </span>
              </p>
              <p className="text-MAIN font-bold mt-2 text-sm sm:text-md">
                Published At{" "}
                <span className="text-NEUTRAL font-normal text-sm sm:text-md">
                  {formatDate(latest_date)}
                </span>
              </p>
            </div>
          )}
        </div>
      </section>
    );
}
 
export default Releases;