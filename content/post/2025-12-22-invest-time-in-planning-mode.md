---
title: Why Your AI Coding Outputs Suck
author: Archie Cowan
subtitle: And how planning mode fixes everything
date: 2025-12-22
coverImage:
    imageSrc: /img/invest-time-in-planning-mode/head-img.png
    caption: |
        Measure zero times, cut zero times – carpenter who has achieved enlightenment and realized the wood is fine where it is. 
        (Image credit: [xkcd](https://xkcd.com/3149/)).
        _Isn't this entirely true about software too?_
tags: ["ai-coding", "planning", "productivity"]
---

I don't know how many times I've watched Claude build the wrong feature. Even more, it built the right feature the wrong way.

Recently, I tried to get away with a quick change without any planning. I needed a chart and I needed it built with matplotlib. Claude started creating components I didn't need, using patterns I didn't want, and integrating with libraries that I didn't want in my dependencies. By the time I realized we were building a mansion when I needed a yurt, I burned through my context window and a decent hunk of time I'll never get back.

:::margin-note
To be fair, I knew better. I knew Claude would trip on the stupid SVG-based chart component I'd left in my app. I only had myself to thank that I didn't remove the slop from my last attempt at getting this chart correct. Technical debt cycle accelerated.
:::

I eventually got the chart I wanted the way I wanted it. Spending a few minutes in planning mode before writing any code.

## The Hidden Problem

Here's a big obvious secret about AI coding: the LLM doesn't know what you want until you know what you want.

When you YOLO into changes without planning, you're essentially asking the AI to read your mind while you're still making it up. The LLM starts building based on its best guess of your intent, but every assumption it makes compounds. One wrong turn early on and suddenly you're debugging a feature that solves the wrong problem entirely.

The fastest developers I know all do the same thing: they invest time upfront in "planning mode."

This isn't just [chain-of-thought reasoning](https://arxiv.org/abs/2201.11903) (though that's part of it). It's like talking through your ideas with a colleague and riffing off their feedback. The planning conversation refines **your** understanding of what you're trying to build, More importantly, it gives the AI a clear mental model to work from.

Even more importantly, after going through the planning motion I've rubbed enough brain cells together to have a clue about what I want to achieve.

## Three Levels of AI Planning

I've experienced three levels to this, and the difference between them is dramatic.

### Level 1: No Planning (No Espresso)

You jump straight into "build me X" and hope for the best. The LLM starts making changes immediately based on incomplete information. You spend your time course-correcting instead of building. The real time killer is when you realize 2,000 lines in that a single assumption went sideways. Now you're out of context window and starting over from scratch.

I used to do this when I first started out. The relief when it worked was overshadowed by the disappointment when it didn't.

### Level 2: Cline Planning Mode (The Single Shot Espresso)

Cline's [planning mode](https://docs.cline.bot/features/plan-and-act) shuts off all repository changes—the AI can read but not modify anything. Instead of building, it gives you a preview of what it would do. You get to course-correct, add detail, or provide resources before any code gets written.

I started using Cline's planning mode to create markdown plan files that I could reference across multiple conversations. Each new task started with full context instead of me re-explaining the same requirements.

This was actually an effective way for me to work. More often than not, I could get decent results this way. Though, I was driving the tasks. I had to keep a coherent mental thread running as I prompted each task referencing my design document.

While this was a great way to work, I could see a more efficient way to work beyond what I was doing with Cline.

_/Kiro enters the chat_

### Level 3: Kiro Spec Mode (Double Shot Espresso)

This is where planning mode gets serious. [Kiro spec mode](https://kiro.dev/docs/specs/) helps you build requirements, create a design, and then generates specific tasks to execute that design. But, I found a lot of ways to use it ineffectively.

I made a handful of errors with my first experiments on Kiro spec mode.

#### Mistake #1: Trying to Spec Entire Apps

I tried to spec an entire app at once. This produced shallow results. You probably know what this looks like if you've worked with a lot of LLM-produced code. It's like an app that looks functionally correct based on the available widgets. But, when you interact with any of them nothing happens.

Now, I spec one feature at a time, for some value of feature. This enables a lot more depth to be explored in the features and design.

#### Mistake #2: Skipping Property Tests

Second mistake. When Kiro plans tasks, it will make property test tasks optional. It offers this as a way to see results more quickly. Don't take the bait. Trying to create production code without automated tests is a miss for all the same reasons that you want them without LLMs.

:::margin-note
What is property testing?

> Property testing is a system of testing code by checking that certain properties of its output or behaviour are fulfilled for all inputs. These inputs are generated automatically, and, critically, when a failing input is found, the input is automatically reduced to a minimal test case.
>
> Property testing is best used to complement traditional unit testing (i.e., using specific inputs chosen by hand). Traditional tests can test specific known edge cases, simple inputs, and inputs that were known in the past to reveal bugs, whereas property tests will search for more complicated inputs that cause problems.

https://altsysrq.github.io/proptest-book/
:::

Automated unit tests and property tests will lay bare the errors of your abstractions. If testing is difficult it's a sign there's a simpler path and it's not the path you're on. They also happen to be good insurance that your implementation is correct. I've found that maybe 10% of the time Kiro's property tests identify implementation defects that it automatically remediates. Don't miss out on this. You might also find out faster that your design is busted in a way you didn't anticipate – this happens for me all the time.

#### Mistake #3: Starting Without Scaffolding

Third mistake. Not starting with scaffolding your repository. Given an empty canvas, Kiro or any LLM based tool will eventually get you a decent result but it may not be what you really wanted. Instead, [code your scaffolding first](/post/2025-12-21-code-your-own-scaffolding-first/).

#### Mistake #4: Not Reading Carefully (The Big One)

Fourth mistake. Probably the most important lesson learned in this list. Not reading carefully.

The requirements, design, tasks phases each have diminishing leverage over subsequent steps. The list of requirements is the most powerful document. Get something wrong here and you'll fight it for the rest of the implementation. Same with design and the task list. It gets progressively more difficult to update as you pass through the steps. Not impossible. But more difficult. So, read read read. Kiro tries to persuade you to move to the next step but ignore it until you're happy with everything in each doc.

## Try This

Try this on your next coding session. Before you ask your AI to build anything, spend time in discussion with the LLM about what you want to do.

**If you're using Cline:** Enable planning mode and ask "What would you build if I asked for [your feature]?" Let it think through the approach before you commit to changes. Course correct what you don't like.

**If you're using Kiro:** Start a spec. Work through requirements and design before jumping to implementation. Read read read and course correct as early as possible.

**If you're using something else:** Just ask for a plan first. "Before we build this, can you outline your approach and the files you'd need to create or modify?"

Just like the cliche, measure twice, cut once. For AI coding, measure as you plan as much as possible, then build.
