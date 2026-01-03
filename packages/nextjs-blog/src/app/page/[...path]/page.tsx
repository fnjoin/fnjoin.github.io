import { Metadata } from "next";
import { notFound } from "next/navigation";
import React from "react";
import Header from "../../_components/header";
import { PostBody } from "@/app/_components/post-body";
import { getFirstNWordsFromMarkdown } from "@/lib/markdown-utils";
import {
    Article,
    Author,
    FigureFence,
    Heading1,
    ImageWithinFigure,
    Tags,
} from "@/lib/markdowncomponents";
import { PageRepository } from "@/lib/repository";

type Params = {
    params: {
        path: string[];
    };
};

const repository = PageRepository.fromCwd();

export default async function Post({ params }: Params) {
    const post = repository.getPostByPath("page/" + params.path.join("/"));

    if (!post) {
        console.log("post not found", params);
        return notFound();
    }
    return (
        <main>
            <Header />
            <Article>
                <Tags tags={post.tags} />
                <Heading1>{post.title}</Heading1>
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
            </Article>
        </main>
    );
}

export function generateMetadata({ params }: Params): Metadata {
    const post = repository.getPostByPath("page/" + params.path.join("/"));

    if (!post) {
        return notFound();
    }

    const title = `${post.title} | Join Function`;

    if (post.ogImage?.url || post.coverImage?.imageSrc) {
        return {
            metadataBase: new URL("https://fnjoin.com"),
            title,
            description:
                post.excerpt ||
                getFirstNWordsFromMarkdown(post.content, 30) + "...",
            alternates: {
                canonical: `https://fnjoin.com/${post.slug}/`,
            },
            openGraph: {
                title,
                url: `https://fnjoin.com/${post.slug}/`,
                type: "article",
                images: post.ogImage?.url
                    ? [post.ogImage.url]
                    : post.coverImage?.imageSrc
                      ? [post.coverImage.imageSrc]
                      : ["/fnjoin.png"],
            },
        };
    }

    return {
        metadataBase: new URL("https://fnjoin.com"),
        title,
        description:
            post.excerpt ||
            getFirstNWordsFromMarkdown(post.content, 30) + "...",
        alternates: {
            canonical: `https://fnjoin.com/${post.slug}/`,
        },
        openGraph: {
            title,
            url: `https://fnjoin.com/${post.slug}/`,
            type: "article",
            images: ["/fnjoin.png"],
        },
    };
}

export async function generateStaticParams() {
    const posts = repository.getAllPosts();

    console.log(
        "generate static params",
        posts.map((post) => ({
            path: post.slug.split("/").slice(1),
        })),
    );
    return posts.map((post) => ({
        path: post.slug.split("/").slice(1),
    }));
}
