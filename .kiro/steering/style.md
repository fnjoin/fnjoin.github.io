# AI Coding Content Style Guide

## Voice & Tone

### Core Principles

-   **Authentic discovery sharing**: Write about what you actually learned, not what you think you should teach
-   **Conversational and self-aware**: Like talking to a colleague who gets the struggle
-   **Humble expertise**: You know things, but you're still figuring it out too
-   **Relatable frustration**: Share the real pain points developers face

### Natural Voice Patterns

Your authentic voice naturally avoids preachy language. Trust these instincts:

-   "I discovered something that changed..." (natural discovery)
-   "Yeah. That was me. Daily." (honest acknowledgment)
-   "I know, I know. You probably think..." (conversational awareness)
-   "Here's what I realized..." (personal insight)

### Humor Style

Your humor works because it's grounded in shared developer experiences:

-   **Self-aware observations**: "like some kind of demented golden retriever that only knows one trick"
-   **Relatable developer pain**: "I'd spend an entire afternoon fixing indentation while questioning my life choices"
-   **Conversational asides**: Use parenthetical thoughts naturally, not as a forced technique
-   **Shared frustrations**: Everyone knows the "arguing with a chatbot" experience

**What works**: Humor that emerges from real situations
**What doesn't**: Forced absurdist details or trying to be funny for its own sake

## Structure: AIDA Framework (Subtle by Design)

Use AIDA as your structural backbone during writing, then polish until the framework becomes invisible to readers. The goal is posts that feel conversational while hitting all the persuasive beats.

### Attention (Opening Hook)

**Purpose**: Stop the scroll with a relatable moment or surprising realization

**Your effective patterns**:

-   "I stopped fighting my AI coding assistant when I realized..."
-   "There's a skill that I lean on more than prompt engineering..."
-   "I discovered something that changed how I document solutions..."

**Writing process**: Start with the most relatable pain point or "aha" moment
**Polish phase**: Make it feel like natural conversation, not a hook

### Interest (The Insight)

**Purpose**: Explain why the problem exists and reveal your mental model shift

**Your natural transitions**:

-   "Then I realized something that changed everything..."
-   "Here's what I realized after months of..."
-   "That's when I started experimenting with something different..."

**Writing process**: Focus on the "why" - what causes the problem, what you misunderstood
**Polish phase**: Weave insights into the narrative flow without announcing them

### Desire (The Transformation)

**Purpose**: Make readers want what you have through specific before/after contrast

**Your effective approach**:

-   Use actual dialogue or scenarios ("Before: 'Can you make this a TypeScript lambda?'")
-   Include specific tools, numbers, timeframes
-   Show the emotional shift ("I spend time on features, not re-explaining TypeScript")

**Writing process**: Paint vivid before/after pictures with concrete details
**Polish phase**: Let the contrast speak for itself without labeling it

### Action (Next Steps)

**Purpose**: Give clear, specific actions readers can take immediately

**Your natural patterns**:

-   "Your specific first steps:"
-   "Try this tomorrow:"
-   "Next time you [scenario], do [action]"

**Writing process**: Define one clear, achievable next step
**Polish phase**: Make it feel like friendly advice, not a call-to-action
**Always end with**: An engagement question that invites community discussion

## Framework Integration Guidelines

**During writing**: Use AIDA beats to structure your thinking and ensure you hit all persuasive elements

**During editing**: Polish transitions until the framework disappears into natural conversation

**Final check**: Reader should feel like they're learning from a colleague's discovery, not being sold to

**Use margin notes**: For genuine asides that don't interrupt the AIDA flow

**Natural transitions**: Let AIDA beats flow into each other organically - no section breaks or announcements

**Always end with**: An engagement question that invites community discussion

## Content Flow Guidelines

**Trust your instincts**: Your posts naturally hit these beats without forcing structure

**Use margin notes**: For genuine asides and additional context that doesn't interrupt the main flow

**Conversational acknowledgments**: "I know, I know..." and similar phrases work well for you

**Natural transitions**: Don't force section breaks—let ideas flow into each other

## Paragraph & Sentence Style

### Rhythm Guidelines

-   **Mix short and long**: Follow a long, detailed sentence with a short punchy one
-   **Use fragments intentionally**: "Yeah. That was me. Daily." creates emphasis
-   **Vary paragraph length**: 1-sentence paragraphs for emphasis, 3-5 for explanation
-   **Break for readability**: If a paragraph is more than 6 lines on screen, consider splitting

### Sentence Patterns

**Yegge-style rambling** (use sparingly for humor):

-   Long sentences with multiple clauses that go on tangents
-   Parenthetical asides that add absurdist detail
-   "like some kind of demented golden retriever that only knows one trick"

**Punchy clarity** (use for key points):

-   "Code becomes cattle, not pets."
-   "Empty directory = vague prompt."
-   "The structure exists. The AI works within it."

**Conversational connectors**:

-   "Here's the thing..."
-   "Look, I'm not saying..."
-   "Think of it like..."

## Content Elements

### Metaphors & Comparisons

-   **Ground in the familiar**: "like Infrastructure as Code, but for..."
-   **Use industry references**: IaC, cattle vs pets, DevOps patterns
-   **Make them visual**: "mansion or a yurt" not "big or small"
-   **Don't over-explain**: Trust the reader gets it

### Specific Details

-   Include actual numbers: "200 lines", "20 minutes", "5 hours saved"
-   Name real tools: "Projen", "Shadcn", "Nx"
-   Show actual code or prompts when relevant
-   Use specific scenarios: "Dave on vacation", "server 31"

### Technical Depth

-   **Lead with problem, not solution**: Don't start with "Projen is great"
-   **Explain the why**: Why does this tool/approach matter?
-   **Show, don't just tell**: Include examples, not just descriptions
-   **Link to deep dives**: Keep posts accessible, offer technical details separately

## Formatting

### Visual Hierarchy

-   **Bold for section headers**: Use actual headers sparingly, bold for emphasis
-   **Italics for inner monologue**: _[10 messages later]_
-   **Code formatting**: Use backticks for tool names, code snippets
-   **Lists**: Use when showing multiple items, but prefer prose for single concepts
-   **Line breaks**: Use blank lines generously for breathing room

### Length Guidelines

-   **Social media posts**: 300-600 words (2-3 minute read)
-   **Short articles**: 600-1200 words (4-6 minute read)
-   **Deep dives**: 1200+ words (linked from shorter posts)

### Links & CTAs

-   **Make links optional**: "(if you want the details: [link])" not "Click here to learn"
-   **End with questions**: Invite engagement, don't just broadcast
-   **Assume smart readers**: Don't over-explain or talk down

### Custom Markdown Elements

This site supports custom markdown formatting for enhanced content presentation:

#### Inline Callouts

Use `:::inline-callout` blocks for key insights or quotes that should stand out within the flow of text:

```markdown
:::inline-callout
Use the skills you are good at to help you improve your weaker skills.
:::
```

**When to use**:

-   Important quotes or advice
-   Key principles or insights
-   Memorable one-liners that deserve emphasis
-   Concepts you want readers to remember

#### Margin Notes

Use `:::margin-note` blocks for tangential thoughts, background context, or personal asides:

```markdown
:::margin-note
Aside, I wish that my writing/journaling life started much sooner. The stories I would have remembered, the wisdom that is only packed into my mind as experience, only callable by my single threaded mind in a similar experience, might be available in more circumstances.
:::
```

**When to use**:

-   Personal anecdotes that add color but aren't essential
-   Background context that some readers might want
-   Tangential thoughts that relate but don't interrupt the main flow
-   "Behind the scenes" insights
-   Historical context or backstory

#### Figure-Fence (Preferred for Images)

Use `:::figure-fence` blocks for images within article content that need proper captioning and numbering:

```markdown
:::figure-fence{id="unique:identifier" title="Figure Title" caption="Descriptive caption explaining what the image shows and why it matters."}
![Alt text for accessibility](/img/post-slug/image-name.png)
:::
```

**Figure-Fence Guidelines**:

-   **Unique IDs**: Use format `category:description` (e.g., `calendar:monthly-view`, `arch:dependency-graph`)
-   **Descriptive titles**: Clear, concise titles that explain what the figure shows
-   **Detailed captions**: Explain the purpose, context, or insights the image provides
-   **Alt text**: Include proper alt text within the image markdown for accessibility
-   **Sequential naming**: For multiple related images, use consistent naming (image1, image2, image3)

**Referencing figures**:

Use `:ref{id="category:description"}` to reference figures in your text. Example:

```markdown
:::figure-fence{id="arch:pipeline" title="Data Pipeline" caption="Shows data flow through the system"}
![Pipeline diagram](/img/pipeline.png)
:::

As shown in :ref{id="arch:pipeline"}, data flows from left to right.
```

**Frontmatter setup required**:

```yaml
figurens:
    arch: Architecture
    flow: Data Flow
    code: Code Example
    img: Image
```

**When to use figure-fence vs standard images**:

-   **Use figure-fence for**: Diagrams, screenshots, charts, technical illustrations that need proper captioning and numbering
-   **Use standard markdown for**: Simple decorative images, icons, or images that don't need formal figure treatment

**Style guidelines for custom elements**:

-   Keep inline callouts short and punchy (1-2 sentences max)
-   Margin notes can be longer and more conversational
-   Use margin notes for the kind of thing you'd say in parentheses, but expanded
-   Don't overuse - these should enhance, not distract from the main narrative
-   Always prefer figure-fence over standard markdown images for technical content

## Curiosity Gaps

For social media posts specifically, open with a curiosity gap that makes people want to read more.

### Patterns that work:

-   "There's one [specific thing] that [dramatic result]"
-   "Most people do X, but the fastest teams do Y"
-   "You're probably wasting [specific %] of [resource]"
-   "[Number] of [specific items] that [change everything]"

### What makes a good curiosity gap:

-   ✅ Specific enough to be believable (not "one weird trick")
-   ✅ Relatable problem that people recognize
-   ✅ Promise of simple solution (not "comprehensive guide")
-   ✅ Withhold just enough to create intrigue

### What to avoid:

-   ❌ Clickbait that doesn't deliver
-   ❌ "You won't believe..." style overselling
-   ❌ Giving away the entire solution in the hook

## Examples

### Good Opening (Attention + Curiosity Gap)

"I spent 20 minutes arguing with a chatbot about TypeScript vs JavaScript. The chatbot won."

**Why it works**: Specific, relatable, surprising, makes you want to know what happened

### Bad Opening

"In this post, I'm going to talk about how to improve your AI coding workflow using infrastructure automation tools."

**Why it fails**: Generic, no hook, tells instead of shows, announces instead of engaging

### Good Before/After (Desire)

"Before: 'Can you make this a TypeScript lambda? No wait, I need it to integrate with the CDK app. Actually, let's use this testing framework instead.'

After: The structure exists. The AI works within it. I spend time on features, not re-explaining what TypeScript is."

**Why it works**: Specific dialogue shows the pain, contrast is clear, transformation is concrete

### Bad Before/After

"Before I used this tool, things were harder. After I started using it, things got better."

**Why it fails**: No specifics, no emotional resonance, could apply to anything

### Good CTA (Action)

"Try this tomorrow: Next time you start a project, write the scaffolding prompt before the feature prompt. Watch how much faster you move."

**Why it works**: Specific timing, clear action, observable result

### Bad CTA

"If you want to learn more about this approach, check out my comprehensive guide to repository automation strategies."

**Why it fails**: No urgency, vague action, sounds like homework

## Checklist Before Publishing

### AIDA Structure Check

-   [ ] **Attention**: Does the opening hook with a relatable moment or realization?
-   [ ] **Interest**: Is there a clear insight or mental model shift explained?
-   [ ] **Desire**: Do I show specific before/after transformation with concrete details?
-   [ ] **Action**: Are there clear, actionable next steps readers can take?

### Voice & Polish Check

-   [ ] Does it feel like natural conversation, not a sales pitch?
-   [ ] Am I sharing genuine discovery from experience, not theoretical knowledge?
-   [ ] Is the AIDA framework invisible to readers (no obvious section breaks)?
-   [ ] Are there enough specific details (numbers, tools, scenarios)?
-   [ ] Does it end with an engagement question?
-   [ ] Is the tone conversational and authentic?
-   [ ] Would I want to read this if someone else wrote it?
-   [ ] Does it feel like me talking to a colleague who gets the struggle?

## Quick Reference: Natural Voice Patterns

**Your authentic patterns** (keep using these):

-   "I discovered something that changed..." → Natural discovery sharing
-   "Yeah. That was me. Daily." → Honest acknowledgment
-   "I know, I know. You probably think..." → Conversational awareness
-   "Here's what I realized..." → Personal insight
-   "That's when I started experimenting..." → Natural transition

**Two-phase approach**: Use AIDA to structure during writing, then polish until it feels like natural conversation.

Remember: You're sharing what you learned with someone who gets the struggle, using a proven persuasive structure that stays invisible.
