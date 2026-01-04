import type { Metadata } from "next";
import { Inter } from "next/font/google";
import React from "react";
import Footer from "@/app/_components/footer";
import CookieBanner from "@/components/cookie-banner";
import GADebug from "@/components/ga-debug";

import "./globals.css";

const GA_MEASUREMENT_ID = "G-ZPSKLMVM2V";

const inter = Inter({ subsets: ["latin"] });

const title = "Join Function";
const description =
    "We are responsible for hundreds of thousands of deployments to the cloud through automation. Learn some of these best practices.";

export const metadata: Metadata = {
    metadataBase: new URL("https://fnjoin.com"),
    title,
    description,
    openGraph: {
        title,
        description,
        url: "https://fnjoin.com/",
        type: "website",
        images: [
            {
                url: "/fnjoin.png",
                width: 1200,
                height: 630,
                alt: "Join Function - Cloud automation best practices",
            },
        ],
    },

    twitter: {
        card: "summary_large_image",
        creator: "@archiecowan",
        title,
        description,
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <link
                    rel="icon"
                    href="/favicon/favicon.svg"
                    type="image/svg+xml"
                />
                <link
                    rel="apple-touch-icon"
                    sizes="180x180"
                    href="/favicon/apple-touch-icon.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="32x32"
                    href="/favicon/favicon-32x32.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="16x16"
                    href="/favicon/favicon-16x16.png"
                />
                <link rel="manifest" href="/favicon/site.webmanifest" />
                <link
                    rel="mask-icon"
                    href="/favicon/safari-pinned-tab.svg"
                    color="#2563eb"
                />
                <link rel="shortcut icon" href="/favicon/favicon.ico" />
                <meta name="msapplication-TileColor" content="#2563eb" />
                <meta
                    name="msapplication-config"
                    content="/favicon/browserconfig.xml"
                />
                <meta name="theme-color" content="#2563eb" />
                <link
                    rel="alternate"
                    href="https://fnjoin.com/index.xml"
                    type="application/rss+xml"
                    title="fn:join"
                />

                {/* Google Analytics Consent Mode v2 - Advanced Consent Mode */}
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            // Define dataLayer and gtag function
                            window.dataLayer = window.dataLayer || [];
                            function gtag() { dataLayer.push(arguments); }
                            
                            // Check localStorage for existing consent before setting defaults
                            let consentState = 'denied';
                            try {
                                const storedConsent = localStorage.getItem('cookie-consent');
                                if (storedConsent === 'accepted') {
                                    consentState = 'granted';
                                }
                            } catch (e) {
                                // localStorage not available (SSR), use default 'denied'
                            }
                            
                            // Set default consent state based on stored preferences
                            gtag('consent', 'default', {
                                'ad_user_data': consentState,
                                'ad_personalization': consentState, 
                                'ad_storage': consentState,
                                'analytics_storage': consentState,
                                'wait_for_update': 500,
                            });
                        `,
                    }}
                />

                {/* Google tag (gtag.js) - Load immediately in advanced mode */}
                <script
                    async
                    src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
                />

                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            window.dataLayer = window.dataLayer || [];
                            function gtag() { dataLayer.push(arguments); }
                            
                            // Initialize gtag with timestamp
                            gtag('js', new Date());
                            
                            // Configure Google Analytics
                            gtag('config', '${GA_MEASUREMENT_ID}');
                        `,
                    }}
                />
            </head>
            <body className={inter.className}>
                <div className="min-h-screen">{children}</div>
                <Footer />
                <CookieBanner />
                <GADebug />
            </body>
        </html>
    );
}
