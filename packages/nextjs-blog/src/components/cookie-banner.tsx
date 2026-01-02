"use client";

import { useState, useEffect } from "react";

// A/B test variants
const BANNER_VARIANTS = {
    A: {
        id: "conversational",
        mainText:
            "We're just developers sharing what we've learned about cloud automation and development. Analytics help us understand which content is actually useful to you, so we can write more of what helps and less of what doesn't. No ads, no tracking across sites—just knowing if our writing is worth your time.",
        settingsTitle: "Help Me Write Better Content",
        settingsDescription:
            "As developers, we rely on analytics to understand what's actually helpful. You can change these settings anytime.",
        cookieDescription:
            "Helps us see which articles are useful, how long people read, and what topics to focus on. No personal data, no cross-site tracking, no ads. Also sugar-free, gluten-free, and won't make you gain weight.",
    },
    B: {
        id: "concise",
        mainText:
            "This site uses analytics cookies to improve content quality. No personal data collection or cross-site tracking.",
        settingsTitle: "Cookie Preferences",
        settingsDescription:
            "Manage your cookie preferences. You can change these settings at any time.",
        cookieDescription:
            "Analytics cookies help us understand which content is most valuable to readers. No personal information is collected.",
    },
};

export default function CookieBanner() {
    const [showBanner, setShowBanner] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [variant, setVariant] = useState<"A" | "B">("A");

    useEffect(() => {
        // Only run on client side
        if (typeof window === "undefined") return;

        // Assign A/B test variant (50/50 split)
        const existingVariant = localStorage.getItem("cookie-banner-variant");
        if (
            existingVariant &&
            (existingVariant === "A" || existingVariant === "B")
        ) {
            setVariant(existingVariant as "A" | "B");
        } else {
            const newVariant = Math.random() < 0.5 ? "A" : "B";
            setVariant(newVariant);
            localStorage.setItem("cookie-banner-variant", newVariant);
        }

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

        // Track acceptance with gtag event (with delay to ensure gtag is loaded)
        setTimeout(() => {
            trackConsentEvent("accept", variant);
        }, 500);
    };

    const handleReject = () => {
        localStorage.setItem("cookie-consent", "rejected");
        setShowBanner(false);
        setShowSettings(false);

        // Note: Can't track rejections with gtag since analytics won't be loaded
        // Could use a different tracking method here if needed

        // Clear any existing GA cookies
        clearGoogleAnalytics();
    };

    const handleShowSettings = () => {
        setShowSettings(true);
    };

    const trackConsentEvent = (action: "accept", testVariant: "A" | "B") => {
        console.log("trackConsentEvent called with:", action, testVariant);

        if (typeof window !== "undefined" && window.gtag) {
            console.log("Sending consent event to GA...");
            window.gtag("event", "cookie_consent", {
                event_category: "GDPR",
                event_label: `variant_${testVariant}`,
                action: action,
                variant: testVariant,
            });
            console.log("Consent event sent:", testVariant);

            // Also send a simple test event
            window.gtag("event", "test_event", {
                event_category: "Debug",
                event_label: "cookie_banner_test",
            });
            console.log("Test event sent");
        } else {
            console.error("gtag not available when trying to track consent");
        }
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

        // Check if gtag is already loaded to prevent duplicates
        if ((window as any).gtag) {
            console.log("Google Analytics already loaded");
            return;
        }

        // Initialize dataLayer first
        window.dataLayer = window.dataLayer || [];

        // DON'T create our own gtag function - let GA script create the real one
        // Just create a temporary one that will be replaced
        function gtagTemp(...args: any[]) {
            window.dataLayer.push(args);
        }

        // Only set gtag if it doesn't exist yet
        if (!(window as any).gtag) {
            (window as any).gtag = gtagTemp;
        }

        // Load the Google Analytics script FIRST
        const script = document.createElement("script");
        script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
        script.async = true;

        script.onload = () => {
            console.log("Google Analytics script loaded successfully");

            // Wait for the real gtag function to be available
            const waitForGtag = () => {
                // Check if the real gtag function is now available
                const realGtag = (window as any).gtag;

                if (realGtag && realGtag !== gtagTemp) {
                    console.log("Real gtag function is now available");

                    // Initialize with current timestamp
                    realGtag("js", new Date());

                    // Configure GA with localhost-friendly settings
                    const isLocalhost =
                        window.location.hostname === "localhost" ||
                        window.location.hostname === "127.0.0.1";
                    const isStaticSite =
                        window.location.hostname.includes("github.io") ||
                        window.location.hostname === "fnjoin.com";

                    realGtag("config", GA_MEASUREMENT_ID, {
                        debug_mode: true,
                        send_page_view: true,
                        // For static sites, we need to be more explicit about cookie settings
                        ...(isLocalhost && {
                            cookie_domain: "none",
                            storage: "none",
                        }),
                        ...(isStaticSite && {
                            cookie_domain: "auto",
                            cookie_expires: 63072000, // 2 years in seconds
                            anonymize_ip: false,
                            allow_google_signals: true,
                            cookie_update: true,
                        }),
                    });

                    console.log(
                        "GA configured for",
                        isLocalhost
                            ? "localhost"
                            : isStaticSite
                              ? "static site"
                              : "production",
                    );

                    // Send a test page view event after configuration
                    setTimeout(() => {
                        console.log("Sending test page view with real gtag...");
                        realGtag("event", "page_view", {
                            page_title: document.title,
                            page_location: window.location.href,
                        });
                        console.log("Test page_view event sent via real gtag");

                        // Check for network activity
                        setTimeout(() => {
                            console.log(
                                "Check Network tab for requests to google-analytics.com/g/collect",
                            );
                            console.log("Current cookies:", document.cookie);
                            const gaCookies = document.cookie
                                .split(";")
                                .filter((cookie) => cookie.includes("_ga"));
                            console.log("GA-specific cookies:", gaCookies);
                        }, 2000);
                    }, 1000);
                } else {
                    console.log("Waiting for real gtag function...");
                    setTimeout(waitForGtag, 100);
                }
            };

            // Start waiting for the real gtag function
            waitForGtag();
        };

        script.onerror = () => {
            console.error("Failed to load Google Analytics script");
        };

        document.head.appendChild(script);

        console.log(
            "Google Analytics initialization complete with ID:",
            GA_MEASUREMENT_ID,
        );
        console.log("dataLayer:", window.dataLayer);
    };

    // Settings panel for consent withdrawal
    if (showSettings) {
        const currentVariant = BANNER_VARIANTS[variant];

        return (
            <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 z-50">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold mb-2">
                            {currentVariant.settingsTitle}
                        </h3>
                        <p className="text-sm text-gray-300 mb-4">
                            {currentVariant.settingsDescription}
                        </p>
                    </div>

                    <div className="bg-gray-800 p-4 rounded mb-4">
                        <div className="flex justify-between items-start">
                            <div>
                                <h4 className="font-medium">
                                    Analytics Cookies
                                </h4>
                                <p className="text-sm text-gray-300 mt-1">
                                    {currentVariant.cookieDescription}
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

    const currentVariant = BANNER_VARIANTS[variant];

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 z-50">
            <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-sm">
                    <p>
                        {currentVariant.mainText}{" "}
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
