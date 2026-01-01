import { Metadata } from "next";
import React, { Suspense } from "react";
import CalendarBuilderClient from "./calendar-builder-client";
import Header from "../../_components/header";

export function generateMetadata(): Metadata {
    return {
        title: "Calendar Builder - Full Year Matrix View",
        description:
            "Interactive calendar builder that displays an entire year in a customizable matrix format. Highlight rows, columns, and date ranges with comments.",
        openGraph: {
            title: "Calendar Builder - Full Year Matrix View",
            description:
                "Interactive calendar builder that displays an entire year in a customizable matrix format. Highlight rows, columns, and date ranges with comments.",
        },
    };
}

function CalendarLoading() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
            <div className="max-w-7xl mx-auto">
                <div className="bg-white rounded-xl shadow-lg p-8">
                    <div className="animate-pulse">
                        <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
                        <div className="grid grid-cols-7 gap-2">
                            {Array.from({ length: 49 }).map((_, i) => (
                                <div
                                    key={i}
                                    className="h-10 bg-gray-200 rounded"
                                ></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function CalendarBuilderPage() {
    return (
        <main>
            <Header />
            <Suspense fallback={<CalendarLoading />}>
                <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
                    <div className="max-w-7xl mx-auto">
                        <CalendarBuilderClient />
                    </div>
                </div>
            </Suspense>
        </main>
    );
}
