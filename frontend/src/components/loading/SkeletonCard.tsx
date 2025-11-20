export function SkeletonCard() {
    return (
        <div className="bg-gray-200 rounded-lg h-64 animate-pulse">
            <div className="h-40 bg-gray-300 rounded-t-lg" />
            <div className="p-4 space-y-3">
                <div className="h-4 bg-gray-300 rounded w-3/4" />
                <div className="h-3 bg-gray-300 rounded w-full" />
                <div className="h-3 bg-gray-300 rounded w-2/3" />
            </div>
        </div>
    );
}