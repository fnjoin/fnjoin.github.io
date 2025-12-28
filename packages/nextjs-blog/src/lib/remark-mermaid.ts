import type { Code } from "mdast";
import { Root } from "remark-parse/lib";
import { visit } from "unist-util-visit";

export function remarkMermaid() {
    return function transformer(tree: Root): void {
        visit(tree, "code", (node: Code) => {
            if (node.lang === "mermaid") {
                // Transform mermaid code blocks into a custom component
                const data = node.data || (node.data = {});
                data.hName = "div";
                data.hProperties = {
                    className: ["mermaid-code"],
                    "data-mermaid": node.value,
                    "data-element": "mermaid",
                };
            }
        });
    };
}
