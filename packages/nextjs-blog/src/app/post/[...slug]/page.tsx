import { Metadata } from "next";
import { notFound } from "next/navigation";
import React from "react";
import Header from "../../_components/header";
import Copyright from "@/app/_components/copy";
import { PostBody } from "@/app/_components/post-body";
import { ReadingStats } from "@/app/_components/reading-stats";
import ScrollTracker from "@/app/_components/scrolltracking";
import { getFirstNWordsFromMarkdown } from "@/lib/markdown-utils";
import {
    Article,
    Author,
    FigureFence,
    Heading1,
    ImageWithinFigure,
    Tags,
} from "@/lib/markdowncomponents";
import { BlogRepository } from "@/lib/repository";

export default async function Post({ params }: Params) {
    const repository = BlogRepository.fromCwd();
    const post = repository.getPostByPath(["post", ...params.slug].join("/"));

    if (!post) {
        return notFound();
    }

    return (
        <main>
            <Header />
            <Article>
                <Tags tags={post.tags} />
                <Heading1>{post.title}</Heading1>
                <ReadingStats
                    wordCount={post.wordCount}
                    readingTime={post.readingTime}
                    className="mb-4"
                />
                <Author {...post.author_detail} />
                {post.coverImage && (
                    <FigureFence caption={post.coverImage.caption}>
                        <ImageWithinFigure
                            src={post.coverImage.imageSrc}
                            alt={post.coverImage.caption}
                        />
                    </FigureFence>
                )}
                <PostBody content={post} />

                <Copyright
                    author={post.author_detail.name ?? "Author"}
                    startDate={post.date}
                />
                <ScrollTracker postId={post.slug} />
            </Article>
        </main>
    );
}

type Params = {
    params: {
        slug: string[];
    };
};

export function generateMetadata({ params }: Params): Metadata {
    const repository = BlogRepository.fromCwd();
    const post = repository.getPostByPath(["post", ...params.slug].join("/"));

    if (!post) {
        return notFound();
    }

    const title = `${post.title} | Join Function`;

    // if this is empty, no description is included
    const description =
        post.excerpt || getFirstNWordsFromMarkdown(post.content, 30) + "...";

    return {
        metadataBase: new URL("https://fnjoin.com"),
        title,
        description, // note, if this is empty, no description is included
        alternates: {
            canonical: `https://fnjoin.com/${post.slug}/`,
        },

        robots: {
            follow: true,
            index: true,
        },
        openGraph: {
            title,
            description,
            url: `https://fnjoin.com/${post.slug}/`,
            type: "article",
            images: post.ogImage?.url
                ? [post.ogImage.url]
                : post.coverImage?.imageSrc
                  ? [post.coverImage.imageSrc]
                  : ["/fnjoin.png"],
        },
        twitter: {
            card: "summary_large_image",
            creator: post.author_detail.twitter,
            title,
            description,
            images: post.ogImage?.url
                ? [post.ogImage.url]
                : post.coverImage?.imageSrc
                  ? [post.coverImage.imageSrc]
                  : ["/fnjoin.png"],
        },
    };
}

export async function generateStaticParams() {
    const repository = BlogRepository.fromCwd();
    const posts = repository.getAllPosts();
    return posts.map((post) => ({
        slug: post.slug.split("/").slice(1),
    }));
}
