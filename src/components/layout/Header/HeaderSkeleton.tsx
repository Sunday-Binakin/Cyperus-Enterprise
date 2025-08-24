export default function HeaderSkeleton() {
  return (
    <div className="fixed top-0 left-0 right-0 z-40 flex flex-col bg-[#4A651F] animate-pulse">
      <div className="flex flex-row justify-between items-center p-2 lg:p-3 w-full px-4 lg:px-8 min-h-[60px]">
        {/* Logo Skeleton */}
        <div className="flex-shrink-0 w-20 md:w-24 lg:w-28 xl:w-32 2xl:w-40">
          <div className="w-full h-8 bg-gray-600 rounded"></div>
        </div>

        {/* Nav links skeleton - hidden on mobile */}
        <div className="hidden md:flex flex-1 justify-center px-1 md:px-1">
          <div className="flex flex-row gap-0.5 md:gap-0.5 lg:gap-2 xl:gap-4 items-center">
            {/* Nav item skeletons */}
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="h-4 bg-gray-600 rounded w-16 md:w-20"></div>
            ))}
          </div>
        </div>

        {/* Right side skeleton */}
        <div className="flex flex-row gap-1 md:gap-1 lg:gap-3 xl:gap-4 items-center flex-shrink-0">
          {/* Cart skeleton */}
          <div className="hidden md:block w-6 h-6 bg-gray-600 rounded"></div>
          
          {/* Subscribe button skeleton */}
          <div className="hidden md:block w-24 lg:w-32 xl:w-40 h-8 bg-gray-600 rounded"></div>

          {/* Mobile menu skeleton */}
          <div className="md:hidden flex items-center gap-2">
            <div className="w-6 h-6 bg-gray-600 rounded"></div>
            <div className="w-6 h-6 bg-gray-600 rounded"></div>
          </div>
        </div>
      </div>

      {/* Search bar skeleton - hidden on mobile */}
      <div className="hidden lg:flex flex-col items-center bg-[#4A651F] py-2 relative z-10 w-full">
        <div className="w-[90%] max-w-[1400px] mx-auto">
          <div className="h-10 bg-gray-600 rounded w-full max-w-md mx-auto"></div>
        </div>
      </div>

      {/* Mobile search bar skeleton */}
      <div className="lg:hidden w-full px-4 pb-2">
        <div className="h-10 bg-gray-600 rounded w-full"></div>
      </div>
    </div>
  );
}
