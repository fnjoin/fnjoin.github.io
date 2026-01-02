import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Google Analytics Test Page",
    robots: {
        index: false,
        follow: false,
    },
};

export default function TestGALayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
