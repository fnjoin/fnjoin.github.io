"use client";

import { Switch } from "@/components/ui/switch";
import {
    CONSENT_CATEGORIES,
    type ConsentState,
    type ConsentKey,
} from "@/hooks/use-cookie-consent";

interface CookieSettingsModalProps {
    consentState: ConsentState;
    onConsentChange: (key: ConsentKey, value: boolean) => void;
    onAcceptAll: () => void;
    onRejectAll: () => void;
    onClose: () => void;
    title?: string;
    description?: string;
    showBackButton?: boolean;
}

export default function CookieSettingsModal({
    consentState,
    onConsentChange,
    onAcceptAll,
    onRejectAll,
    onClose,
    title = "Cookie Preferences",
    description = "Manage your cookie preferences. You can change these settings at any time.",
    showBackButton = false,
}: CookieSettingsModalProps) {
    return (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 z-50">
            <div className="max-w-4xl mx-auto">
                <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">{title}</h3>
                    <p className="text-sm text-gray-300 mb-4">{description}</p>
                </div>

                <div className="space-y-3 mb-6">
                    {Object.entries(CONSENT_CATEGORIES).map(
                        ([key, category]) => (
                            <div key={key} className="bg-gray-800 p-4 rounded">
                                <div className="flex justify-between items-start">
                                    <div className="flex-1 pr-4">
                                        <h4 className="font-medium mb-1">
                                            {category.name}
                                        </h4>
                                        <p className="text-sm text-gray-300">
                                            {category.description}
                                        </p>
                                    </div>
                                    <div className="flex items-center">
                                        <Switch
                                            checked={
                                                consentState[key as ConsentKey]
                                            }
                                            onCheckedChange={(checked) =>
                                                onConsentChange(
                                                    key as ConsentKey,
                                                    checked,
                                                )
                                            }
                                            className="data-[state=checked]:bg-blue-600 data-[state=unchecked]:bg-gray-600"
                                        />
                                    </div>
                                </div>
                            </div>
                        ),
                    )}
                </div>

                <div className="flex justify-between items-center">
                    <button
                        onClick={onClose}
                        className="text-sm text-gray-400 hover:text-white"
                    >
                        {showBackButton ? "← Back" : "← Close"}
                    </button>
                    <div className="flex gap-3">
                        <button
                            onClick={onRejectAll}
                            className="px-4 py-2 text-sm border border-gray-600 rounded hover:bg-gray-800"
                        >
                            Reject All
                        </button>
                        <button
                            onClick={onAcceptAll}
                            className="px-4 py-2 text-sm bg-green-600 rounded hover:bg-green-700"
                        >
                            Accept All
                        </button>
                        {showBackButton && (
                            <button
                                onClick={onClose}
                                className="px-4 py-2 text-sm bg-blue-600 rounded hover:bg-blue-700"
                            >
                                Save Settings
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
