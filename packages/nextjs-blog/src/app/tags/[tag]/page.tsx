import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import { getAllTags, getPostsByTag, getTagContent } from "../../../lib/tags";
import Header from "../../_components/header";
import DateFormatter from "@/app/_components/date-formatter";
import { PostBody } from "@/app/_components/post-body";
import { BlogRepository } from "@/lib/repository";

interface Params {
    params: {
        tag: string;
    };
}

export async function generateStaticParams() {
    const repository = BlogRepository.fromCwd();
    const allTags = getAllTags(repository.getAllPosts());

    return allTags.map((tag) => ({
        tag: tag,
    }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
    const { tag } = params;
    const repository = BlogRepository.fromCwd();
    const posts = getPostsByTag(repository.getAllPosts(), tag);

    if (posts.length === 0) {
        return {
            title: "Tag Not Found",
        };
    }

    return {
        title: `Posts tagged with "${tag}"`,
        description: `All blog posts tagged with ${tag}`,
    };
}

export default async function TagPage({ params }: Params) {
    const { tag } = params;
    const repository = BlogRepository.fromCwd();
    const posts = getPostsByTag(repository.getAllPosts(), tag);

    if (posts.length === 0) {
        return notFound();
    }

    // Try to get optional tag content
    const tagContent = getTagContent(tag);

    return (
        <main>
            <Header />
            <div className="container mx-auto px-5">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold mb-4">
                            Posts tagged with &ldquo;{tag}&rdquo;
                        </h1>
                        <p className="text-gray-600">
                            {posts.length}{" "}
                            {posts.length === 1 ? "post" : "posts"} found
                        </p>
                    </div>

                    {/* Optional tag description content */}
                    {tagContent && (
                        <div className="mb-12 prose prose-lg max-w-none">
                            <PostBody content={tagContent} />
                        </div>
                    )}

                    {/* Posts list */}
                    <div className="space-y-8">
                        {posts.map((post) => (
                            <article
                                key={post.slug}
                                className="border-b border-gray-200 pb-8 last:border-b-0"
                            >
                                <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-4">
                                    <div className="md:w-2/3">
                                        <p className="text-gray-600 text-sm mb-2">
                                            <DateFormatter
                                                dateString={post.date}
                                            />
                                        </p>
                                        <h2 className="text-2xl font-bold text-black mb-3">
                                            <Link
                                                href={`/${post.slug}`}
                                                className="hover:underline"
                                            >
                                                {post.title}
                                            </Link>
                                        </h2>
                                        {post.excerpt && (
                                            <p className="text-gray-700 mb-3">
                                                {post.excerpt}
                                            </p>
                                        )}
                                        <div className="flex flex-wrap gap-2 mb-2">
                                            {post.tags.map((postTag) => (
                                                <Link
                                                    key={postTag}
                                                    href={`/tags/${postTag}`}
                                                    className={`text-xs px-2 py-1 rounded-full ${
                                                        postTag === tag
                                                            ? "bg-blue-100 text-blue-800 font-semibold"
                                                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                                    }`}
                                                >
                                                    #{postTag}
                                                </Link>
                                            ))}
                                        </div>
                                        <div className="text-xs text-gray-400">
                                            {post.wordCount.toLocaleString()}{" "}
                                            words · {post.readingTime} min read
                                        </div>
                                    </div>
                                    <div className="md:w-1/3">
                                        {post.coverImage?.imageSrc && (
                                            <Link href={`/${post.slug}`}>
                                                <Image
                                                    src={
                                                        post.coverImage.imageSrc
                                                    }
                                                    alt={
                                                        post.coverImage
                                                            .caption ||
                                                        post.title
                                                    }
                                                    width={400}
                                                    height={300}
                                                    className="w-full h-48 object-cover rounded-lg hover:opacity-90 transition-opacity"
                                                />
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}
