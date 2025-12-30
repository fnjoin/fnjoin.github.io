import Link from "next/link";
import React from "react";
import Header from "../_components/header";
import Copyright from "@/app/_components/copy";
import { BlogRepository } from "@/lib/repository";
import { getAllTags, getTagCounts } from "@/lib/tags";

export default async function TagsIndex() {
    const repository = BlogRepository.fromCwd();
    const allPosts = repository.getAllPosts();
    const allTags = getAllTags(allPosts);
    const tagCounts = getTagCounts(allPosts);

    return (
        <main>
            <Header />
            <div className="container mx-auto px-5">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold mb-4">All Tags</h1>
                        <p className="text-gray-600">Browse posts by topic</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {allTags.map((tag) => (
                            <Link
                                key={tag}
                                href={`/tags/${tag}`}
                                className="block p-4 border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-md transition-all"
                            >
                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-semibold text-gray-800">
                                        #{tag}
                                    </span>
                                    <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                                        {tagCounts[tag]}{" "}
                                        {tagCounts[tag] === 1
                                            ? "post"
                                            : "posts"}
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
            <Copyright author="Blog Author" startDate={new Date(2024, 0, 1)} />
        </main>
    );
}
