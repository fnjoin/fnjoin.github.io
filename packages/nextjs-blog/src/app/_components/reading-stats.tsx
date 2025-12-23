interface ReadingStatsProps {
    wordCount: number;
    readingTime: number;
    className?: string;
}

export function ReadingStats({
    wordCount,
    readingTime,
    className = "",
}: ReadingStatsProps) {
    return (
        <div
            className={`text-xs text-gray-400 mr-2 mb-2 col-start-4 col-end-10 col-span-6 ${className}`}
        >
            {wordCount.toLocaleString()} words · {readingTime} min read
        </div>
    );
}
