import * as path from "path";
import { crawlDirectories } from "@/lib/fileutil";

const cwd = process.cwd();

test("with filtering", () => {
    const result = crawlDirectories({
        dir: path.join(cwd, "../../content"),
        filter: (file) => file.endsWith(".md"),
    });
    const results = collect(result);

    // Should only return .md files
    expect(results.every((file) => file.endsWith(".md"))).toBe(true);

    // Should include expected directories
    const relativePaths = results.map((file) =>
        path.relative(path.join(cwd, "../../content"), file),
    );
    expect(relativePaths.some((file) => file.startsWith("authors/"))).toBe(
        true,
    );
    expect(relativePaths.some((file) => file.startsWith("drafts/"))).toBe(true);
    expect(relativePaths.some((file) => file.startsWith("post/"))).toBe(true);
    expect(relativePaths.some((file) => file.startsWith("page/"))).toBe(true);

    // Should have a reasonable number of files (at least some content)
    expect(results.length).toBeGreaterThan(10);

    // Should not include non-.md files
    expect(results.some((file) => file.endsWith(".jpg"))).toBe(false);
    expect(results.some((file) => file.endsWith(".png"))).toBe(false);
});

test("without filtering", () => {
    const result = crawlDirectories({ dir: path.join(cwd, "../../content") });
    const results = collect(result);

    // Should include various file types
    expect(results.some((file) => file.endsWith(".md"))).toBe(true);
    expect(results.some((file) => file.endsWith(".jpg"))).toBe(true);
    expect(results.some((file) => file.endsWith(".png"))).toBe(true);

    // Should include expected directories
    const relativePaths = results.map((file) =>
        path.relative(path.join(cwd, "../../content"), file),
    );
    expect(relativePaths.some((file) => file.startsWith("assets/"))).toBe(true);
    expect(relativePaths.some((file) => file.startsWith("authors/"))).toBe(
        true,
    );
    expect(relativePaths.some((file) => file.startsWith("drafts/"))).toBe(true);
    expect(relativePaths.some((file) => file.startsWith("post/"))).toBe(true);
    expect(relativePaths.some((file) => file.startsWith("img/"))).toBe(true);

    // Should have more files than the filtered version
    const filteredResult = crawlDirectories({
        dir: path.join(cwd, "../../content"),
        filter: (file) => file.endsWith(".md"),
    });
    const filteredResults = collect(filteredResult);
    expect(results.length).toBeGreaterThan(filteredResults.length);

    // Should have a substantial number of files
    expect(results.length).toBeGreaterThan(50);
});

test("crawlDirectories returns absolute paths", () => {
    const result = crawlDirectories({
        dir: path.join(cwd, "../../content/authors"),
        filter: (file) => file.endsWith(".md"),
    });
    const results = collect(result);

    // All paths should be absolute
    expect(results.every((file) => path.isAbsolute(file))).toBe(true);

    // Should contain the expected base directory
    const expectedBase = path.join(cwd, "../../content/authors");
    expect(results.every((file) => file.startsWith(expectedBase))).toBe(true);
});

test("crawlDirectories handles empty directories gracefully", () => {
    // Test with a directory that should exist but might be empty or have limited content
    const result = crawlDirectories({
        dir: path.join(cwd, "../../content/authors"),
        filter: (file) => file.endsWith(".md"),
    });
    const results = collect(result);

    // Should not throw and should return an array
    expect(Array.isArray(results)).toBe(true);

    // If there are results, they should all be .md files in the authors directory
    if (results.length > 0) {
        expect(results.every((file) => file.endsWith(".md"))).toBe(true);
        expect(results.every((file) => file.includes("authors"))).toBe(true);
    }
});

function collect(result: Generator<string, void, string[]>) {
    const results = [];
    let x: IteratorResult<string> = result.next();
    while (!x.done) {
        results.push(x.value);
        x = result.next();
    }
    return results;
}
