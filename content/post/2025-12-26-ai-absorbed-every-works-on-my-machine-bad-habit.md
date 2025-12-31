---
title: "AI Coding Tool Tips: AI Absorbed Every 'Works on My Machine' Bad Habit"
author: Archie Cowan
subtitle: AI will claim it's finished when it's 80% done—end-to-end tests tell the truth
excerpt: Discover why AI inherits our worst "dev complete" habits and declares victory at 80% done. Learn how to use lightweight integration tests to give AI a real definition of done and catch missing pieces before you waste time debugging.
date: 2025-12-26
coverImage:
    imageSrc: /img/2025-12-26-ai-absorbed-every-works-on-my-machine-bad-habit/head-img.png
    caption: |
        When AI says "done" but the integration is missing—end-to-end tests catch what unit tests miss.
tags: ["ai-coding", "testing", "e2e"]
---

I get so triggered by working with people and robots working from a different definition of done. It's probably my fault too for not setting correct expectations up front.

-   It works on my machine. Ok, I'll put your machine in the datacenter then.
-   Dev complete. Oof, just writing these words increased my heart rate.
-   Just needs integration. Like, 80% of the work could be integration.
-   Feature complete. So, we haven't thought about deployment, resilience.
-   Happy path works. This makes my grumpy.
-   No one has complained. Absence of evidence is not evidence of absence.

There is so much of this out there this has actually been train in to the way LLMs behave sometimes. Mostly when I'm working in the context of larger projects that have many tasks planned out.

Lately, I've been using [Kiro's spec mode](https://kiro.dev/docs/specs/) for some work and I'm actually really enjoying it. I can work through my requirements, design, and tasks for a chunk of work pretty rapidly. But, I've noticed something about how I've planned recent work has led to some of the above behaviors from the LLM!

I realized LLMs have learned our worst developer habits. They've been trained on codebases where "dev complete" means "compiles and has tests" not "actually works end-to-end." When I use a task oriented interaction with my assistant like spec mode to break down work, the AI inherits this same fake-done mentality.

The LLM declares it is done with a task but when I go to test it I find that it doesn't actually work end to end. It's written tons of unit and property tests but the integration of the parts is incomplete. A single failing test on an API endpoint would have detected a missing integration point in the plan, saving me a bunch of frustration.

This is another place to apply [a failing test is worth a thousand prompts](/post/2025-12-25-a-failing-test-is-worth-a-thousand-prompts/).

At planning time, think of well targeted integration tests. They don't need to verify a bunch of functionality, that belongs in more targeted tests. They just need to prove that the right APIs are called and working together. They should be implemented early in your plan and the tasks should clearly label whether the test is expected to pass at that point.

This way, the LLM has a clear definition of done–when that integration test passes. It can use this to find what's missing automatically instead of eagerly marking a task complete so that it can get a ticket off its plate as fast as possible.

When you're next opportunity to try a lightweight failing integration test? Let me know if this improves your coding assistant outcomes.
