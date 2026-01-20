---
title: "AI Coding Tips: Stop Generating, Start Translating"
author: Archie Cowan
subtitle: How reframing AI coding as translation unlocks better prompts and cleaner results
excerpt: >
    Stop thinking of AI as a code generator. Start thinking of it as a translator. When you shift from "write me code" 
    to "translate this intent into working implementation," everything changes—your prompts get clearer, your results get better.
date: 2026-01-05
coverImage:
    imageSrc: /img/2026-01-05-everything-is-a-translation-task/head-img.png
    caption: |
        Trillions of parameters and it still needs you to do the hard part first. (Image credit: generated with AI in the style of xkcd)
tags: ["ai-coding", "prompting", "mental-models"]
figurens:
    img: Image
    fig: Figure
    code: Code Example
# Writing Process Checklist
process:
    phase1_bullets: true # ✅ Raw bullet points captured
    phase2_curiosity_gap: true # ❌ Hook/curiosity gap identified
    phase2b_expansion_methods: true # ❌ Expansion methods selected from: tips, stats, steps, lessons, benefits, reasons, mistakes, examples, questions, personal_stories
    expansion_methods_chosen: [
            "tips",
            "benefits",
            "examples",
            "personal_stories",
        ] # Selected methods will be listed here
    phase3_aida_structure: true # ❌ Content mapped to AIDA framework
    phase4_header_refinement: true # ❌ AIDA headers removed/refined
    phase5_article_editing: true # ❌ Grammar, voice, structure editing
    phase6_rhetorical_polish: false # ❌ Alliteration, antithesis, memorability
    ready_to_publish: false # ❌ Final publication ready
---

My AI assistant was useless for the hard part of my last project. Then it built the rest in a fraction of the time. The difference wasn't the AI—it was what I was asking it to do.

I was building something pretty niche—probably the most niche project I've ever worked on. The core of it was new to me and not something I could just reference on the Internet. On the core pieces, AI was pretty useless. Not for lack of trying. I used many if not most of the tactics I've shared in my posts on [ai coding](/tags/ai-coding/).

I had to work the good old fashioned way. Work in a notebook, design a library and determine the inputs and outputs of the routines. Iterate them with my customer. I learned a lot about a new thing. It was fun. Perhaps if I wasn't so new to the domain, I could have described what I needed more effectively to an AI assistant.

But then I needed to turn what was just a library into a holistic piece of software, running in the cloud, user interface, the whole kit. This is where my AI assistant helped me create like pouring gasoline on a fire.

At the beginning I lacked a core model of what I was doing and I was honestly learning as I progressed through a new domain. But, once that was created, I had a solid set of data models and procedures. Now I had a reference for the rest to come.

This isn't a coincidence. The Transformer architecture behind these AI assistants was literally built for translation—English to German, German to French. The breakthrough paper was called _[Attention is All You Need](https://arxiv.org/pdf/1706.03762)_. Later, researchers discovered that if you make these models big enough, they can translate between almost anything given just a few examples in your prompt.

:::margin-note
Hehe, the abstract of _[Language Models are Few-Shot Learners](https://arxiv.org/abs/2005.14165)_ has this sentence:

> Finally, we find that GPT-3 can generate samples of news articles which human evaluators have difficulty distinguishing from articles written by humans.

Cry 'Havoc!', and let slip the dogs of war! This was two years before ChatGPT.
:::

Therefore, my core models weren't just documentation—they were the source language. With them defined, I basically had the prompts ready to build the rest of my application.

-   I quickly created the [scaffolding](/post/2025-12-21-code-your-own-scaffolding-first/) for the packages I wanted.
-   My application model defined all the inputs and outputs that would be needed to interact with it throughout the application.
-   My talented designer colleague gave me a colorscheme and layout styleguide.
-   I knew how I wanted to deploy the application in AWS with CDK.

The pieces fell into place rather quickly at this point. These are translation problems. Not German to English, but given some APIs, a styleguide, and my web framework preferences, AI produced exactly what I wanted in a fraction of the time it would have taken me.

## Translation Patterns That Work

Once I started thinking in translations, prompting stopped feeling like negotiation. I wasn't convincing AI to understand me—I was handing it a source and a target.

**Scaffolding + Requirements → Package**

-   [Scaffolding](/post/2025-12-21-code-your-own-scaffolding-first/) provides the target language structure
-   Functional requirements provide the source intent
-   AI translates between them into working packages

**Working Prototype → Production System**

-   Notebook code + scaffolding → API implementation
-   The prototype shows what you want, scaffolding shows how you structure it
-   AI handles the translation between informal and formal code

**Progressive Translation Chains**

1. Domain knowledge + scaffolding → data model
2. Data model + desired storage patterns → CRUD API
3. CRUD API + UI framework choice + style guide → user interface

Each step translates the previous output into the next layer of abstraction.

**Reusable Guides as Translation Templates**

-   Take a [reusable implementation guide](/post/2025-12-29-generate-reusable-implementation-guides/)
-   Layer on your specific change request
-   AI translates the general pattern to your specific needs

**Refactoring as Translation**

-   Well-described inputs/outputs + messy implementation + target structure
-   AI translates from "what it does" to "how it should be structured"
-   Your working code proves the logic, scaffolding defines the target architecture

## The Expert Privilege Problem

A recent post by Antirez on his success with [AI coding Redis internals](https://antirez.com/news/158) highlights something important: domain expertise dramatically improves translation quality. When you deeply understand both the source (what you want) and target (how systems work), AI becomes incredibly effective.

But many developers struggle because they lack either:

-   Clear mental models of what they want to build
-   Deep understanding of their target architecture
-   Experience recognizing when AI translations are wrong

The translation metaphor helps here: you need to be fluent in both languages—what you want and how you build it.

I saw this in the project I was telling you about. I didn't have a clear mental model of what I wanted to build at first. I didn't have deep domain expertise. But once the effort reached cloud and web development stages, I could articulate exactly what I wanted and had the core model to reference.

## Setting Up the Chain Reaction

Here's the thing about translation tasks: they compound. Your data model becomes the prompt for your API. Your API becomes the prompt for your UI. Each layer you nail gives AI more to work with on the next one.

The first translation is the hardest. After that, it's downhill all the way.

Where do you like to start? What's the first artifact you create that makes everything else easier?
