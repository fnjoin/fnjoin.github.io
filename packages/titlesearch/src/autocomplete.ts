/**
 * Query Google's autocomplete endpoint for search suggestions
 * @param prefix The search prefix to get suggestions for
 * @returns Array of suggestion strings
 */
export async function queryComplete(prefix: string): Promise<string[]> {
    const encodedQuery = encodeURIComponent(prefix);
    const url = `https://www.google.com/complete/search?q=${encodedQuery}&client=gws-wiz-serp&hl=en`;

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "User-Agent":
                    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
                Accept: "*/*",
                "Accept-Language": "en-US,en;q=0.9",
                Referer: "https://www.google.com/",
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const text = await response.text();

        // Google returns JSONP response like: window.google.ac.h([[...]])
        // We need to extract just the JSON array part

        // Find the start of the JSON array
        const jsonStart = text.indexOf("[[");
        if (jsonStart === -1) {
            return [];
        }

        // Find the end of the JSON array by counting brackets
        let bracketCount = 0;
        let jsonEnd = jsonStart;
        for (let i = jsonStart; i < text.length; i++) {
            if (text[i] === "[") bracketCount++;
            if (text[i] === "]") bracketCount--;
            if (bracketCount === 0) {
                jsonEnd = i + 1;
                break;
            }
        }

        const jsonText = text.substring(jsonStart, jsonEnd);

        try {
            const data = JSON.parse(jsonText);

            if (!Array.isArray(data) || data.length < 1) {
                return [];
            }

            // The first array contains the suggestions
            const suggestions = data[0] || [];
            if (!Array.isArray(suggestions)) {
                return [];
            }

            return suggestions
                .map((item: any) => {
                    if (Array.isArray(item) && item.length > 0) {
                        // Remove HTML tags from suggestions
                        const suggestion = item[0];
                        if (typeof suggestion === "string") {
                            return suggestion.replace(/<[^>]*>/g, "");
                        }
                    }
                    return "";
                })
                .filter((s: string) => s.length > 0);
        } catch (parseError) {
            return [];
        }
    } catch (error) {
        throw new Error(
            `Failed to fetch autocomplete suggestions: ${error instanceof Error ? error.message : "Unknown error"}`,
        );
    }
}
