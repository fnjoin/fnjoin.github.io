# AI Coding Content Style Guide

## Voice & Tone

### Core Principles

-   **Enthusiastic without being annoying**: Share discoveries, don't preach truths
-   **Self-deprecating**: Show your mistakes and learning process
-   **Conversational**: Write like you're talking to a colleague over coffee, not presenting at a conference
-   **Humble expertise**: You know things, but you're still figuring it out too

### What to Avoid

-   ❌ "You should do X" → ✅ "I started doing X and here's what changed"
-   ❌ "This is the right way" → ✅ "This worked for me, curious if others have tried it"
-   ❌ "If you're not doing X, you're doing it wrong" → ✅ "I wasn't doing X and it was costing me hours"
-   ❌ Lecturer tone → ✅ Discovery-sharing tone

### Humor Guidelines

-   **Use self-deprecation**: Show yourself making mistakes, having frustrations
-   **Embrace absurdist details**: "flowerbed on the first floor" not just "out the window"
-   **Exaggerate frustrations for effect**: "20 minutes arguing with a chatbot" paints a funnier picture than "I had issues"
-   **Create relatable scenarios**: The "Dave on vacation" type of specificity everyone recognizes
-   **End with knowing winks**: Acknowledge we're all in the same boat
-   **Avoid**: Puns, dad jokes, forced cleverness, anything that feels like you're trying too hard

## Structure: AIDA Framework

Every substantial post should follow Attention → Interest → Desire → Action

### Attention (Opening)

**Goal**: Hook in 1-3 sentences with relatable pain or surprising statement

**Patterns that work**:

-   Specific, embarrassing moment: "I spent 20 minutes arguing with a chatbot about TypeScript"
-   Surprising reversal: "The thing that improved my AI output isn't what you'd expect"
-   Relatable frustration: "You know that moment when..."

**Length**: 1-3 short sentences or a single short paragraph

**Test**: Would this make someone stop scrolling?

### Interest (The Insight)

**Goal**: Explain _why_ the problem exists or reveal the underlying principle

**Patterns that work**:

-   "Then I realized..."
-   "What I discovered was..."
-   "The core insight is..."
-   "What changed everything was..."
-   "The missing piece was..."

**Avoid overused phrases**:

-   "Here's the thing nobody tells you..." (overused, sounds clickbaity)
-   "Here's the kicker..." (cliche)
-   "You won't believe..." (too sensational)

**What to include**:

-   The mental model shift
-   Why the obvious approach doesn't work
-   What you misunderstood before

**Length**: 2-4 paragraphs

**Test**: Does this make the reader go "Ohhh, that's why"?

### Desire (The Transformation)

**Goal**: Paint the before/after picture with specific, concrete details

**Patterns that work**:

-   Explicit "Before/After" sections
-   Specific examples of what changed
-   Concrete metrics or observable improvements

**What to include**:

-   Actual dialogue or prompts (verbatim when possible)
-   Specific time savings or quality improvements
-   The emotional shift ("I spend time on features, not...")

**Length**: 3-6 paragraphs with clear before/after contrast

**Test**: Does this make the reader want what you have?

### Action (The Next Step)

**Goal**: Tell them exactly what to do next, remove all friction

**Patterns that work**:

-   "Try this tomorrow:"
-   "Your specific first step:"
-   "Next time you [common scenario], do [specific action]"

**What to include**:

-   One specific, achievable action
-   When to do it ("tomorrow morning", "next time you start a project")
-   Optional: link to detailed guide
-   Engagement question to build community

**Length**: 2-4 paragraphs, with the action clearly stated upfront

**Test**: Could someone do this tomorrow without asking clarifying questions?

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

-   [ ] Does the opening hook in 3 sentences or less?
-   [ ] Is there a clear insight/mental model shift?
-   [ ] Do I show my mistakes/learning process?
-   [ ] Is there specific before/after evidence?
-   [ ] Does the CTA tell them exactly what to do next?
-   [ ] Would Steve Yegge find this funny?
-   [ ] Am I sharing a discovery, not preaching?
-   [ ] Did I remove any "you should" language?
-   [ ] Are there enough specific details (numbers, tools, scenarios)?
-   [ ] Does it end with an engagement question?
-   [ ] Is the tone enthusiastic but humble?
-   [ ] Would I want to read this if someone else wrote it?

## Quick Reference: Voice Patterns

**Instead of this** → **Write this**

-   "You need to" → "I started doing"
-   "The best practice is" → "What worked for me was"
-   "Everyone should" → "I was missing"
-   "This is wrong" → "I was doing this and here's what happened"
-   "Let me teach you" → "I discovered"
-   "The solution is" → "What changed for me was"

Remember: You're a fellow developer sharing what you learned, not a guru dispensing wisdom from the mountain.
