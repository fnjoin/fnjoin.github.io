"use client";

import { useState, useEffect } from "react";

export default function GADebug() {
    const [gaStatus, setGaStatus] = useState<{
        gtag: boolean;
        dataLayer: boolean;
        consent: string | null;
        cookies: string[];
    }>({
        gtag: false,
        dataLayer: false,
        consent: null,
        cookies: [],
    });

    useEffect(() => {
        const checkGA = () => {
            if (typeof window === "undefined") return;

            const consent = localStorage.getItem("cookie-consent");
            const cookies = document.cookie
                .split(";")
                .filter((cookie) => cookie.includes("_ga"))
                .map((cookie) => cookie.trim());

            setGaStatus({
                gtag: !!(window as any).gtag,
                dataLayer: !!(window as any).dataLayer,
                consent,
                cookies,
            });
        };

        // Check immediately and then every second
        checkGA();
        const interval = setInterval(checkGA, 1000);

        return () => clearInterval(interval);
    }, []);

    // Only show when explicitly enabled via localStorage
    if (
        typeof window === "undefined" ||
        !localStorage.getItem("show-ga-debug")
    ) {
        return null;
    }

    return (
        <div className="fixed top-4 left-4 bg-black text-white p-3 text-xs rounded z-50 max-w-xs">
            <div className="font-bold mb-2">GA Debug</div>
            <div>gtag: {gaStatus.gtag ? "✅" : "❌"}</div>
            <div>dataLayer: {gaStatus.dataLayer ? "✅" : "❌"}</div>
            <div>consent: {gaStatus.consent || "none"}</div>
            <div>cookies: {gaStatus.cookies.length}</div>
            {gaStatus.cookies.map((cookie, i) => (
                <div key={i} className="text-xs opacity-75">
                    {cookie}
                </div>
            ))}
            <button
                onClick={() => localStorage.removeItem("show-ga-debug")}
                className="mt-2 text-xs underline"
            >
                Hide
            </button>
        </div>
    );
}
