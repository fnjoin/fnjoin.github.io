export interface Color {
    name: string;
    bg: string;
    border: string;
    text: string;
}

export interface Highlight {
    id: number;
    type: "row" | "column" | "range" | "matrix";
    index: number | null;
    comment: string;
    color: Color;
    dayIndices: number[];
    matrixCells?: number[];
}

export interface YearDay {
    day: number | null;
    month: number | null;
    dayOfWeek: number | null;
    date?: Date;
    dayIndex: number | null;
}

export interface CalendarData {
    id: string;
    name: string;
    year: number;
    daysPerRow: number;
    highlights: Highlight[];
    createdAt: number;
    updatedAt: number;
}

export interface DragState {
    dayIndex: number | null;
    matrixIndex: number;
    row: number;
    col: number;
}

export const colors: Color[] = [
    {
        name: "Red",
        bg: "bg-red-100",
        border: "border-red-300",
        text: "text-red-700",
    },
    {
        name: "Blue",
        bg: "bg-blue-100",
        border: "border-blue-300",
        text: "text-blue-700",
    },
    {
        name: "Green",
        bg: "bg-green-100",
        border: "border-green-300",
        text: "text-green-700",
    },
    {
        name: "Yellow",
        bg: "bg-yellow-100",
        border: "border-yellow-300",
        text: "text-yellow-700",
    },
    {
        name: "Purple",
        bg: "bg-purple-100",
        border: "border-purple-300",
        text: "text-purple-700",
    },
    {
        name: "Pink",
        bg: "bg-pink-100",
        border: "border-pink-300",
        text: "text-pink-700",
    },
    {
        name: "Orange",
        bg: "bg-orange-100",
        border: "border-orange-300",
        text: "text-orange-700",
    },
];

export const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];

export const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
