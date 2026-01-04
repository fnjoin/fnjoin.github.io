"use client";

import { useState, useCallback } from "react";

// GDPR consent categories with descriptions
export const CONSENT_CATEGORIES = {
    ad_storage: {
        name: "Advertising Storage",
        description:
            "Enables storage (such as cookies) related to advertising.",
        key: "ad_storage" as const,
    },
    ad_user_data: {
        name: "Advertising User Data",
        description:
            "Sets consent for sending user data related to advertising to Google. Required for measurement use cases, such as enhanced conversions and tag-based conversion tracking.",
        key: "ad_user_data" as const,
    },
    ad_personalization: {
        name: "Advertising Personalization",
        description: "Sets consent for personalized advertising.",
        key: "ad_personalization" as const,
    },
    analytics_storage: {
        name: "Analytics Storage",
        description:
            "Enables storage (such as cookies) related to analytics e.g. visit duration.",
        key: "analytics_storage" as const,
    },
} as const;

export type ConsentKey = keyof typeof CONSENT_CATEGORIES;
export type ConsentState = Record<ConsentKey, boolean>;

export function useCookieConsent() {
    const [consentState, setConsentState] = useState<ConsentState>({
        ad_storage: false,
        ad_user_data: false,
        ad_personalization: false,
        analytics_storage: false,
    });

    // Load consent state from localStorage
    const loadConsentFromStorage = (): ConsentState => {
        const defaultState: ConsentState = {
            ad_storage: false,
            ad_user_data: false,
            ad_personalization: false,
            analytics_storage: false,
        };

        try {
            const stored = localStorage.getItem("gdpr-consent-state");
            if (stored) {
                const parsed = JSON.parse(stored);
                // Ensure all required keys exist
                return {
                    ad_storage: parsed.ad_storage ?? false,
                    ad_user_data: parsed.ad_user_data ?? false,
                    ad_personalization: parsed.ad_personalization ?? false,
                    analytics_storage: parsed.analytics_storage ?? false,
                };
            }
        } catch (e) {
            console.error("Error loading consent from localStorage:", e);
        }

        return defaultState;
    };

    // Save consent state to localStorage
    const saveConsentToStorage = (state: ConsentState) => {
        try {
            localStorage.setItem("gdpr-consent-state", JSON.stringify(state));
            // Also save a simple flag for backward compatibility
            const hasAnyConsent = Object.values(state).some(Boolean);
            localStorage.setItem(
                "cookie-consent",
                hasAnyConsent ? "accepted" : "rejected",
            );
        } catch (e) {
            console.error("Error saving consent to localStorage:", e);
        }
    };

    const updateConsentState = (state: ConsentState) => {
        console.log("Updating consent state:", state);

        const gtag = (window as any).gtag;

        if (!gtag) {
            console.error(
                "gtag function not available - consent mode not initialized",
            );
            return;
        }

        // Update consent state
        gtag("consent", "update", {
            ad_user_data: state.ad_user_data ? "granted" : "denied",
            ad_personalization: state.ad_personalization ? "granted" : "denied",
            ad_storage: state.ad_storage ? "granted" : "denied",
            analytics_storage: state.analytics_storage ? "granted" : "denied",
        });

        console.log("Consent updated");

        // Send event if any consent is granted
        const hasAnyConsent = Object.values(state).some(Boolean);
        if (hasAnyConsent) {
            setTimeout(() => {
                gtag("event", "consent_granted", {
                    event_category: "GDPR",
                    event_label: "user_accepted_cookies",
                });
            }, 500);
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

    const handleConsentChange = useCallback(
        (key: ConsentKey, value: boolean) => {
            const newState = { ...consentState, [key]: value };
            setConsentState(newState);
            saveConsentToStorage(newState);
            updateConsentState(newState);

            if (!value) {
                clearGoogleAnalytics();
            }
        },
        [consentState],
    );

    const handleAcceptAll = useCallback(() => {
        const allAccepted: ConsentState = {
            ad_storage: true,
            ad_user_data: true,
            ad_personalization: true,
            analytics_storage: true,
        };
        setConsentState(allAccepted);
        saveConsentToStorage(allAccepted);
        updateConsentState(allAccepted);
        return allAccepted;
    }, []);

    const handleRejectAll = useCallback(() => {
        const allRejected: ConsentState = {
            ad_storage: false,
            ad_user_data: false,
            ad_personalization: false,
            analytics_storage: false,
        };
        setConsentState(allRejected);
        saveConsentToStorage(allRejected);
        updateConsentState(allRejected);
        clearGoogleAnalytics();
        return allRejected;
    }, []);

    const loadStoredConsent = useCallback(() => {
        const stored = loadConsentFromStorage();
        setConsentState(stored);
        return stored;
    }, []);

    const trackConsentEvent = useCallback(
        (action: string, variant?: string, category?: ConsentKey) => {
            console.log(
                "trackConsentEvent called with:",
                action,
                variant,
                category,
            );

            const gtag = (window as any).gtag;
            if (gtag) {
                console.log("Sending consent event to GA...");
                gtag("event", "cookie_consent", {
                    event_category: "GDPR",
                    event_label: variant
                        ? `variant_${variant}`
                        : "settings_updated",
                    action: action,
                    variant: variant || "settings",
                    category: category || "all",
                });
                console.log("Consent event sent");
            } else {
                console.error(
                    "gtag not available when trying to track consent",
                );
            }
        },
        [],
    );

    return {
        consentState,
        setConsentState,
        handleConsentChange,
        handleAcceptAll,
        handleRejectAll,
        loadStoredConsent,
        trackConsentEvent,
        updateConsentState,
    };
}
