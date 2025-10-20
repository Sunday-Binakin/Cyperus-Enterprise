export function ProductDetailSkeleton() {
  return (
    <div className="min-h-screen bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="animate-pulse bg-gray-800 h-8 w-48 mb-8"></div>
        <div className="bg-gray-900 rounded-lg shadow-lg overflow-hidden">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 p-6">
            <div className="aspect-w-1 aspect-h-1 w-full bg-gray-800 rounded-lg"></div>
            <div className="space-y-4 mt-10 px-4">
              <div className="h-8 bg-gray-800 rounded w-3/4"></div>
              <div className="h-6 bg-gray-800 rounded w-1/3"></div>
              <div className="h-4 bg-gray-800 rounded w-full"></div>
              <div className="h-4 bg-gray-800 rounded w-5/6"></div>
              <div className="h-12 bg-gray-800 rounded w-full mt-8"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
