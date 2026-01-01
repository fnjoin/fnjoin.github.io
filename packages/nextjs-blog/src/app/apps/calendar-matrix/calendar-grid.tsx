import { motion } from "framer-motion";
import React from "react";
import { trackCalendarAction } from "./analytics";
import { YearDay, Highlight, DragState, monthNames, dayNames } from "./types";

interface CalendarGridProps {
    year: number;
    daysPerRow: number;
    highlights: Highlight[];
    isDragging: boolean;
    dragStart: DragState | null;
    dragCurrent: DragState | null;
    isShiftPressed: boolean;
    calendarName: string;
    lastUpdated: number;
    onAddHighlight: (
        type: "row" | "column" | "range" | "matrix",
        index: number | null,
        dayIndices?: number[] | null,
        matrixCells?: number[] | null,
    ) => void;
    onMouseDown: (dayIndex: number | null, matrixIndex: number) => void;
    onMouseEnter: (dayIndex: number | null, matrixIndex: number) => void;
    onMouseUp: () => void;
}

export const CalendarGrid: React.FC<CalendarGridProps> = ({
    year,
    daysPerRow,
    highlights,
    isDragging,
    dragStart,
    dragCurrent,
    isShiftPressed,
    calendarName,
    lastUpdated,
    onAddHighlight,
    onMouseDown,
    onMouseEnter,
    onMouseUp,
}) => {
    const getDaysInMonth = (yearParam: number, monthParam: number): number => {
        return new Date(yearParam, monthParam + 1, 0).getDate();
    };

    const generateYearDays = (): YearDay[] => {
        const allDays: YearDay[] = [];
        const firstDayOfYear = new Date(year, 0, 1).getDay();

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

    const getHighlightForDay = (dayIndex: number): Highlight | undefined => {
        return highlights.find((h) => h.dayIndices.includes(dayIndex));
    };

    const isDayInDragRange = (
        dayIndex: number | null,
        matrixIndex: number,
    ): boolean => {
        if (!isDragging || !dragStart || !dragCurrent) {
            return false;
        }

        if (isShiftPressed) {
            // Matrix-based selection: check if in rectangular area
            const minRow = Math.min(dragStart.row, dragCurrent.row);
            const maxRow = Math.max(dragStart.row, dragCurrent.row);
            const minCol = Math.min(dragStart.col, dragCurrent.col);
            const maxCol = Math.max(dragStart.col, dragCurrent.col);

            const row = Math.floor(matrixIndex / daysPerRow);
            const col = matrixIndex % daysPerRow;

            return (
                row >= minRow && row <= maxRow && col >= minCol && col <= maxCol
            );
        } else {
            // Date-based selection: check if in date range
            if (
                dayIndex === null ||
                dragStart.dayIndex === null ||
                dragCurrent.dayIndex === null
            ) {
                return false;
            }
            const start = Math.min(dragStart.dayIndex, dragCurrent.dayIndex);
            const end = Math.max(dragStart.dayIndex, dragCurrent.dayIndex);
            return dayIndex >= start && dayIndex <= end;
        }
    };

    const renderCalendar = () => {
        const yearDays = generateYearDays();
        const totalCells = Math.ceil(yearDays.length / daysPerRow) * daysPerRow;
        const paddedDays: YearDay[] = [
            ...yearDays,
            ...Array(totalCells - yearDays.length).fill({
                day: null,
                month: null,
                dayOfWeek: null,
                dayIndex: null,
            }),
        ];

        return (
            <div
                className="inline-block"
                onMouseUp={onMouseUp}
                onMouseLeave={onMouseUp}
            >
                <div
                    className="grid gap-0.5 mb-1"
                    style={{
                        gridTemplateColumns: `repeat(${daysPerRow}, minmax(0, 1fr))`,
                    }}
                >
                    {Array.from({ length: daysPerRow }).map((_, i) => (
                        <motion.div
                            key={`header-${i}`}
                            layout
                            transition={{
                                type: "tween",
                                duration: 2.0,
                                ease: [0.25, 0.1, 0.25, 1.0], // Custom cubic-bezier for smooth ease-in-out
                            }}
                            className="relative group"
                        >
                            <div className="w-10 h-6 flex items-center justify-center text-xs font-semibold text-gray-600">
                                {dayNames[i % 7]}
                            </div>
                            <button
                                onClick={() => {
                                    onAddHighlight("column", i);
                                    // Calculate column size for analytics
                                    const columnYearDays = generateYearDays();
                                    const numRows = Math.ceil(
                                        columnYearDays.length / daysPerRow,
                                    );
                                    let columnSize = 0;
                                    for (let row = 0; row < numRows; row++) {
                                        const cellIndex = row * daysPerRow + i;
                                        if (
                                            cellIndex < columnYearDays.length &&
                                            columnYearDays[cellIndex]
                                                .dayIndex !== null
                                        ) {
                                            columnSize++;
                                        }
                                    }
                                    trackCalendarAction.selectByButton(
                                        "column",
                                        columnSize,
                                    );
                                }}
                                className="absolute -top-1 -right-1 w-4 h-4 bg-indigo-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs"
                                title="Highlight this column"
                            >
                                +
                            </button>
                        </motion.div>
                    ))}
                </div>
                <div
                    className="grid gap-0.5"
                    style={{
                        gridTemplateColumns: `repeat(${daysPerRow}, minmax(0, 1fr))`,
                    }}
                >
                    {paddedDays.map((cell, index) => {
                        const { day, month, dayIndex } = cell || {};
                        const highlight =
                            dayIndex !== null
                                ? getHighlightForDay(dayIndex)
                                : null;
                        const inDragRange = isDayInDragRange(dayIndex, index);
                        const rowIndex = Math.floor(index / daysPerRow);
                        const isRowStart = index % daysPerRow === 0;

                        return (
                            <motion.div
                                key={
                                    dayIndex !== null
                                        ? `day-${dayIndex}`
                                        : `empty-${index}`
                                }
                                layout
                                transition={{
                                    type: "tween",
                                    duration: 2.0,
                                    ease: [0.25, 0.1, 0.25, 1.0], // Custom cubic-bezier for smooth ease-in-out
                                }}
                                className="relative group"
                            >
                                {isRowStart && (
                                    <button
                                        onClick={() => {
                                            onAddHighlight("row", rowIndex);
                                            // Calculate row size for analytics
                                            const rowYearDays =
                                                generateYearDays();
                                            const startIndex =
                                                rowIndex * daysPerRow;
                                            const endIndex = Math.min(
                                                startIndex + daysPerRow,
                                                rowYearDays.length,
                                            );
                                            let rowSize = 0;
                                            for (
                                                let i = startIndex;
                                                i < endIndex;
                                                i++
                                            ) {
                                                if (
                                                    rowYearDays[i].dayIndex !==
                                                    null
                                                ) {
                                                    rowSize++;
                                                }
                                            }
                                            trackCalendarAction.selectByButton(
                                                "row",
                                                rowSize,
                                            );
                                        }}
                                        className="absolute -left-1 top-1/2 -translate-y-1/2 w-4 h-4 bg-indigo-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs z-10"
                                        title="Highlight this row"
                                    >
                                        +
                                    </button>
                                )}
                                <motion.div
                                    className={`w-10 h-10 flex flex-col items-center justify-center text-xs border ${
                                        inDragRange
                                            ? "bg-indigo-200 border-indigo-400"
                                            : highlight
                                              ? `${highlight.color.bg} ${highlight.color.border} ${highlight.color.text}`
                                              : day
                                                ? "bg-white text-gray-800 hover:bg-blue-50 cursor-pointer"
                                                : "bg-gray-100 border-gray-200"
                                    }`}
                                    title={
                                        highlight && highlight.comment
                                            ? highlight.comment
                                            : day && month !== null
                                              ? `${monthNames[month]} ${day}, ${year}`
                                              : ""
                                    }
                                    onMouseDown={() =>
                                        onMouseDown(dayIndex, index)
                                    }
                                    onMouseEnter={() =>
                                        onMouseEnter(dayIndex, index)
                                    }
                                    style={{ userSelect: "none" }}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {day && (
                                        <>
                                            <span className="font-semibold">
                                                {day}
                                            </span>
                                            <span className="text-[8px] text-gray-500">
                                                {month !== null
                                                    ? monthNames[month]
                                                    : ""}
                                            </span>
                                        </>
                                    )}
                                </motion.div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        );
    };

    return (
        <div className="bg-gray-50 rounded-lg p-6 overflow-auto">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                        {calendarName} - {year}
                    </h2>
                    <p className="text-sm text-gray-600 mt-1">
                        {highlights.length} highlights • Last updated{" "}
                        {new Date(lastUpdated).toLocaleDateString()}
                    </p>
                </div>
                {isShiftPressed && (
                    <div className="px-3 py-1 bg-blue-100 border border-blue-300 rounded-lg text-sm font-medium text-blue-700">
                        Matrix Selection Mode (Shift held)
                    </div>
                )}
            </div>
            <div className="flex justify-center">{renderCalendar()}</div>
        </div>
    );
};
