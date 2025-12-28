---
title: Three Lenses That Keep AI Code Reviews From Killing You
author: Archie Cowan
subtitle: The moment you stop reading AI's diffs is the moment it breaks your architecture
date: 2025-12-23
coverImage:
    imageSrc: /img/three-lenses-that-keep-ai-code-reviews-from-killing-you/head-img.png
    caption: |
        If Liam Neeson's Bryan Mills character was your code reviewer
        (Image credit: Generated using AI in the style of [xkcd](https://www.xkcd.com)). 
        Not a recommended review technique, lol.
tags: ["ai-coding", "code-review", "architecture"]
---

Claude can easily generate thousands of lines of code and hundreds of requirements for a specfication. Oh the calamity if you miss something.

Reading that much every few minutes turns me into a pumpkin. Worse, I might be fighting to stay awake. I need a new mission to maintain my engagement. Feels like a diabolical choice from a super villain. Read and read until your boredom overtakes you or approve the spec and risk flying off the rails during implementation.

:::margin-note
I was a terrible sleeper as a teenager and into my late 20s. It was always a challenge to sleep but not in biology 101 lectures. I couldn't stay awake to save my life in class. I was that guy that would hit his head on a desk because I fell asleep.

As a bad sleeper late in my 20s, two brain cells finally bumped into each other. Find a biology lecture podcast or youtube video and play that when I wanted to sleep, AT NIGHT.

Works. Every. Time.
:::

As I wrote yesterday about [LLMs and planning mode](/post/2025-12-22-invest-time-in-planning-mode/):

> ... every assumption [an LLM] makes compounds. One wrong turn early on and suddenly you're debugging a feature that solves the wrong problem entirely

How do you stay engaged during the hard parts?

Reflecting on this today, I realized that when I'm reviewing well and maintaining flow/attentiveness, I'm testing what I'm reading against a set of princples in a few categories.

1.  Engineering culture alignment
1.  Cross cutting concerns
1.  Idioms

This helps me stay alert and away from YOLOing into a big change without understanding what I'm reading.

## Mental scaffolding that accelerates my reviews

I've have three lenses that help me review quickly. Do I send it back? Give feedback? Ask questions?

### Engineering culture alignment

Here's what I learned from years of reviewing human-generated proposals: the most dangerous code isn't broken code—it's code that works perfectly but fights against how your team actually operates.

AI has the same problem, but amplified. It sees your codebase patterns but not your deployment culture. It understands your API structure but not your operational velocity. It can generate beautiful solutions that would slowly strangle your team's ability to move fast.

:::inline-callout
The AI doesn't know your engineering culture. It just sees code patterns.
:::

When I review AI-generated code, I'm not just checking if it works—I'm checking if it fits how we work. These three examples show what that looks like in practice:

#### Example 1: The admin interface trap

An extremely smart, albeit new to how we worked, engineer on one of my teams once proposed building an administrative interface for configuration we could update in real time.

I didn't want to do it that way.

We had continuous deployment and instant config updates. We could push changes whenever we wanted. But he was still thinking with the assumption that production couldn't be updated frequently.

One question changed his mind: "Why would I invest effort building an admin interface for something solely owned by our team that we can update whenever we want?"

**The AI parallel**: AI will suggest the same admin interface pattern because it's a common solution. But it doesn't know you deploy 50 times a week. You have to catch this mismatch during review, not after implementation.

#### Example 2: The vendor velocity mismatch

A team was evaluating a vendor for a system they'd couple with to support what they did for other tech teams. The evaluation was taking months. When they finally presented what they knew about the product to the other architects, we could see a crystal clear problem that broke the deal.

The vendor made software releases on a 6-month release cycle. We deployed 50-200 times a week.

"Why would we couple our highly agile, continuously released system with a dependency that updates twice a year? What conflicts will that create?" I asked.

One of my more successful "make it their idea" moments with Socratic methods. The team immediately saw the mismatch. We'd had bad experiences with vendors that didn't present as continually updated platforms. This wasn't going to work. Disappointing but everyone dodged a bullet.

**The AI parallel**: AI will happily integrate with any library or service that solves the immediate problem. It won't warn you that the dependency updates quarterly while you ship daily. That's your job during diff review.

#### Example 3: When alignment accelerates everything

Not all these examples are about rejecting things. Sometimes the cultural alignment question leads to an enthusiastic yes.

AWS is the obvious example. Do I want to align with a vendor that supports my culture of continuous change and rapid response? Hell yes. Do I want help from a vendor that enables me to react to changing business pressures rapidly? Absolutely.

**The AI parallel**: When AI suggests solutions that match your operational culture—serverless functions for a team that deploys constantly, event-driven architectures for a team that values loose coupling—you can move fast with confidence.

The questions I ask during every review: Will this affect our deployment velocity? Will this change how we handle incidents? Does this solution match our operational tempo?

### Cross Cutting Concerns

As I was writing this out I was thinking about all these things that would be important during a code review. I'm keeping it because I like this list. Maybe I'll update it over time. But, since this is about keeping mental scaffolding compact, the last one is probably the only one I need.

-   Security: sql injection, path traversal, input/ouput validation, identity and auth context, scanner outputs
-   Availability
-   Observability
-   Release process: forward and backward compatibility, whether we can roll back
-   Resource handling: os resource cleanup (files, sockets), databases resources (connections, prepared statements, locks)
-   Lock/mutex mechanisms
-   Error handling
-   Logging: sensitive information, schema alignment
-   Test quality: latency, dependencies, alignment with existing harnesses and processes
-   Failure modes understood

The last and probably most compact way of expressing this whole list:

:::inline-callout
Would I carry a pager to support this code in production?
:::

As someone who spent 20 years on call for production systems, that's an easy way to summarize everything. If you haven't been on call, the question breaks out into, would I risk my sleep and time with family and friends to keep this piece of code running? Bad code has a way of ruining an oncall's life.

:::margin-note
I used to be 1 of 3 people on call for a busy website. We got paged constantly day and night. Later I helped led the change to put the other 90 people in technology on call for code they wrote. This wasn't vengence, it was systems thinking. Everyone planned better and made better choices. Pagers rarely went off with that feedback loop tightly coupled and planning improved.
:::

Good review of what your LLM plans for you will help you stay in control.

### Language and platform idioms

Our final alignment seeking test is about language and platform idioms. I don't claim this is what these languages are all about but this is what stood out to me.

-   Perl: solve any problem with string manipulation
-   Ruby: meta programming
-   Python: list comprehensions, simplicity
-   Scala: types and types and types, traits
-   Clojure: immuttable data structures
-   Shell scripts, sed, awk: line based records, pipes, loose coupling, do one thing well
-   Java/Spring: inversion of control, composability, data structures
-   Unity/C#: massive composability with registry systems

:::margin-note
My colleagues used to get frustrated when I'd write Perl one-liners that solved complex problems but looked like line noise. The AI has the same problem—it generates code that works but doesn't always match the idiomatic patterns your team expects.
:::

The test is are we aligning idioms well? While I think every Java programmer should have a little Perl experience, you wouldn't want to write Perl the same way you'd write Java or vice-versa.

Know and specify the design idioms you want to see at planning time. Make sure you see what you expect at review time.

## Try this out on your next review

Next time an AI assistant generates code, requirements, or a design for you, don't just check if it compiles or looks reasonable. Test it against these three lenses:

**Start with one lens tomorrow**: Pick the lens that resonates most with your current pain points. If you're constantly fighting architectural drift, focus on culture alignment. If you're getting paged for AI-generated code, emphasize cross-cutting concerns. If the code works but feels foreign, concentrate on idioms.

**Ask the specific questions**:

-   Culture alignment: "Does this fit how we actually work and deploy?"
-   Cross-cutting concerns: "Would I carry a pager for this in production?"
-   Idioms: "Does this follow the patterns my team expects?"

**Give feedback, don't just reject**: When something doesn't pass your lens test, tell the AI why. "This couples us to a slow-moving dependency" or "This doesn't handle our error logging pattern." The AI learns your preferences and gets better at generating code that fits your culture.

**Build the habit gradually**: Don't try to apply all three lenses perfectly from day one. Start with quick gut checks, then develop the muscle memory. The goal is faster reviews, not perfect reviews.

The moment you stop reading diffs is the moment your system starts breaking. But with systematic lenses, you can review faster while maintaining higher standards.

Remember: **You're never a solo dev anymore with AI. You're leading a team toward a goal.** These lenses help you stay the architect while letting AI handle the implementation details.

What's your biggest challenge when reviewing AI-generated output? I'd love to hear how you're handling the volume and staying engaged.
