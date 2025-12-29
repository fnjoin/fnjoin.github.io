---
title: "AI Coding Tool Tips: Keep Dependencies in Your Workspace"
author: Archie Cowan
subtitle: Copy dependency source code into your repo—AI reads it better than it queries APIs
date: 2025-12-28
coverImage:
    imageSrc: /img/2025-12-28-keep-dependencies-in-workspace/head-img.png
    caption: |
        Developer choosing between complex MCP setup and simple file copying approach.
        (Image credit, created using AI in the style of [xkcd](https://xkcd.com/))
tags: ["ai-coding", "dependencies", "context"]
---

I spent 20 minutes watching my AI assistant struggle with a new CDK feature. Then I realized I was making this way harder than it needed to be.

## The Costly Context Switch Problem

So much of software development is understanding how to use abstractions in libraries you haven't used before. The reason you're using that library instead of writing your own is that the startup cost or maintenance load is too much to handle yourself. This is normal. Most companies don't write their own operating systems, device drivers, or filesystems, but we all need to write a file to disk at some point.

Learning these APIs can be quite a diversion from the value you're trying to create in your own code though. Sometimes the docs are out of date and you have to read the code itself. Honestly, this is kind of fun for me. But when I'm faced with a time constraint—like needing to be prepared for a customer demo that's just hours away—such diversions are no fun at all.

## AI Changes Everything (Almost)

Thanks to AI coding assistants, we have a new superpower as developers.

Before: I start with knowing something is possible, research it, study code, integrate it, then work on the thing I actually meant to do.

Now: I still start with knowing what's possible, but I hand off the research and integration to my coding assistant.

Just like LLMs have a limited context window, I have limited working memory. If I have to trash my brain to context switch in the middle of a task, I lose a lot of time. But now I can send my assistant off on the tangents to help me stay focused on what I'm doing.

## The Simple Solution That Actually Works

Here's what I do: I keep a dot folder at the root of my workspaces. I fill this up with symlinks to libraries I've checked out from GitHub—CDK, Projen, UI frameworks, adjacent projects, especially more niche stuff.

I probably don't need a copy of ReactJS. The LLM studied that well enough in pretraining to have it memorized. But that new feature in [AWS CDK](https://aws.amazon.com/cdk/) that was released last week? The AI doesn't know it exists yet.

## Why Not MCP Servers?

What about [MCP servers](https://modelcontextprotocol.io/docs/getting-started/intro)? MCP was supposed to make accessing data sources easier, but direct file access actually makes it simpler. I haven't had much success with MCP in my development workflow. The output isn't as flexible as the file reading tools in recent coding assistants—they can read and write partial files, which protects the context window. Lots of MCP servers for specialized tasks eat up context window even when I'm not using them.

Anthropic reveals this MCP weakness in a recent post on [code execution with MCP](https://www.anthropic.com/engineering/code-execution-with-mcp).

I find that an LLM can be pretty handy with basic shell tools to explore the development workspace and extract information. More so than with any MCP server I've used yet.

## Try This Tomorrow

Next time you're facing challenges getting your assistant to build something with a new or obscure API, just snag the source code for that library and watch it figure things out quickly for you.
