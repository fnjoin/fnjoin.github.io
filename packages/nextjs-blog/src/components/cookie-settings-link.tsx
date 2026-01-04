"use client";

import { useState, useEffect } from "react";
import CookieSettingsModal from "@/components/cookie-settings-modal";
import { useCookieConsent } from "@/hooks/use-cookie-consent";

export default function CookieSettingsLink() {
    const [showSettings, setShowSettings] = useState(false);

    const {
        consentState,
        handleConsentChange,
        handleAcceptAll,
        handleRejectAll,
        loadStoredConsent,
    } = useCookieConsent();

    useEffect(() => {
        if (showSettings) {
            // Load current consent state when settings are opened
            loadStoredConsent();
        }
    }, [showSettings, loadStoredConsent]);

    const handleAcceptAllAndClose = () => {
        handleAcceptAll();
        setShowSettings(false);
    };

    const handleRejectAllAndClose = () => {
        handleRejectAll();
        setShowSettings(false);
    };

    if (showSettings) {
        return (
            <>
                {/* Backdrop */}
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={() => setShowSettings(false)}
                />

                <CookieSettingsModal
                    consentState={consentState}
                    onConsentChange={handleConsentChange}
                    onAcceptAll={handleAcceptAllAndClose}
                    onRejectAll={handleRejectAllAndClose}
                    onClose={() => setShowSettings(false)}
                    title="Cookie Preferences"
                    description="Manage your cookie preferences. You can change these settings at any time."
                    showBackButton={false}
                />
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
