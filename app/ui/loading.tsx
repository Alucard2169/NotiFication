import { PropagateLoader } from "react-spinners";

export const Loading = () => {
  return (
    <div className="h-screen bg-MAIN flex justify-center items-center">
      <PropagateLoader color="#36d7b7" />
    </div>
  );
};
