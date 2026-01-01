import { Trash2 } from "lucide-react";
import React from "react";
import { trackCalendarAction } from "./analytics";
import { Highlight, colors } from "./types";

interface HighlightsListProps {
    highlights: Highlight[];
    onUpdateHighlight: (id: number, field: keyof Highlight, value: any) => void;
    onDeleteHighlight: (id: number) => void;
}

export const HighlightsList: React.FC<HighlightsListProps> = ({
    highlights,
    onUpdateHighlight,
    onDeleteHighlight,
}) => {
    if (highlights.length === 0) {
        return null;
    }

    return (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-4">
                Highlights & Comments
            </h3>
            <div className="space-y-3">
                {highlights.map((highlight) => (
                    <div
                        key={highlight.id}
                        className={`p-3 rounded-lg border-2 ${highlight.color.border} ${highlight.color.bg}`}
                    >
                        <div className="flex items-start gap-3">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-sm font-medium text-gray-700">
                                        {highlight.type === "row"
                                            ? "Row"
                                            : highlight.type === "column"
                                              ? "Column"
                                              : highlight.type === "matrix"
                                                ? "Matrix"
                                                : "Range"}{" "}
                                        highlight •{" "}
                                        {highlight.dayIndices.length} days
                                    </span>
                                    <select
                                        value={colors.findIndex(
                                            (c) =>
                                                c.name === highlight.color.name,
                                        )}
                                        onChange={(e) => {
                                            const newColor =
                                                colors[
                                                    parseInt(e.target.value)
                                                ];
                                            onUpdateHighlight(
                                                highlight.id,
                                                "color",
                                                newColor,
                                            );
                                            trackCalendarAction.changeHighlightColor(
                                                newColor.name,
                                            );
                                        }}
                                        className="text-xs px-2 py-1 border border-gray-300 rounded"
                                    >
                                        {colors.map((color, idx) => (
                                            <option key={idx} value={idx}>
                                                {color.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <input
                                    type="text"
                                    value={highlight.comment}
                                    onChange={(e) => {
                                        const newComment = e.target.value;
                                        const hadComment =
                                            highlight.comment.length > 0;
                                        const hasComment =
                                            newComment.length > 0;

                                        onUpdateHighlight(
                                            highlight.id,
                                            "comment",
                                            newComment,
                                        );

                                        // Track comment addition/removal
                                        if (!hadComment && hasComment) {
                                            trackCalendarAction.addHighlightComment(
                                                true,
                                            );
                                        } else if (hadComment && !hasComment) {
                                            trackCalendarAction.addHighlightComment(
                                                false,
                                            );
                                        }
                                    }}
                                    placeholder="Add a comment..."
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                />
                            </div>
                            <button
                                onClick={() => onDeleteHighlight(highlight.id)}
                                className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                                title="Delete highlight"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
