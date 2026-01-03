/** app/sitemap.xml/route.ts **/
import * as xmljs from "xml-js";
import { MyPost } from "@/interfaces/mypost";
import { getFirstNWordsFromMarkdown } from "@/lib/markdown-utils";
import { BlogRepository } from "@/lib/repository";

function getPostsForRSS(): MyPost[] {
    const posts = BlogRepository.fromCwd().getAllPosts();
    return posts;
}

function formatDateForRSS(date: Date): string {
    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];

    const weekday = weekdays[date.getUTCDay()];
    const day = String(date.getUTCDate()).padStart(2, "0");
    const month = months[date.getUTCMonth()];
    const year = date.getUTCFullYear();
    const hours = String(date.getUTCHours()).padStart(2, "0");
    const minutes = String(date.getUTCMinutes()).padStart(2, "0");
    const seconds = String(date.getUTCSeconds()).padStart(2, "0");

    // RFC-822 format: "Wed, 02 Oct 2002 08:00:00 GMT"
    const formattedDate = `${weekday}, ${day} ${month} ${year} ${hours}:${minutes}:${seconds} GMT`;
    return formattedDate;
}

function getAuthorEmail(authorName: string): string {
    // Map author names to email addresses for RSS compliance
    const authorEmails: { [key: string]: string } = {
        "Archie Cowan": "contact@fnjoin.com",
        "Salman Malik": "contact@fnjoin.com",
    };

    return authorEmails[authorName] || "contact@fnjoin.com";
}

function getRSS() {
    const posts = getPostsForRSS();

    const rssObject = {
        _declaration: { _attributes: { version: "1.0", encoding: "utf-8" } },
        rss: {
            _attributes: {
                "xmlns:atom": "http://www.w3.org/2005/Atom",
                version: "2.0",
            },
            channel: {
                title: { _text: "fn:join" },
                link: { _text: "https://fnjoin.com/" },
                description: { _text: "Recent content on fn:join" },
                managingEditor: {
                    _text: "contact@fnjoin.com",
                },
                webMaster: {
                    _text: "contact@fnjoin.com",
                },
                lastBuildDate: { _text: formatDateForRSS(new Date()) },
                "atom:link": {
                    _attributes: {
                        href: "https://fnjoin.com/index.xml",
                        rel: "self",
                        type: "application/rss+xml",
                    },
                },
                item: posts.map((post) => ({
                    title: { _text: post.title },
                    link: {
                        _text:
                            `https://fnjoin.com/${post.slug}` +
                            (post.slug.endsWith("/") ? "" : "/"),
                    },
                    description: {
                        _text:
                            post.excerpt ||
                            getFirstNWordsFromMarkdown(post.content, 100) +
                                "...",
                    },
                    author: { _text: getAuthorEmail(post.author) },
                    pubDate: { _text: formatDateForRSS(post.date) },
                    guid: {
                        _text:
                            `https://fnjoin.com/${post.slug}` +
                            (post.slug.endsWith("/") ? "" : "/"),
                    },
                })),
            },
        },
    };

    const options = { compact: true, ignoreComment: true, spaces: 4 };
    const rssXml = xmljs.js2xml(rssObject, options);

    return rssXml;
}

export async function GET() {
    return new Response(getRSS(), {
        headers: {
            "Content-Type": "text/xml",
            "Cache-Control": "no-cache, no-store, must-revalidate",
            Pragma: "no-cache",
            Expires: "0",
        },
    });
}
