"use client";

import { useState, useEffect } from "react";

export default function CookieBanner() {
    const [showBanner, setShowBanner] = useState(false);
    const [showSettings, setShowSettings] = useState(false);

    useEffect(() => {
        // Check if user has already made a choice
        const consent = localStorage.getItem("cookie-consent");
        if (!consent) {
            setShowBanner(true);
        } else if (consent === "accepted") {
            // Load Google Analytics if consent was given
            loadGoogleAnalytics();
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem("cookie-consent", "accepted");
        setShowBanner(false);
        setShowSettings(false);
        loadGoogleAnalytics();
    };

    const handleReject = () => {
        localStorage.setItem("cookie-consent", "rejected");
        setShowBanner(false);
        setShowSettings(false);
        // Clear any existing GA cookies
        clearGoogleAnalytics();
    };

    const handleShowSettings = () => {
        setShowSettings(true);
    };

    const clearGoogleAnalytics = () => {
        // Clear GA cookies if they exist
        document.cookie =
            "_ga=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie =
            "_ga_G-ZPSKLMVM2V=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie =
            "_gid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    };

    const loadGoogleAnalytics = () => {
        const GA_MEASUREMENT_ID = "G-ZPSKLMVM2V";

        // Load gtag script
        const script = document.createElement("script");
        script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
        script.async = true;
        document.head.appendChild(script);

        // Initialize gtag
        window.dataLayer = window.dataLayer || [];
        function gtag(...args: any[]) {
            window.dataLayer.push(args);
        }
        gtag("js", new Date());
        gtag("config", GA_MEASUREMENT_ID);
    };

    // Settings panel for consent withdrawal
    if (showSettings) {
        return (
            <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 z-50">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold mb-2">
                            Help Me Write Better Content
                        </h3>
                        <p className="text-sm text-gray-300 mb-4">
                            As developers, we rely on analytics to understand
                            what's actually helpful. You can change these
                            settings anytime.
                        </p>
                    </div>

                    <div className="bg-gray-800 p-4 rounded mb-4">
                        <div className="flex justify-between items-start">
                            <div>
                                <h4 className="font-medium">
                                    Analytics Cookies
                                </h4>
                                <p className="text-sm text-gray-300 mt-1">
                                    Helps us see which articles are useful, how
                                    long people read, and what topics to focus
                                    on. No personal data, no cross-site
                                    tracking, no ads. Also sugar-free,
                                    gluten-free, and won't make you gain weight.
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
                            ← Back
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
        );
    }

    if (!showBanner) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 z-50">
            <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-sm">
                    <p>
                        We're just developers sharing what we've learned about
                        cloud automation and development. Analytics help us
                        understand which content is actually useful to you, so
                        we can write more of what helps and less of what
                        doesn't. No ads, no tracking across sites—just knowing
                        if our writing is worth your time.{" "}
                        <button
                            onClick={handleShowSettings}
                            className="underline hover:no-underline"
                        >
                            See details
                        </button>
                    </p>
                </div>
                <div className="flex gap-3 flex-shrink-0">
                    <button
                        onClick={handleReject}
                        className="px-4 py-2 text-sm border border-gray-600 rounded hover:bg-gray-800 transition-colors"
                    >
                        Decline
                    </button>
                    <button
                        onClick={handleAccept}
                        className="px-4 py-2 text-sm bg-blue-600 rounded hover:bg-blue-700 transition-colors"
                    >
                        Accept
                    </button>
                </div>
            </div>
        </div>
    );
}
