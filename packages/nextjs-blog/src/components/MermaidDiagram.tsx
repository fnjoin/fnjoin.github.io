"use client";

import mermaid from "mermaid";
import { useEffect, useRef, useState } from "react";

interface MermaidDiagramProps {
    chart: string;
    className?: string;
}

// Initialize mermaid once
let mermaidInitialized = false;

export function MermaidDiagram({ chart, className = "" }: MermaidDiagramProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [svg, setSvg] = useState<string>("");
    const [error, setError] = useState<string>("");

    useEffect(() => {
        if (!mermaidInitialized) {
            mermaid.initialize({
                startOnLoad: false,
                theme: "default",
                securityLevel: "loose",
                fontFamily: "inherit",
                flowchart: {
                    nodeSpacing: 50,
                    rankSpacing: 80,
                    curve: "basis",
                },
                themeVariables: {
                    primaryColor: "#f9fafb",
                    primaryTextColor: "#1f2937",
                    primaryBorderColor: "#d1d5db",
                    lineColor: "#6b7280",
                    sectionBkgColor: "#f3f4f6",
                    altSectionBkgColor: "#ffffff",
                    gridColor: "#e5e7eb",
                    secondaryColor: "#e5e7eb",
                    tertiaryColor: "#f9fafb",
                },
            });
            mermaidInitialized = true;
        }

        const renderDiagram = async () => {
            try {
                // Generate unique ID for this diagram
                const id = `mermaid-${Math.random().toString(36).substring(2, 11)}`;

                // Render the mermaid diagram to SVG
                const { svg: renderedSvg } = await mermaid.render(id, chart);
                setSvg(renderedSvg);
                setError("");
            } catch (err) {
                console.error("Error rendering Mermaid diagram:", err);
                setError(err instanceof Error ? err.message : "Unknown error");
                setSvg("");
            }
        };

        void renderDiagram();
    }, [chart]);

    if (error) {
        return (
            <div
                className={`mermaid-error border border-red-300 bg-red-50 p-4 rounded-lg ${className}`}
            >
                <div className="text-red-700 font-semibold mb-2">
                    Mermaid Diagram Error:
                </div>
                <div className="text-red-600 text-sm mb-3">{error}</div>
                <details className="text-xs">
                    <summary className="cursor-pointer text-red-500 hover:text-red-700">
                        Show source
                    </summary>
                    <pre className="mt-2 bg-red-100 p-2 rounded overflow-x-auto text-xs font-mono">
                        <code>{chart}</code>
                    </pre>
                </details>
            </div>
        );
    }

    if (!svg) {
        return (
            <div
                className={`mermaid-loading flex items-center justify-center p-8 bg-gray-50 rounded-lg ${className}`}
            >
                <div className="text-gray-500 animate-pulse">
                    Loading diagram...
                </div>
            </div>
        );
    }

    return (
        <div
            ref={ref}
            className={`mermaid-diagram bg-white rounded-lg p-4 shadow-sm border border-gray-200 overflow-x-auto ${className}`}
            style={{
                // Ensure mermaid diagrams don't inherit code block styles
                fontFamily: "inherit",
                fontSize: "inherit",
                lineHeight: "normal",
            }}
            dangerouslySetInnerHTML={{ __html: svg }}
        />
    );
}
