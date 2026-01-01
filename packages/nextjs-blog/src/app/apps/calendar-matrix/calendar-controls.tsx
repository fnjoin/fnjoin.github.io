import { Trash2, Share2, Copy, Edit3, ChevronDown } from "lucide-react";
import React, { useState } from "react";
import { trackCalendarAction } from "./analytics";

interface CalendarControlsProps {
    year: number;
    daysPerRow: number;
    onYearChange: (year: number) => void;
    onDaysPerRowChange: (days: number) => void;
    onClearAllData: () => void;
    onCopyShareableLink: () => void;
    onCopyToClipboard: () => void;
    onCopyStandardFormat?: () => void;
    getTotalDaysInYear: () => number;
    isLeapYear: (year: number) => boolean;
    onEditCalendar: () => void;
    onDeleteCalendar: () => void;
    canDeleteCalendar: boolean;
}

export const CalendarControls: React.FC<CalendarControlsProps> = ({
    year,
    daysPerRow,
    onYearChange,
    onDaysPerRowChange,
    onClearAllData,
    onCopyShareableLink,
    onCopyToClipboard,
    onCopyStandardFormat,
    getTotalDaysInYear,
    isLeapYear,
    onEditCalendar,
    onDeleteCalendar,
    canDeleteCalendar,
}) => {
    const [showCopyDropdown, setShowCopyDropdown] = useState(false);
    return (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex flex-wrap items-center gap-4">
                {/* Year Control */}
                <div className="flex-shrink-0">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Year
                    </label>
                    <input
                        type="number"
                        value={year}
                        onChange={(e) => {
                            const newYear =
                                parseInt(e.target.value) ||
                                new Date().getFullYear();
                            onYearChange(newYear);
                            trackCalendarAction.changeYear(newYear);
                        }}
                        className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-center"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                        {getTotalDaysInYear()} days{" "}
                        {isLeapYear(year) && "(Leap Year)"}
                    </p>
                </div>

                {/* Days per Row Control */}
                <div className="flex-shrink-0">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Days per Row
                    </label>
                    <div className="flex gap-1">
                        <button
                            onClick={() => {
                                const newDays = Math.max(7, daysPerRow - 7);
                                onDaysPerRowChange(newDays);
                                trackCalendarAction.changeDaysPerRow(newDays);
                            }}
                            className="px-2 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-semibold text-sm"
                        >
                            -7
                        </button>
                        <input
                            type="number"
                            min="7"
                            step="7"
                            max="365"
                            value={daysPerRow}
                            onChange={(e) => {
                                const newDays = Math.max(
                                    7,
                                    parseInt(e.target.value) || 7,
                                );
                                onDaysPerRowChange(newDays);
                                trackCalendarAction.changeDaysPerRow(newDays);
                            }}
                            className="w-16 px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-center text-sm"
                        />
                        <button
                            onClick={() => {
                                const newDays = Math.min(365, daysPerRow + 7);
                                onDaysPerRowChange(newDays);
                                trackCalendarAction.changeDaysPerRow(newDays);
                            }}
                            className="px-2 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-semibold text-sm"
                        >
                            +7
                        </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                        {daysPerRow / 7} week{daysPerRow !== 7 ? "s" : ""} per
                        row
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2 ml-auto">
                    <button
                        onClick={() => {
                            onCopyShareableLink();
                            trackCalendarAction.shareCalendar();
                        }}
                        data-share-button
                        className="flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-sm"
                        title="Generate shareable link for this calendar"
                    >
                        <Share2 className="w-4 h-4" />
                        Share
                    </button>

                    {/* Copy Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() =>
                                setShowCopyDropdown(!showCopyDropdown)
                            }
                            className="flex items-center gap-2 px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium text-sm"
                            title="Copy calendar in different formats"
                        >
                            <Copy className="w-4 h-4" />
                            Copy
                            <ChevronDown className="w-3 h-3" />
                        </button>

                        {showCopyDropdown && (
                            <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-48">
                                <button
                                    onClick={() => {
                                        onCopyStandardFormat?.();
                                        trackCalendarAction.copyCalendar();
                                        setShowCopyDropdown(false);
                                    }}
                                    className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm border-b border-gray-100"
                                >
                                    <div className="font-medium">
                                        Standard Format
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        Full details with normal text styling
                                    </div>
                                </button>
                                <button
                                    onClick={() => {
                                        onCopyToClipboard();
                                        trackCalendarAction.copyCalendar();
                                        setShowCopyDropdown(false);
                                    }}
                                    data-copy-button
                                    className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm"
                                >
                                    <div className="font-medium">
                                        Compact Format
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        Ultra-compact for tight spaces
                                    </div>
                                </button>
                            </div>
                        )}
                    </div>
                    <button
                        onClick={() => {
                            onEditCalendar();
                            trackCalendarAction.editCalendar();
                        }}
                        className="flex items-center gap-2 px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium text-sm"
                        title="Rename calendar"
                    >
                        <Edit3 className="w-4 h-4" />
                        Edit
                    </button>
                    <button
                        onClick={() => {
                            onClearAllData();
                            trackCalendarAction.clearHighlights();
                        }}
                        className="flex items-center gap-2 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium text-sm"
                        title="Clear all highlights in this calendar"
                    >
                        <Trash2 className="w-4 h-4" />
                        Clear
                    </button>
                    <button
                        onClick={() => {
                            onDeleteCalendar();
                            trackCalendarAction.deleteCalendar();
                        }}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors font-medium text-sm ${
                            canDeleteCalendar
                                ? "bg-red-600 text-white hover:bg-red-700"
                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                        title={
                            canDeleteCalendar
                                ? "Delete calendar"
                                : "Cannot delete the last calendar"
                        }
                        disabled={!canDeleteCalendar}
                    >
                        <Trash2 className="w-4 h-4" />
                        Delete
                    </button>
                </div>
            </div>

            {/* Click outside to close dropdown */}
            {showCopyDropdown && (
                <div
                    className="fixed inset-0 z-0"
                    onClick={() => setShowCopyDropdown(false)}
                />
            )}
        </div>
    );
};
