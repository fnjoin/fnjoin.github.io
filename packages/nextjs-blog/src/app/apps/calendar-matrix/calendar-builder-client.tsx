"use client";

import { Calendar, HelpCircle } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect, useCallback } from "react";
import { trackCalendarAction } from "./analytics";
import { CalendarControls } from "./calendar-controls";
import { CalendarGrid } from "./calendar-grid";
import { CalendarTabs } from "./calendar-tabs";
import { HighlightsList } from "./highlights-list";
import {
    CalendarData,
    Highlight,
    DragState,
    colors,
    monthNames,
    dayNames,
} from "./types";
import { UsageInstructions } from "./usage-instructions";

const CalendarBuilderClient = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Calendar management
    const [calendars, setCalendars] = useState<CalendarData[]>([]);
    const [currentCalendarId, setCurrentCalendarId] = useState<string>("");
    const [editingCalendarName, setEditingCalendarName] = useState<
        string | null
    >(null);

    // Current calendar state
    const [year, setYear] = useState(new Date().getFullYear());
    const [daysPerRow, setDaysPerRow] = useState(7);
    const [highlights, setHighlights] = useState<Highlight[]>([]);

    // UI state (non-persistent)
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState<DragState | null>(null);
    const [dragCurrent, setDragCurrent] = useState<DragState | null>(null);
    const [isShiftPressed, setIsShiftPressed] = useState(false);

    // Load calendars from localStorage on mount
    useEffect(() => {
        try {
            // Check for shared calendar in URL first
            const sharedData = searchParams.get("share");

            if (sharedData) {
                try {
                    const decodedData = atob(decodeURIComponent(sharedData));
                    const sharedCalendar: CalendarData =
                        JSON.parse(decodedData);

                    // Load existing calendars
                    const savedCalendars = localStorage.getItem(
                        "calendar-builder-calendars",
                    );
                    const existingCalendars: CalendarData[] = savedCalendars
                        ? JSON.parse(savedCalendars)
                        : [];

                    // Check if this calendar already exists
                    const existingCalendar = existingCalendars.find(
                        (c) => c.id === sharedCalendar.id,
                    );

                    if (!existingCalendar) {
                        // Add shared calendar to existing calendars
                        const updatedCalendars = [
                            ...existingCalendars,
                            sharedCalendar,
                        ];
                        setCalendars(updatedCalendars);
                        localStorage.setItem(
                            "calendar-builder-calendars",
                            JSON.stringify(updatedCalendars),
                        );
                    } else {
                        setCalendars(existingCalendars);
                    }

                    // Load the shared calendar
                    setCurrentCalendarId(sharedCalendar.id);
                    loadCalendar(
                        sharedCalendar.id,
                        existingCalendar
                            ? existingCalendars
                            : [...existingCalendars, sharedCalendar],
                        false,
                    );

                    // Clean up URL
                    const params = new URLSearchParams(searchParams.toString());
                    params.delete("share");
                    params.set("calendar", sharedCalendar.id);
                    router.replace(
                        `/apps/calendar-matrix?${params.toString()}`,
                    );
                    return;
                } catch (shareError) {
                    console.warn("Error loading shared calendar:", shareError);
                }
            }

            const savedCalendars = localStorage.getItem(
                "calendar-builder-calendars",
            );
            const savedCurrentId = localStorage.getItem(
                "calendar-builder-current-id",
            );

            if (savedCalendars) {
                const parsedCalendars: CalendarData[] =
                    JSON.parse(savedCalendars);
                setCalendars(parsedCalendars);

                // Priority: URL param > saved current ID > first calendar
                const urlCalendarId = searchParams.get("calendar");

                if (
                    urlCalendarId &&
                    parsedCalendars.find((c) => c.id === urlCalendarId)
                ) {
                    // URL has valid calendar ID
                    setCurrentCalendarId(urlCalendarId);
                    loadCalendar(urlCalendarId, parsedCalendars, false);
                } else if (
                    savedCurrentId &&
                    parsedCalendars.find((c) => c.id === savedCurrentId)
                ) {
                    // Use saved current ID and update URL
                    setCurrentCalendarId(savedCurrentId);
                    loadCalendar(savedCurrentId, parsedCalendars, true);
                } else if (parsedCalendars.length > 0) {
                    // Use first calendar and update URL
                    setCurrentCalendarId(parsedCalendars[0].id);
                    loadCalendar(parsedCalendars[0].id, parsedCalendars, true);
                }
            } else {
                // Create default calendar
                createNewCalendar("My Calendar");
            }
        } catch (error) {
            console.warn("Error loading calendars:", error);
            createNewCalendar("My Calendar");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams, router]);

    // Save calendars to localStorage whenever calendars change
    useEffect(() => {
        if (calendars.length > 0) {
            localStorage.setItem(
                "calendar-builder-calendars",
                JSON.stringify(calendars),
            );
            localStorage.setItem(
                "calendar-builder-current-id",
                currentCalendarId,
            );
        }
    }, [calendars, currentCalendarId]);

    // Save current calendar data whenever it changes
    useEffect(() => {
        if (currentCalendarId && calendars.length > 0) {
            saveCurrentCalendar();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [year, daysPerRow, highlights, currentCalendarId, calendars.length]);

    // Add keyboard event listeners for shift key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Shift") {
                setIsShiftPressed(true);
            }
        };

        const handleKeyUp = (e: KeyboardEvent) => {
            if (e.key === "Shift") {
                setIsShiftPressed(false);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, []);

    const generateId = () => {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    };

    const createNewCalendar = useCallback(
        (name: string = "New Calendar") => {
            const newCalendar: CalendarData = {
                id: generateId(),
                name,
                year: new Date().getFullYear(),
                daysPerRow: 7,
                highlights: [],
                createdAt: Date.now(),
                updatedAt: Date.now(),
            };

            setCalendars((prev) => [...prev, newCalendar]);
            setCurrentCalendarId(newCalendar.id);

            // Set the calendar data directly instead of calling loadCalendar
            setYear(newCalendar.year);
            setDaysPerRow(newCalendar.daysPerRow);
            setHighlights(newCalendar.highlights);

            // Update URL
            const params = new URLSearchParams(searchParams.toString());
            params.set("calendar", newCalendar.id);
            router.push(`/apps/calendar-matrix?${params.toString()}`);
        },
        [searchParams, router],
    );

    const loadCalendar = useCallback(
        (
            calendarId: string,
            calendarList: CalendarData[] = calendars,
            updateUrl: boolean = true,
        ) => {
            const calendar = calendarList.find((c) => c.id === calendarId);
            if (calendar) {
                setYear(calendar.year);
                setDaysPerRow(calendar.daysPerRow);
                setHighlights(calendar.highlights);
                setCurrentCalendarId(calendarId);

                // Update URL parameter if requested
                if (updateUrl) {
                    const params = new URLSearchParams(searchParams.toString());
                    params.set("calendar", calendarId);
                    router.push(`/apps/calendar-matrix?${params.toString()}`);
                }
            }
        },
        [calendars, searchParams, router],
    );

    const saveCurrentCalendar = useCallback(() => {
        if (!currentCalendarId) return;

        setCalendars((prev) =>
            prev.map((calendar) =>
                calendar.id === currentCalendarId
                    ? {
                          ...calendar,
                          year,
                          daysPerRow,
                          highlights,
                          updatedAt: Date.now(),
                      }
                    : calendar,
            ),
        );
    }, [currentCalendarId, year, daysPerRow, highlights]);

    const deleteCalendar = (calendarId: string) => {
        if (calendars.length <= 1) {
            alert("Cannot delete the last calendar");
            return;
        }

        if (
            confirm(
                "Are you sure you want to delete this calendar? This cannot be undone.",
            )
        ) {
            const newCalendars = calendars.filter((c) => c.id !== calendarId);
            setCalendars(newCalendars);

            if (currentCalendarId === calendarId) {
                const nextCalendar = newCalendars[0];
                setCurrentCalendarId(nextCalendar.id);
                loadCalendar(nextCalendar.id, newCalendars, true);
            }
        }
    };

    const renameCalendar = (calendarId: string, newName: string) => {
        setCalendars((prev) =>
            prev.map((calendar) =>
                calendar.id === calendarId
                    ? { ...calendar, name: newName, updatedAt: Date.now() }
                    : calendar,
            ),
        );
        setEditingCalendarName(null);
    };

    const getCurrentCalendar = () => {
        return calendars.find((c) => c.id === currentCalendarId);
    };

    const getDaysInMonth = (yearParam: number, monthParam: number): number => {
        return new Date(yearParam, monthParam + 1, 0).getDate();
    };

    const getTotalDaysInYear = () => {
        let total = 0;
        for (let month = 0; month < 12; month++) {
            total += getDaysInMonth(year, month);
        }
        return total;
    };

    const isLeapYear = (yearParam: number): boolean => {
        return (
            (yearParam % 4 === 0 && yearParam % 100 !== 0) ||
            yearParam % 400 === 0
        );
    };

    const addHighlight = (
        type: "row" | "column" | "range" | "matrix",
        index: number | null,
        dayIndices: number[] | null = null,
        matrixCells: number[] | null = null,
    ) => {
        const newHighlight: Highlight = {
            id: Date.now(),
            type,
            index,
            comment: "",
            color: colors[highlights.length % colors.length],
            dayIndices: dayIndices || getDayIndicesForHighlight(type, index),
            matrixCells: matrixCells || undefined,
        };
        setHighlights([...highlights, newHighlight]);

        // Enhanced analytics tracking
        const dayCount = newHighlight.dayIndices.length;
        trackCalendarAction.createHighlight(type, undefined, dayCount);
        trackCalendarAction.trackRangeSize(type, dayCount);
    };

    const getDayIndicesForHighlight = (
        type: "row" | "column" | "range" | "matrix",
        index: number | null,
    ): number[] => {
        if (index === null) return [];

        const yearDays = generateYearDays();
        const totalCells = Math.ceil(yearDays.length / daysPerRow) * daysPerRow;

        if (type === "row") {
            // Get all day indices in this row
            const dayIndices: number[] = [];
            const startIndex = index * daysPerRow;
            const endIndex = Math.min(startIndex + daysPerRow, totalCells);

            for (let i = startIndex; i < endIndex; i++) {
                if (i < yearDays.length && yearDays[i].dayIndex !== null) {
                    dayIndices.push(yearDays[i].dayIndex!);
                }
            }
            return dayIndices;
        } else if (type === "column") {
            // Get all day indices in this column
            const dayIndices: number[] = [];
            const numRows = Math.ceil(yearDays.length / daysPerRow);

            for (let row = 0; row < numRows; row++) {
                const cellIndex = row * daysPerRow + index;
                if (
                    cellIndex < yearDays.length &&
                    yearDays[cellIndex].dayIndex !== null
                ) {
                    dayIndices.push(yearDays[cellIndex].dayIndex!);
                }
            }
            return dayIndices;
        }

        return [];
    };

    const generateYearDays = () => {
        const allDays: any[] = [];
        const firstDayOfYear = new Date(year, 0, 1).getDay();

        // Add empty cells for days before the year starts
        for (let i = 0; i < firstDayOfYear; i++) {
            allDays.push({
                day: null,
                month: null,
                dayOfWeek: i,
                dayIndex: null,
            });
        }

        let dayIndex = 0;
        for (let month = 0; month < 12; month++) {
            const daysInMonth = getDaysInMonth(year, month);

            for (let day = 1; day <= daysInMonth; day++) {
                const date = new Date(year, month, day);
                const dayOfWeek = date.getDay();
                allDays.push({ day, month, dayOfWeek, date, dayIndex });
                dayIndex++;
            }
        }

        return allDays;
    };

    const updateHighlight = (
        id: number,
        field: keyof Highlight,
        value: any,
    ) => {
        setHighlights(
            highlights.map((h) => (h.id === id ? { ...h, [field]: value } : h)),
        );
        trackCalendarAction.updateHighlight(field as string);
    };

    const deleteHighlight = (id: number) => {
        setHighlights(highlights.filter((h) => h.id !== id));
        trackCalendarAction.deleteHighlight();
    };

    const handleMouseDown = (dayIndex: number | null, matrixIndex: number) => {
        const row = Math.floor(matrixIndex / daysPerRow);
        const col = matrixIndex % daysPerRow;

        const dragState: DragState = {
            dayIndex,
            matrixIndex,
            row,
            col,
        };

        setIsDragging(true);
        setDragStart(dragState);
        setDragCurrent(dragState);
    };

    const handleMouseEnter = (dayIndex: number | null, matrixIndex: number) => {
        if (isDragging) {
            const row = Math.floor(matrixIndex / daysPerRow);
            const col = matrixIndex % daysPerRow;

            const dragState: DragState = {
                dayIndex,
                matrixIndex,
                row,
                col,
            };

            setDragCurrent(dragState);
        }
    };

    const handleMouseUp = () => {
        if (isDragging && dragStart && dragCurrent) {
            if (isShiftPressed) {
                // Matrix selection - create highlight for rectangular area
                const minRow = Math.min(dragStart.row, dragCurrent.row);
                const maxRow = Math.max(dragStart.row, dragCurrent.row);
                const minCol = Math.min(dragStart.col, dragCurrent.col);
                const maxCol = Math.max(dragStart.col, dragCurrent.col);

                const yearDays = generateYearDays();
                const matrixCells: number[] = [];
                const dayIndices: number[] = [];

                for (let row = minRow; row <= maxRow; row++) {
                    for (let col = minCol; col <= maxCol; col++) {
                        const cellIndex = row * daysPerRow + col;
                        matrixCells.push(cellIndex);

                        if (
                            cellIndex < yearDays.length &&
                            yearDays[cellIndex].dayIndex !== null
                        ) {
                            dayIndices.push(yearDays[cellIndex].dayIndex);
                        }
                    }
                }

                if (dayIndices.length > 0) {
                    addHighlight("matrix", null, dayIndices, matrixCells);
                    trackCalendarAction.selectByDrag(
                        "matrix",
                        dayIndices.length,
                        true,
                    );
                }
            } else {
                // Date range selection
                if (
                    dragStart.dayIndex !== null &&
                    dragCurrent.dayIndex !== null
                ) {
                    const startDay = Math.min(
                        dragStart.dayIndex,
                        dragCurrent.dayIndex,
                    );
                    const endDay = Math.max(
                        dragStart.dayIndex,
                        dragCurrent.dayIndex,
                    );
                    const dayIndices: number[] = [];

                    for (let i = startDay; i <= endDay; i++) {
                        dayIndices.push(i);
                    }

                    if (dayIndices.length > 0) {
                        addHighlight("range", null, dayIndices);
                        trackCalendarAction.selectByDrag(
                            "range",
                            dayIndices.length,
                            false,
                        );
                    }
                }
            }
        }
        setIsDragging(false);
        setDragStart(null);
        setDragCurrent(null);
    };

    // Sharing and export functions
    const generateShareableLink = () => {
        const currentCalendar = getCurrentCalendar();
        if (!currentCalendar) return "";

        try {
            const calendarJson = JSON.stringify(currentCalendar);
            const base64Data = btoa(calendarJson);
            const currentUrl = window.location.origin;
            return `${currentUrl}/apps/calendar-matrix?calendar=${currentCalendar.id}&share=${encodeURIComponent(base64Data)}`;
        } catch (error) {
            console.error("Error generating shareable link:", error);
            return "";
        }
    };

    const copyShareableLink = async () => {
        const shareLink = generateShareableLink();
        if (!shareLink) {
            alert("Error generating shareable link");
            return;
        }

        try {
            await navigator.clipboard.writeText(shareLink);

            const button = document.querySelector(
                "[data-share-button]",
            ) as HTMLElement;
            if (button) {
                const originalText = button.textContent;
                button.textContent = "Link Copied!";
                button.style.backgroundColor = "#10b981";
                setTimeout(() => {
                    button.textContent = originalText;
                    button.style.backgroundColor = "";
                }, 2000);
            }
        } catch (error) {
            console.error("Error copying to clipboard:", error);
            alert("Error copying link to clipboard");
        }
    };

    const copyToClipboard = async () => {
        const currentCalendar = getCurrentCalendar();
        if (!currentCalendar) {
            alert("No calendar to copy");
            return;
        }

        try {
            const htmlTable = generateCalendarHTML();
            const compactHtmlTable = generateCompactCalendarHTML();

            // Use the Clipboard API to write both formats
            const clipboardItem = new ClipboardItem({
                "text/html": new Blob([compactHtmlTable], {
                    type: "text/html",
                }),
                "text/plain": new Blob([stripHtml(htmlTable)], {
                    type: "text/plain",
                }),
            });

            await navigator.clipboard.write([clipboardItem]);

            // Visual feedback
            const button = document.querySelector(
                "[data-copy-button]",
            ) as HTMLElement;
            if (button) {
                const originalText = button.textContent;
                button.textContent = "Copied!";
                button.style.backgroundColor = "#10b981";
                setTimeout(() => {
                    button.textContent = originalText;
                    button.style.backgroundColor = "";
                }, 2000);
            }
        } catch (err) {
            console.error("Failed to copy: ", err);
            // Fallback to plain text if HTML clipboard fails
            try {
                const htmlTable = generateCalendarHTML();
                await navigator.clipboard.writeText(stripHtml(htmlTable));
                alert("Copied as plain text (HTML clipboard not supported)");
            } catch (fallbackErr) {
                console.error("Fallback copy failed: ", fallbackErr);
                alert("Failed to copy calendar to clipboard");
            }
        }
    };

    const copyStandardFormat = async () => {
        const currentCalendar = getCurrentCalendar();
        if (!currentCalendar) {
            alert("No calendar to copy");
            return;
        }

        try {
            const htmlTable = generateCalendarHTML();

            // Use the original format for standard copy
            const clipboardItem = new ClipboardItem({
                "text/html": new Blob([htmlTable], { type: "text/html" }),
                "text/plain": new Blob([stripHtml(htmlTable)], {
                    type: "text/plain",
                }),
            });

            await navigator.clipboard.write([clipboardItem]);

            // Visual feedback
            const button = document.querySelector(
                "[data-copy-standard-button]",
            ) as HTMLElement;
            if (button) {
                const originalText = button.textContent;
                button.textContent = "Copied!";
                button.style.backgroundColor = "#10b981";
                setTimeout(() => {
                    button.textContent = originalText;
                    button.style.backgroundColor = "";
                }, 2000);
            }
        } catch (err) {
            console.error("Failed to copy: ", err);
            try {
                const htmlTable = generateCalendarHTML();
                await navigator.clipboard.writeText(stripHtml(htmlTable));
                alert("Copied as plain text (HTML clipboard not supported)");
            } catch (fallbackErr) {
                console.error("Fallback copy failed: ", fallbackErr);
                alert("Failed to copy calendar to clipboard");
            }
        }
    };

    const generateCompactCalendarHTML = (): string => {
        const currentCalendar = getCurrentCalendar();
        if (!currentCalendar) return "";

        const yearDays = generateYearDays();
        const totalCells = Math.ceil(yearDays.length / daysPerRow) * daysPerRow;
        const paddedDays = [
            ...yearDays,
            ...Array(totalCells - yearDays.length).fill({
                day: null,
                month: null,
                dayOfWeek: null,
                dayIndex: null,
            }),
        ];

        // Ultra-compact headers for Google Docs
        const dayHeaders = Array.from({ length: daysPerRow })
            .map(
                (_, i) =>
                    `<th style="padding: 1px 2px; border: 1px solid #999; background-color: #f0f0f0; font-weight: bold; text-align: center; font-size: 9px; line-height: 1;">${dayNames[i % 7]}</th>`,
            )
            .join("");

        // Ultra-compact calendar rows
        const rows: string[] = [];
        for (let i = 0; i < paddedDays.length; i += daysPerRow) {
            const rowCells = paddedDays
                .slice(i, i + daysPerRow)
                .map((cell) => {
                    const { day, month, dayIndex } = cell || {};
                    const highlight =
                        dayIndex !== null ? getHighlightForDay(dayIndex) : null;

                    // Minimal styling for Google Docs - single line format
                    let cellStyle =
                        "padding: 0px 1px; border: 1px solid #999; text-align: center; vertical-align: middle; font-size: 8px; line-height: 1; white-space: nowrap;";
                    let cellContent = "";

                    if (day && month !== null) {
                        // Single line format: "15 Jan"
                        cellContent = `${day} ${monthNames[month]}`;

                        if (highlight) {
                            const bgColor = getBackgroundColor(
                                highlight.color.bg,
                            );
                            const borderColor = getBorderColor(
                                highlight.color.border,
                            );
                            const textColor = getTextColor(
                                highlight.color.text,
                            );

                            cellStyle += `background-color: ${bgColor}; border-color: ${borderColor}; color: ${textColor}; font-weight: bold;`;
                        } else {
                            cellStyle += "background-color: white;";
                        }
                    } else {
                        cellStyle += "background-color: #f9f9f9;";
                    }

                    return `<td style="${cellStyle}">${cellContent}</td>`;
                })
                .join("");

            rows.push(`<tr style="height: 12px;">${rowCells}</tr>`);
        }

        return `
            <div style="font-family: Arial, sans-serif; font-size: 10px;">
                <div style="margin-bottom: 4px; font-size: 12px; font-weight: bold;">${currentCalendar.name} - ${year}</div>
                <div style="margin-bottom: 6px; color: #666; font-size: 8px;">
                    ${highlights.length} highlights • ${getTotalDaysInYear()} days
                </div>
                
                <table style="border-collapse: collapse; table-layout: fixed; font-size: 8px;">
                    <thead>
                        <tr>${dayHeaders}</tr>
                    </thead>
                    <tbody>
                        ${rows.join("")}
                    </tbody>
                </table>
            </div>
        `;
    };

    // Helper function to strip HTML tags for plain text fallback
    const stripHtml = (html: string): string => {
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = html;
        return tempDiv.textContent || tempDiv.innerText || "";
    };

    const generateCalendarHTML = (): string => {
        const currentCalendar = getCurrentCalendar();
        if (!currentCalendar) return "";

        const yearDays = generateYearDays();
        const totalCells = Math.ceil(yearDays.length / daysPerRow) * daysPerRow;
        const paddedDays = [
            ...yearDays,
            ...Array(totalCells - yearDays.length).fill({
                day: null,
                month: null,
                dayOfWeek: null,
                dayIndex: null,
            }),
        ];

        // Generate day headers with minimal padding for Google Docs
        const dayHeaders = Array.from({ length: daysPerRow })
            .map(
                (_, i) =>
                    `<th style="padding: 2px 4px; margin: 0; border: 1px solid #999; background-color: #f0f0f0; font-weight: bold; text-align: center; font-size: 12px; line-height: 1; white-space: nowrap;">${dayNames[i % 7]}</th>`,
            )
            .join("");

        // Generate calendar rows with Google Docs optimized styling
        const rows: string[] = [];
        for (let i = 0; i < paddedDays.length; i += daysPerRow) {
            const rowCells = paddedDays
                .slice(i, i + daysPerRow)
                .map((cell) => {
                    const { day, month, dayIndex } = cell || {};
                    const highlight =
                        dayIndex !== null ? getHighlightForDay(dayIndex) : null;

                    // Optimized cell styling for Google Docs - minimal padding and spacing
                    let cellStyle =
                        "padding: 2px 4px; margin: 0; border: 1px solid #999; text-align: center; vertical-align: top; line-height: 1; white-space: nowrap;";
                    let cellContent = "";

                    if (day && month !== null) {
                        // Single paragraph with explicit spacing control to prevent Google Docs paragraph spacing
                        cellContent = `<p style="font-size: 12px; line-height: 1; margin: 0; padding: 0; margin-bottom: 0; margin-top: 0;"><span style="font-weight: bold;">${day}</span><br><span style="font-size: 8px; color: #666;">${monthNames[month]}</span></p>`;

                        if (highlight) {
                            // Convert Tailwind classes to inline CSS
                            const bgColor = getBackgroundColor(
                                highlight.color.bg,
                            );
                            const borderColor = getBorderColor(
                                highlight.color.border,
                            );
                            const textColor = getTextColor(
                                highlight.color.text,
                            );

                            cellStyle += `background-color: ${bgColor}; border-color: ${borderColor}; color: ${textColor};`;
                        } else {
                            cellStyle += "background-color: white;";
                        }
                    } else {
                        cellStyle += "background-color: #f9f9f9;";
                    }

                    return `<td style="${cellStyle}">${cellContent}</td>`;
                })
                .join("");

            rows.push(
                `<tr style="height: auto; margin: 0; padding: 0;">${rowCells}</tr>`,
            );
        }

        // Generate highlights section
        const highlightsSection =
            highlights.length > 0
                ? `
            <div style="margin-top: 16px; margin-bottom: 8px; font-size: 14px; font-weight: bold;">Highlights & Comments</div>
            ${highlights
                .map(
                    (highlight) => `
                <div style="margin-bottom: 6px; padding: 4px 6px; border: 1px solid ${getBorderColor(highlight.color.border)}; background-color: ${getBackgroundColor(highlight.color.bg)}; border-radius: 2px; font-size: 11px;">
                    <span style="font-weight: bold;">${highlight.type.charAt(0).toUpperCase() + highlight.type.slice(1)} highlight</span> 
                    (${highlight.dayIndices.length} days) - ${highlight.color.name}
                    ${highlight.comment ? `<br><span style="font-style: italic;">"${highlight.comment}"</span>` : ""}
                </div>
            `,
                )
                .join("")}
        `
                : "";

        return `
            <div style="font-family: Arial, sans-serif; font-size: 12px;">
                <div style="margin-bottom: 8px; font-size: 16px; font-weight: bold;">${currentCalendar.name} - ${year}</div>
                <div style="margin-bottom: 12px; color: #666; font-size: 11px;">
                    Created with <a href="${window.location.origin}/apps/calendar-matrix" style="color: #4f46e5; text-decoration: none;">Calendar Matrix</a> • 
                    ${highlights.length} highlights • 
                    ${getTotalDaysInYear()} days total
                </div>
                
                <table style="border-collapse: collapse; margin-bottom: 12px; table-layout: fixed; width: 100%; border-spacing: 0; margin: 0; padding: 0;">
                    <colgroup>
                        ${Array.from({ length: daysPerRow })
                            .map(
                                () =>
                                    `<col style="width: ${100 / daysPerRow}%;">`,
                            )
                            .join("")}
                    </colgroup>
                    <thead>
                        <tr style="height: auto; margin: 0; padding: 0;">${dayHeaders}</tr>
                    </thead>
                    <tbody>
                        ${rows.join("")}
                    </tbody>
                </table>
                
                ${highlightsSection}
            </div>
        `;
    };

    // Helper functions to convert Tailwind classes to CSS colors
    const getBackgroundColor = (bgClass: string): string => {
        const colorMap: { [key: string]: string } = {
            "bg-red-100": "#fee2e2",
            "bg-blue-100": "#dbeafe",
            "bg-green-100": "#dcfce7",
            "bg-yellow-100": "#fef3c7",
            "bg-purple-100": "#f3e8ff",
            "bg-pink-100": "#fce7f3",
            "bg-orange-100": "#fed7aa",
        };
        return colorMap[bgClass] || "#f9fafb";
    };

    const getBorderColor = (borderClass: string): string => {
        const colorMap: { [key: string]: string } = {
            "border-red-300": "#fca5a5",
            "border-blue-300": "#93c5fd",
            "border-green-300": "#86efac",
            "border-yellow-300": "#fde047",
            "border-purple-300": "#c4b5fd",
            "border-pink-300": "#f9a8d4",
            "border-orange-300": "#fdba74",
        };
        return colorMap[borderClass] || "#d1d5db";
    };

    const getTextColor = (textClass: string): string => {
        const colorMap: { [key: string]: string } = {
            "text-red-700": "#b91c1c",
            "text-blue-700": "#1d4ed8",
            "text-green-700": "#15803d",
            "text-yellow-700": "#a16207",
            "text-purple-700": "#7c3aed",
            "text-pink-700": "#be185d",
            "text-orange-700": "#c2410c",
        };
        return colorMap[textClass] || "#374151";
    };

    const getHighlightForDay = (dayIndex: number): Highlight | undefined => {
        return highlights.find((h) => h.dayIndices.includes(dayIndex));
    };

    const clearAllData = () => {
        if (
            confirm(
                "Are you sure you want to clear all highlights in this calendar? This cannot be undone.",
            )
        ) {
            setHighlights([]);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-lg p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <Calendar className="w-8 h-8 text-indigo-600" />
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">
                            Full Year Calendar Matrix
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">
                            {calendars.length} calendar
                            {calendars.length !== 1 ? "s" : ""} • Auto-saved to
                            browser storage
                        </p>
                    </div>
                </div>
                <a
                    href="#usage-instructions"
                    onClick={() => trackCalendarAction.viewUsageInstructions()}
                    className="flex items-center gap-2 px-3 py-2 text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 rounded-lg transition-colors text-sm font-medium"
                    title="Learn how to use this calendar"
                >
                    <HelpCircle className="w-4 h-4" />
                    How to use
                </a>
            </div>

            {/* Calendar Tabs */}
            <CalendarTabs
                calendars={calendars}
                currentCalendarId={currentCalendarId}
                editingCalendarName={editingCalendarName}
                onLoadCalendar={loadCalendar}
                onCreateNewCalendar={createNewCalendar}
                onRenameCalendar={renameCalendar}
                onSetEditingCalendarName={setEditingCalendarName}
            />

            {/* Calendar Controls */}
            <CalendarControls
                year={year}
                daysPerRow={daysPerRow}
                onYearChange={setYear}
                onDaysPerRowChange={setDaysPerRow}
                onClearAllData={clearAllData}
                onCopyShareableLink={copyShareableLink}
                onCopyToClipboard={copyToClipboard}
                onCopyStandardFormat={copyStandardFormat}
                getTotalDaysInYear={getTotalDaysInYear}
                isLeapYear={isLeapYear}
                onEditCalendar={() => setEditingCalendarName(currentCalendarId)}
                onDeleteCalendar={() => deleteCalendar(currentCalendarId)}
                canDeleteCalendar={calendars.length > 1}
            />

            {/* Calendar Grid */}
            <CalendarGrid
                year={year}
                daysPerRow={daysPerRow}
                highlights={highlights}
                isDragging={isDragging}
                dragStart={dragStart}
                dragCurrent={dragCurrent}
                isShiftPressed={isShiftPressed}
                calendarName={getCurrentCalendar()?.name || "Calendar"}
                lastUpdated={getCurrentCalendar()?.updatedAt || Date.now()}
                onAddHighlight={addHighlight}
                onMouseDown={handleMouseDown}
                onMouseEnter={handleMouseEnter}
                onMouseUp={handleMouseUp}
            />

            {/* Highlights List */}
            <HighlightsList
                highlights={highlights}
                onUpdateHighlight={updateHighlight}
                onDeleteHighlight={deleteHighlight}
            />

            {/* Usage Instructions */}
            <UsageInstructions />
        </div>
    );
};

export default CalendarBuilderClient;
