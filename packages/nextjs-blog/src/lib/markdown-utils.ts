import { remark } from "remark";
import strip from "strip-markdown";

export function getFirstNWordsFromMarkdown(
    markdownString: string,
    n: number,
): string {
    // Convert markdown to plain text
    const plainText = remark()
        .use(strip)
        .processSync(markdownString)
        .toString();

    // Split the plain text into words
    const words = plainText.split(/\s+/);

    // Return the first n words
    return words.slice(0, n).join(" ");
}
