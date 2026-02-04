import * as path from "path";

/**
 * Transform an image URL to use the optimized webp format
 * Uses the same logic as my-simple-loader.ts for consistency
 *
 * @param src - Original image path (e.g., "/img/post/image.png")
 * @param width - Desired width (default: 1200 for OG images)
 * @param quality - Image quality (default: 85)
 * @returns Transformed image path (e.g., "/img/post/image.w1200q85.webp")
 */
export function getOptimizedImageUrl(
    src: string,
    width: number = 1200,
    quality: number = 85,
): string {
    const ext = src.split(".").pop();
    const basename = path.basename(src, `.${ext}`);
    const dirname = path.dirname(src);
    const outsrc =
        dirname + "/" + basename + ".w" + width + "q" + quality + ".webp";

    return outsrc;
}
