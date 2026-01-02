"use client";

import { useState } from "react";

export default function CookieSettingsLink() {
    const [showSettings, setShowSettings] = useState(false);

    const handleAccept = () => {
        localStorage.setItem("cookie-consent", "accepted");
        setShowSettings(false);
        window.location.reload(); // Reload to apply analytics
    };

    const handleReject = () => {
        localStorage.setItem("cookie-consent", "rejected");
        setShowSettings(false);
        // Clear any existing GA cookies
        document.cookie =
            "_ga=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie =
            "_ga_G-ZPSKLMVM2V=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie =
            "_gid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        window.location.reload(); // Reload to remove analytics
    };

    if (showSettings) {
        return (
            <>
                {/* Backdrop */}
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={() => setShowSettings(false)}
                />

                {/* Settings Modal */}
                <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 z-50">
                    <div className="max-w-4xl mx-auto">
                        <div className="mb-4">
                            <h3 className="text-lg font-semibold mb-2">
                                Help Me Write Better Content
                            </h3>
                            <p className="text-sm text-gray-300 mb-4">
                                As developers, we rely on analytics to
                                understand what's actually helpful. You can
                                change these settings anytime.
                            </p>
                        </div>

                        <div className="bg-gray-800 p-4 rounded mb-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h4 className="font-medium">
                                        Analytics Cookies
                                    </h4>
                                    <p className="text-sm text-gray-300 mt-1">
                                        Helps us see which articles are useful,
                                        how long people read, and what topics to
                                        focus on. No personal data, no
                                        cross-site tracking, no ads. Also
                                        sugar-free, gluten-free, and won't make
                                        you gain weight.
                                    </p>
                                </div>
                                <div className="ml-4 flex gap-2">
                                    <button
                                        onClick={handleReject}
                                        className="px-3 py-1 text-xs border border-gray-600 rounded hover:bg-gray-700"
                                    >
                                        Reject
                                    </button>
                                    <button
                                        onClick={handleAccept}
                                        className="px-3 py-1 text-xs bg-blue-600 rounded hover:bg-blue-700"
                                    >
                                        Accept
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-between items-center">
                            <button
                                onClick={() => setShowSettings(false)}
                                className="text-sm text-gray-400 hover:text-white"
                            >
                                ← Close
                            </button>
                            <div className="flex gap-3">
                                <button
                                    onClick={handleReject}
                                    className="px-4 py-2 text-sm border border-gray-600 rounded hover:bg-gray-800"
                                >
                                    Reject All
                                </button>
                                <button
                                    onClick={handleAccept}
                                    className="px-4 py-2 text-sm bg-blue-600 rounded hover:bg-blue-700"
                                >
                                    Accept All
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <button
            onClick={() => setShowSettings(true)}
            className="text-sm text-gray-500 hover:text-gray-700 underline"
        >
            Cookie Settings
        </button>
    );
}
