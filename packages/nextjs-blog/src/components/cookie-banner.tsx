"use client";

import { useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch";

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
    const [analyticsEnabled, setAnalyticsEnabled] = useState(false);

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
            setAnalyticsEnabled(true);
            // Update consent state since GA script is already loaded (Advanced Mode)
            updateConsentToGranted();
        } else {
            setAnalyticsEnabled(false);
        }
        // If consent === "rejected", consent remains denied (default from layout.tsx)
    }, []);

    const updateConsentToGranted = () => {
        console.log("Updating consent to granted (Advanced Consent Mode)");

        const gtag = (window as any).gtag;

        if (!gtag) {
            console.error(
                "gtag function not available - consent mode not initialized",
            );
            return;
        }

        // Update consent state to granted (GA script already loaded)
        gtag("consent", "update", {
            ad_user_data: "granted",
            ad_personalization: "granted",
            ad_storage: "granted",
            analytics_storage: "granted",
        });

        console.log("Consent updated to granted in Advanced Mode");

        // Send a test event after consent update
        setTimeout(() => {
            gtag("event", "consent_granted", {
                event_category: "GDPR",
                event_label: "user_accepted_cookies",
            });
            console.log("Consent granted event sent");
        }, 500);
    };

    const updateConsentToDenied = () => {
        console.log("Updating consent to denied (Advanced Consent Mode)");

        const gtag = (window as any).gtag;

        if (!gtag) {
            console.error(
                "gtag function not available - consent mode not initialized",
            );
            return;
        }

        // Update consent state to denied
        gtag("consent", "update", {
            ad_user_data: "denied",
            ad_personalization: "denied",
            ad_storage: "denied",
            analytics_storage: "denied",
        });

        console.log("Consent updated to denied in Advanced Mode");
    };

    const handleSwitchChange = (checked: boolean) => {
        setAnalyticsEnabled(checked);

        if (checked) {
            localStorage.setItem("cookie-consent", "accepted");
            updateConsentToGranted();

            // Track acceptance with gtag event
            setTimeout(() => {
                trackConsentEvent("accept", variant);
            }, 1000);
        } else {
            localStorage.setItem("cookie-consent", "rejected");
            updateConsentToDenied();
            clearGoogleAnalytics();
        }
    };

    const handleAcceptAll = () => {
        setAnalyticsEnabled(true);
        handleSwitchChange(true);
        setShowBanner(false);
        setShowSettings(false);
    };

    const handleRejectAll = () => {
        setAnalyticsEnabled(false);
        handleSwitchChange(false);
        setShowBanner(false);
        setShowSettings(false);
    };

    const handleSaveSettings = () => {
        setShowBanner(false);
        setShowSettings(false);
    };

    const handleShowSettings = () => {
        setShowSettings(true);
    };

    const trackConsentEvent = (action: "accept", testVariant: "A" | "B") => {
        console.log("trackConsentEvent called with:", action, testVariant);

        const gtag = (window as any).gtag;
        if (gtag) {
            console.log("Sending consent event to GA...");
            gtag("event", "cookie_consent", {
                event_category: "GDPR",
                event_label: `variant_${testVariant}`,
                action: action,
                variant: testVariant,
            });
            console.log("Consent event sent:", testVariant);

            // Also send a simple test event
            gtag("event", "test_event", {
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
                        <div className="flex justify-between items-center">
                            <div className="flex-1">
                                <h4 className="font-medium mb-1">
                                    Analytics Cookies
                                </h4>
                                <p className="text-sm text-gray-300">
                                    {currentVariant.cookieDescription}
                                </p>
                            </div>
                            <div className="ml-4 flex items-center">
                                <Switch
                                    checked={analyticsEnabled}
                                    onCheckedChange={handleSwitchChange}
                                    className="data-[state=checked]:bg-blue-600 data-[state=unchecked]:bg-gray-600"
                                />
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
                                onClick={handleRejectAll}
                                className="px-4 py-2 text-sm border border-gray-600 rounded hover:bg-gray-800"
                            >
                                Reject All
                            </button>
                            <button
                                onClick={handleSaveSettings}
                                className="px-4 py-2 text-sm bg-blue-600 rounded hover:bg-blue-700"
                            >
                                Save Settings
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
                        onClick={handleRejectAll}
                        className="px-4 py-2 text-sm border border-gray-600 rounded hover:bg-gray-800 transition-colors"
                    >
                        Decline
                    </button>
                    <button
                        onClick={handleAcceptAll}
                        className="px-4 py-2 text-sm bg-blue-600 rounded hover:bg-blue-700 transition-colors"
                    >
                        Accept
                    </button>
                </div>
            </div>
        </div>
    );
}
