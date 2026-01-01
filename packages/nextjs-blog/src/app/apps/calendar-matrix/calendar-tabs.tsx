import { Plus } from "lucide-react";
import React from "react";
import { trackCalendarAction } from "./analytics";
import { CalendarData } from "./types";

interface CalendarTabsProps {
    calendars: CalendarData[];
    currentCalendarId: string;
    editingCalendarName: string | null;
    onLoadCalendar: (id: string) => void;
    onCreateNewCalendar: () => void;
    onRenameCalendar: (id: string, name: string) => void;
    onSetEditingCalendarName: (id: string | null) => void;
}

export const CalendarTabs: React.FC<CalendarTabsProps> = ({
    calendars,
    currentCalendarId,
    editingCalendarName,
    onLoadCalendar,
    onCreateNewCalendar,
    onRenameCalendar,
    onSetEditingCalendarName,
}) => {
    return (
        <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1 overflow-x-auto">
                    {calendars.map((calendar) => (
                        <button
                            key={calendar.id}
                            onClick={() => {
                                onLoadCalendar(calendar.id);
                                trackCalendarAction.switchCalendar();
                            }}
                            onDoubleClick={() =>
                                onSetEditingCalendarName(calendar.id)
                            }
                            className={`flex items-center gap-2 px-4 py-2 rounded-t-lg border-b-2 transition-colors whitespace-nowrap ${
                                calendar.id === currentCalendarId
                                    ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                                    : "border-transparent bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800"
                            }`}
                        >
                            {editingCalendarName === calendar.id ? (
                                <input
                                    type="text"
                                    defaultValue={calendar.name}
                                    onBlur={(e) =>
                                        onRenameCalendar(
                                            calendar.id,
                                            e.target.value,
                                        )
                                    }
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            onRenameCalendar(
                                                calendar.id,
                                                e.currentTarget.value,
                                            );
                                        }
                                        if (e.key === "Escape") {
                                            onSetEditingCalendarName(null);
                                        }
                                    }}
                                    onClick={(e) => e.stopPropagation()}
                                    autoFocus
                                    className="font-medium bg-transparent border-none outline-none min-w-0"
                                />
                            ) : (
                                <div className="flex flex-col items-start">
                                    <span className="font-medium">
                                        {calendar.name}
                                    </span>
                                    <span className="text-xs opacity-60">
                                        {calendar.year} •{" "}
                                        {calendar.highlights.length} highlights
                                    </span>
                                </div>
                            )}
                        </button>
                    ))}
                </div>
                <button
                    onClick={() => {
                        onCreateNewCalendar();
                        trackCalendarAction.createCalendar();
                    }}
                    className="flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm ml-4"
                >
                    <Plus className="w-4 h-4" />
                    New
                </button>
            </div>
        </div>
    );
};
