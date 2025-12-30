import * as fs from "fs";
import * as path from "path";
import matter from "gray-matter";
import { calculateReadingStats } from "./reading-stats";
import { MyPost } from "@/interfaces/mypost";

/**
 * Extract all unique tags from a list of posts
 */
export function getAllTags(posts: MyPost[]): string[] {
    const tagSet = new Set<string>();

    posts.forEach((post) => {
        if (post.tags) {
            post.tags.forEach((tag) => tagSet.add(tag));
        }
    });

    return Array.from(tagSet).sort();
}

/**
 * Filter posts by a specific tag
 */
export function getPostsByTag(posts: MyPost[], tag: string): MyPost[] {
    return posts
        .filter((post) => post.tags && post.tags.includes(tag))
        .sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        );
}

/**
 * Get tag counts for all tags
 */
export function getTagCounts(posts: MyPost[]): Record<string, number> {
    const tagCounts: Record<string, number> = {};

    posts.forEach((post) => {
        if (post.tags) {
            post.tags.forEach((tag) => {
                tagCounts[tag] = (tagCounts[tag] || 0) + 1;
            });
        }
    });

    return tagCounts;
}

/**
 * Get optional tag description content from content/tag/tagname.md
 */
export function getTagContent(tag: string): MyPost | null {
    try {
        const tagFilePath = path.join(
            process.cwd(),
            "../../content/tag",
            `${tag}.md`,
        );

        if (!fs.existsSync(tagFilePath)) {
            return null;
        }

        const fileContents = fs.readFileSync(tagFilePath, "utf8");
        const { data, content } = matter(fileContents);

        // Calculate reading stats for the tag content
        const { wordCount, readingTime } = calculateReadingStats(content);

        return {
            ...data,
            content,
            wordCount,
            readingTime,
            slug: tag,
            tags: [],
            author: data.author || "Unknown",
            title: data.title || tag,
            date: data.date || new Date(),
            author_detail: {
                name: data.author || "Unknown",
                picture: "",
                bio: "",
            },
        } as MyPost;
    } catch (error) {
        console.warn(`Failed to load tag content for "${tag}":`, error);
        return null;
    }
}
