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
        <div className={`text-xs text-gray-400 ${className}`}>
            {wordCount.toLocaleString()} words · {readingTime} min read
        </div>
    );
}
