"use client";

import { useState, useEffect } from "react";
import CookieSettingsModal from "@/components/cookie-settings-modal";
import { useCookieConsent } from "@/hooks/use-cookie-consent";

// A/B test variants
const BANNER_VARIANTS = {
    A: {
        id: "conversational",
        mainText:
            "We're just developers sharing what we've learned about cloud automation and development. Analytics help us understand which content is actually useful to you, so we can write more of what helps and less of what doesn't. No ads, no tracking across sites—just knowing if our writing is worth your time.",
        settingsTitle: "Help Me Write Better Content",
        settingsDescription:
            "As developers, we rely on analytics to understand what's actually helpful. You can change these settings anytime.",
    },
    B: {
        id: "concise",
        mainText:
            "This site uses analytics cookies to improve content quality. No personal data collection or cross-site tracking.",
        settingsTitle: "Cookie Preferences",
        settingsDescription:
            "Manage your cookie preferences. You can change these settings at any time.",
    },
};

export default function CookieBanner() {
    const [showBanner, setShowBanner] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [variant, setVariant] = useState<"A" | "B">("A");

    const {
        consentState,
        handleConsentChange,
        handleAcceptAll: acceptAll,
        handleRejectAll: rejectAll,
        loadStoredConsent,
        trackConsentEvent,
    } = useCookieConsent();

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

        // Check if user has made any consent choice
        const hasStoredConsent = localStorage.getItem("gdpr-consent-state");
        if (!hasStoredConsent) {
            setShowBanner(true);
        } else {
            // Load and apply stored consent
            loadStoredConsent();
        }
    }, [loadStoredConsent]);

    const handleAcceptAll = () => {
        acceptAll();
        setTimeout(() => {
            trackConsentEvent("accept_all", variant);
        }, 1000);
        setShowBanner(false);
        setShowSettings(false);
    };

    const handleRejectAll = () => {
        rejectAll();
        setShowBanner(false);
        setShowSettings(false);
    };

    const handleCustomize = () => {
        setShowSettings(true);
    };

    const handleSaveSettings = () => {
        setShowBanner(false);
        setShowSettings(false);
    };

    const handleConsentChangeWithTracking = (key: any, value: boolean) => {
        handleConsentChange(key, value);
        if (value) {
            setTimeout(() => {
                trackConsentEvent("accept", variant, key);
            }, 1000);
        }
    };

    // Settings panel for consent withdrawal
    if (showSettings) {
        const currentVariant = BANNER_VARIANTS[variant];

        return (
            <CookieSettingsModal
                consentState={consentState}
                onConsentChange={handleConsentChangeWithTracking}
                onAcceptAll={handleAcceptAll}
                onRejectAll={handleRejectAll}
                onClose={handleSaveSettings}
                title={currentVariant.settingsTitle}
                description={currentVariant.settingsDescription}
                showBackButton={true}
            />
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
                            onClick={handleCustomize}
                            className="underline hover:no-underline"
                        >
                            See details
                        </button>
                    </p>
                </div>
                <div className="flex gap-3 flex-shrink-0">
                    <button
                        onClick={handleCustomize}
                        className="px-4 py-2 text-sm border border-gray-600 rounded hover:bg-gray-800 transition-colors"
                    >
                        Customize
                    </button>
                    <button
                        onClick={handleAcceptAll}
                        className="px-4 py-2 text-sm bg-blue-600 rounded hover:bg-blue-700 transition-colors"
                    >
                        Accept All
                    </button>
                </div>
            </div>
        </div>
    );
}
