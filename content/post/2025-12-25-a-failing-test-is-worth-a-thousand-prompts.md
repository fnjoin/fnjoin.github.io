---
title: "AI Coding Tool Tips: A failing test is worth a thousand prompts"
author: Archie Cowan
subtitle: Stop writing paragraphs explaining what you want—write one failing test instead
date: 2025-12-25
coverImage:
    imageSrc: /img/2025-12-25-failing-test/head-img.png
    caption: |
        LLMs understand you better when you show them what's broken instead of explaining perfect.
        (Image credit, created using AI in the style of [xkcd](https://xkcd.com/))
tags: ["ai-coding", "testing", "tdd"]
---

If have a good automated test engineering practice you're sitting on an AI coding superpower.

One of my favorite ways to prompt my AI assistant is _run the test suite and remediate any test failures_. It is efficient with keystrokes, context window usage, and how often I need to reprompt to get good results.

:::margin-note
I easily get repetitive strain injuries (RSI) so anything that gives me more leverage with my keyboard is very helpful.
:::

Here's what that prompt does most of the time (when I know there is a failing test):

-   Assistant runs the test suite
-   Observes the build output
-   A failing test is noted
-   The assistant triages whether it's a problem with the test or the underlying code ([Kiro](https://kiro.dev) is great at this)
-   The underlying code with the defect is identified
-   A change is implemented fixing the defect
-   The test suite is run again
-   Assistant declares victory

Then I smugly smirk and move on to my next task.

How does this work?

When you code with AI, every text surface in your project is a prompt. Directory structure, file names, file contents, and **build task output**. When your assistant sees a failing test, it has confirmation of exactly what's broken and diagnostic output to fix it. The [project structure](/post/2025-12-21-code-your-own-scaffolding-first/) subtly biases the LLM to look for what to update in the right places.

Coding with AI has increased the amount of leverage you can exert from your test suite. Tests used to catch bugs. Now they catch meaning.

When you prompt "make this function handle edge cases better," the AI has to guess what you mean. But when it sees...

```
test('should handle empty arrays', () => { expect(processData([])).toBe([]) })
```

... failing, there's zero ambiguity. Paragraphs prompt guessing. Failing tests prompt precision. Naturally, you can prompt the test case into existance as well!

When you start your next coding session, write a failing test first, either yourself or with your coding assistant. Then prompt your AI with _run the test suite and remediate any test failures_.
