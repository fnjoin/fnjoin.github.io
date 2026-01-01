// Google Analytics tracking utilities for Calendar Matrix app

declare global {
    interface Window {
        gtag: (command: string, action: string, parameters: any) => void;
    }
}

export const trackCalendarEvent = (
    action: string,
    label?: string,
    value?: number,
) => {
    if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", action, {
            event_category: "Calendar_Matrix",
            event_label: label,
            value: value,
        });
    }
};

// Specific tracking functions for different calendar actions
export const trackCalendarAction = {
    // Calendar management
    createCalendar: () => trackCalendarEvent("create_calendar"),
    deleteCalendar: () => trackCalendarEvent("delete_calendar"),
    editCalendar: () => trackCalendarEvent("edit_calendar_name"),

    // Calendar operations
    shareCalendar: () => trackCalendarEvent("share_calendar"),
    copyCalendar: () => trackCalendarEvent("copy_calendar"),
    clearHighlights: () => trackCalendarEvent("clear_highlights"),

    // Calendar configuration
    changeYear: (year: number) =>
        trackCalendarEvent("change_year", year.toString()),
    changeDaysPerRow: (days: number) =>
        trackCalendarEvent("change_days_per_row", days.toString()),

    // Highlighting actions with detailed tracking
    createHighlight: (
        type: "row" | "column" | "range" | "matrix",
        method?: string,
        size?: number,
    ) => {
        trackCalendarEvent("create_highlight", type);
        if (method) {
            trackCalendarEvent("highlight_method", `${type}_${method}`);
        }
        if (size !== undefined) {
            trackCalendarEvent("highlight_size", type, size);
        }
    },

    // Detailed selection method tracking
    selectByDrag: (
        type: "range" | "matrix",
        dayCount: number,
        isShiftHeld: boolean,
    ) => {
        const method = isShiftHeld ? "shift_drag" : "normal_drag";
        trackCalendarEvent("selection_method", `${type}_${method}`, dayCount);
    },

    selectByButton: (type: "row" | "column", size: number) => {
        trackCalendarEvent("selection_method", `${type}_button`, size);
    },

    // Range size analytics
    trackRangeSize: (
        type: "row" | "column" | "range" | "matrix",
        dayCount: number,
    ) => {
        let sizeCategory = "small"; // 1-7 days
        if (dayCount > 30)
            sizeCategory = "large"; // 30+ days
        else if (dayCount > 7) sizeCategory = "medium"; // 8-30 days

        trackCalendarEvent(
            "range_size_category",
            `${type}_${sizeCategory}`,
            dayCount,
        );
    },

    // Highlight interaction patterns
    updateHighlight: (field: string) =>
        trackCalendarEvent("update_highlight", field),
    deleteHighlight: () => trackCalendarEvent("delete_highlight"),
    changeHighlightColor: (colorName: string) =>
        trackCalendarEvent("change_highlight_color", colorName),
    addHighlightComment: (hasComment: boolean) =>
        trackCalendarEvent(
            "highlight_comment",
            hasComment ? "added" : "removed",
        ),

    // Navigation
    switchCalendar: () => trackCalendarEvent("switch_calendar"),
    viewUsageInstructions: () => trackCalendarEvent("view_usage_instructions"),
};
