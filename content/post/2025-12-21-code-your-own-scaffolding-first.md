---
title: Code Your Own Scaffolding First
author: Archie Cowan
subtitle: Write 200 lines yourself before asking AI for 2,000—your code becomes the perfect prompt
date: 2025-12-21
coverImage:
    imageSrc: /img/code-your-own-scaffolding/head-img.png
    caption: The scaffolding metaphor works on so many levels.
tags: ["ai-coding", "scaffolding", "prompting"]
---

I was fighting my AI coding assistant until I changed how I was getting started.

You know that moment when you realize you've been arguing with a chatbot for 20 minutes about whether to use TypeScript or JavaScript, and the chatbot doesn't even care, it just keeps cheerfully suggesting JavaScript again like some kind of demented golden retriever that only knows one trick?

Yeah. That was me. Daily. Multiple times daily, if we're being honest.

Every prompt felt like starting from scratch. "No, not that framework. No, not that structure. No, I said use TypeScript not JavaScript." And the AI would be like "Great! I've created a JavaScript project for you!" and I'd be like "No, that's literally the opposite of what I—" and it would interrupt with "You’re absolutely right! I've added some helpful JavaScript comments!"

I was ready to throw my laptop out the window. Which would have been a problem because I work on the first floor and the window opens onto a flowerbed, so it wouldn't even have been satisfying, just expensive and embarrassing.

Then I realized something that changed everything: my AI was reading my entire workspace as the prompt, not just my increasingly desperate and caps-lock-heavy chat messages.

Empty directory = vague prompt. No wonder it kept guessing wrong. It's like asking someone to draw your house when you haven't told them whether you live in a mansion or a yurt.

That's when I started experimenting with something different.

I started scaffolding projects before the AI writes a single line of application code. Not manually—that would take forever and I'd 100% forget to set up the linter until I had 3,000 lines of code that needed reformatting, and then I'd spend an entire afternoon fixing indentation while questioning my life choices.

I discovered [Projen](https://projen.io/) and it changed how I work with AI: TypeScript packages, Python lambdas, CDK infrastructure, all the boring setup that makes an AI assistant go "oh, I get what we're building" instead of "let me invent a completely new project structure you definitely didn't ask for, but trust me, it's way better than what you wanted."

For me, it's like Infrastructure as Code, but for your codebase structure. Remember when IaC transformed deployments from "carefully hand-configure 47 servers while praying you didn't miss step 23 and also that Dave didn't go on vacation because he's the only one who knows the incantation for server 31" to "run this script 100 times a day"? Same energy, different problem.

Here's what changed:

My first prompt often looks like this. I know what modules I want in my repository and maybe what I want to call them.

> Use projen to set up a shadcn webapp, a Python lambda, a TypeScript lambda, and a CDK app to deploy them.

:::margin-note
To be fair, for this to work, my steering/rule files make it clear how I want Projen to be used to complete this task.
:::

30 seconds later: complete project structure with testing, linting, build tools, dependency management—all configured and ready. When I ask the AI to build features now, it already knows we're using TypeScript, it sees the component structure, it understands the deployment model. It's like the difference between explaining directions to someone who can see the map versus someone who's blindfolded and spinning in circles.

The difference is dramatic.

**Before:**

"Can you make this a TypeScript lambda? No wait, I need it to integrate with the CDK app. Actually, let's use this testing framework instead. Why did you use JavaScript? We literally just talked about this. Are you even listening? Do chatbots listen? Is that the right verb? I don't even know anymore."

[10 messages later]

"You know what, let's start over."

[AI immediately suggests JavaScript again]

**After:**

The structure exists. The AI works within it. I spend time on features, not re-explaining what TypeScript is for the fifth time today to a language model that has somehow developed selective amnesia about our entire conversation history.

I'm starting to feel about code the way Cloud brought cattle over pets for servers. Change the projen config, regenerate the structure, move on. No mourning period for my carefully hand-crafted repository structure that I spent three hours debugging. Just generate it. It's liberating, like throwing out that box of cables you've been saving for 10 years "just in case."

:::margin-note
Actually, I'm hanging on to my box of cables. I might need one!
:::

Projen isn't perfect—nothing is perfect, the universe is chaos and entropy always wins—but it's made my AI assistants way less frustrating, and that's worth something in this timeline where we're all trying to figure out how to work with robots that are simultaneously incredibly smart and incredibly dense.

(I wrote a [deep dive on Projen constructs](/post/2024-03-04-projen-pdk-nx/) if you want the technical details and enjoy that sort of thing)

What's your project scaffolding strategy? Do you start from templates, empty directories, or are you still in the "arguing with AI about basic setup choices" phase? (No judgment. I was there last month. Hell, I was there yesterday for a different project because I forgot my own advice.)
