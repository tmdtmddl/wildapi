const RootLoading = () => {
  return (
    <div className="h-screen w-full justify-center items-center flex flex-col gap-y-2.5">
      <div className="relative animate-spin">
        <div className="size-6 border-4 box-border border-green-800 rounded-full animate-pulse" />
        <span className="absolute top-0 right-0 size-3 bg-white opacity-5" />
      </div>
      <p className="animate-pulse">Loading...</p>
    </div>
  );
};

export default RootLoading;
