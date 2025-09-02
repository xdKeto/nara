const HomeSkeleton = () => {
  return (
    <div className="px-2 select-none animate-pulse">
      <div className="relative z-10 flex flex-col md:flex-row md:mt-6 space-y-4 md:space-y-0 mb-4 md:ms-4">
        <div className="w-full md:w-2/7 lg:w-1/5 py-4 justify-items-center md:justify-items-start space-y-2">
          <div className="h-6 bg-gray-300 rounded w-3/4"></div>
          <div className="h-5 bg-gray-300 rounded w-1/2"></div>
          <div className="h-4 bg-gray-300 rounded w-2/3"></div>
        </div>
        <div className="w-full md:w-1/5 py-2 md:py-6 px-8 justify-end flex flex-col">
          <div className="h-[3px] w-full md:w-96 lg:w-164 bg-gray-300"></div>
        </div>
      </div>

      <div className="mx-auto space-y-4 max-w-5xl px-2">
        <div className="bg-gray-300 rounded-xl w-full h-[400px]"></div>

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-4">
            <div className="bg-gray-300 rounded-xl w-full h-[280px]"></div>
          </div>
          <div className="col-span-8">
            <div className="bg-gray-300 rounded-xl w-full h-[280px]"></div>
          </div>

          <div className="col-span-8">
            <div className="bg-gray-300 rounded-xl w-full h-[280px]"></div>
          </div>
          <div className="col-span-4">
            <div className="bg-gray-300 rounded-xl w-full h-[280px]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeSkeleton;
