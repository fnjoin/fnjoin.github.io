const WORDS_PER_MINUTE = 200; // Average adult reading speed

export function calculateReadingStats(content: string) {
    // Simple markdown stripping - remove common markdown syntax
    let plainText = content
        // Remove frontmatter
        .replace(/^---[\s\S]*?---\n?/m, "")
        // Remove code blocks
        .replace(/```[\s\S]*?```/g, "")
        // Remove inline code
        .replace(/`[^`]*`/g, "")
        // Remove links but keep text
        .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
        // Remove images
        .replace(/!\[([^\]]*)\]\([^)]*\)/g, "")
        // Remove headers
        .replace(/^#{1,6}\s+/gm, "")
        // Remove bold/italic
        .replace(/\*\*([^*]*)\*\*/g, "$1")
        .replace(/\*([^*]*)\*/g, "$1")
        // Remove blockquotes
        .replace(/^>\s+/gm, "")
        // Remove list markers
        .replace(/^[\s]*[-*+]\s+/gm, "")
        .replace(/^[\s]*\d+\.\s+/gm, "")
        // Remove custom directives
        .replace(/:::[^:]*:::/g, "")
        // Clean up extra whitespace
        .replace(/\s+/g, " ")
        .trim();

    // Count words (split by whitespace, filter empty strings)
    const words = plainText.split(/\s+/).filter((word) => word.length > 0);
    const wordCount = words.length;

    // Calculate reading time (round up to nearest minute, minimum 1)
    const readingTime = Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE));

    return { wordCount, readingTime };
}
