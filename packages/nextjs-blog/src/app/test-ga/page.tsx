"use client";

import { useState } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Google Analytics Test Page",
    robots: {
        index: false,
        follow: false,
    },
};

export default function TestGA() {
    const [eventResults, setEventResults] = useState<string[]>([]);

    const sendTestEvent = (eventName: string, eventData: any = {}) => {
        if (typeof window !== "undefined" && (window as any).gtag) {
            const gtag = (window as any).gtag;

            console.log(`Sending ${eventName} event:`, eventData);
            gtag("event", eventName, eventData);

            setEventResults((prev) => [
                ...prev,
                `✅ Sent ${eventName} event at ${new Date().toLocaleTimeString()}`,
            ]);
        } else {
            const error = `❌ gtag not available - make sure you've accepted cookies`;
            console.error(error);
            setEventResults((prev) => [...prev, error]);
        }
    };

    const clearResults = () => {
        setEventResults([]);
    };

    const enableDebug = () => {
        if (typeof window !== "undefined") {
            localStorage.setItem("show-ga-debug", "true");
            window.location.reload();
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <h1 className="text-3xl font-bold mb-6">
                Google Analytics Test Page
            </h1>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <h2 className="font-semibold text-yellow-800 mb-2">
                    Instructions:
                </h2>
                <ol className="list-decimal list-inside text-yellow-700 space-y-1">
                    <li>Accept cookies using the banner at the bottom</li>
                    <li>Enable GA debug panel (button below)</li>
                    <li>
                        Send test events and check your browser's Network tab
                    </li>
                    <li>
                        Look for requests to{" "}
                        <code>google-analytics.com/g/collect</code>
                    </li>
                    <li>Check Google Analytics Real-time reports</li>
                </ol>
            </div>

            <div className="space-y-4 mb-6">
                <button
                    onClick={enableDebug}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Enable GA Debug Panel
                </button>

                <button
                    onClick={() => {
                        console.log("=== MANUAL DEBUG INFO ===");
                        console.log("gtag available:", !!(window as any).gtag);
                        console.log("dataLayer:", (window as any).dataLayer);
                        console.log("Current cookies:", document.cookie);
                        console.log("Domain:", window.location.hostname);
                        console.log("Protocol:", window.location.protocol);
                        console.log("=========================");
                    }}
                    className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                >
                    Debug Info to Console
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                        onClick={() =>
                            sendTestEvent("manual_test", {
                                event_category: "Test",
                                event_label: "Manual Test Button",
                                value: 1,
                            })
                        }
                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                        Send Manual Test Event
                    </button>

                    <button
                        onClick={() =>
                            sendTestEvent("page_view", {
                                page_title: "GA Test Page",
                                page_location: window.location.href,
                            })
                        }
                        className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
                    >
                        Send Page View Event
                    </button>

                    <button
                        onClick={() =>
                            sendTestEvent("cookie_consent", {
                                event_category: "GDPR",
                                event_label: "variant_TEST",
                                action: "accept",
                                variant: "TEST",
                            })
                        }
                        className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700"
                    >
                        Send Cookie Consent Event
                    </button>

                    <button
                        onClick={() =>
                            sendTestEvent("custom_event", {
                                event_category: "Engagement",
                                event_label: "Test Interaction",
                                custom_parameter: "test_value",
                            })
                        }
                        className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                    >
                        Send Custom Event
                    </button>
                </div>

                <button
                    onClick={clearResults}
                    className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                >
                    Clear Results
                </button>
            </div>

            {eventResults.length > 0 && (
                <div className="bg-gray-50 border rounded-lg p-4">
                    <h3 className="font-semibold mb-2">Event Results:</h3>
                    <div className="space-y-1 font-mono text-sm">
                        {eventResults.map((result, index) => (
                            <div key={index} className="text-gray-700">
                                {result}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-800 mb-2">
                    Debugging Tips:
                </h3>
                <ul className="list-disc list-inside text-blue-700 space-y-1">
                    <li>Open browser DevTools → Network tab</li>
                    <li>Filter by "google-analytics.com" or "collect"</li>
                    <li>
                        Look for POST requests to <code>/g/collect</code>
                    </li>
                    <li>
                        Check Google Analytics → Reports → Real-time → Events
                    </li>
                    <li>
                        Events may take 1-2 minutes to appear in GA dashboard
                    </li>
                </ul>
            </div>
        </div>
    );
}
