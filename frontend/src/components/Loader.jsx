const Loader = () => {
  return (
    <div className="flex items-center justify-center h-full p-4">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 border-4 border-gray-700 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
        <p className="text-gray-400 text-sm font-medium">Loading...</p>
      </div>
    </div>
  );
};

export default Loader;