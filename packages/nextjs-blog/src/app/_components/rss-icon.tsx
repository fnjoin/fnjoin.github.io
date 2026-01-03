import { Rss } from "lucide-react";
import Link from "next/link";
import React from "react";

const RSSIcon = () => {
    return (
        <Link
            href="/index.xml"
            className="inline-flex items-center justify-center w-10 h-10 text-gray-500 hover:text-orange-500 transition-colors duration-200"
            title="RSS Feed"
            aria-label="RSS Feed"
        >
            <Rss className="w-6 h-6" />
        </Link>
    );
};

export default RSSIcon;
