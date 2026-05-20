export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        <div className="h-14 w-14 rounded-full border-4 border-gray-300 border-t-blue-600 animate-spin"></div>
        <p className="text-lg font-semibold text-gray-700 animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  );
}