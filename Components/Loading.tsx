import { MutatingDots } from "react-loader-spinner";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-full w-full">
      <MutatingDots
        height="100"
        width="100"
        color="#ffffff"
        secondaryColor="#121212"
        radius="12.5"
        ariaLabel="mutating-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
      <MutatingDots
        height="100"
        width="100"
        color="#121212"
        secondaryColor="#ffffff"
        radius="12.5"
        ariaLabel="mutating-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
      <MutatingDots
        height="100"
        width="100"
        color="#ffffff"
        secondaryColor="#121212"
        radius="12.5"
        ariaLabel="mutating-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

export default Loading;
