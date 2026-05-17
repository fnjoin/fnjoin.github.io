---
inclusion: manual
---

# Complete Writing Process

This steering document captures the full blog writing workflow from initial bullet points to final publication. Use this when the user asks to "write a blog post" or "develop this into an article."

## Phase 1: Bullet Point Foundation

**Start with raw ideas in bullet form** - like the current state of "everything-is-a-translation-task.md"

**What this looks like:**

-   Scattered thoughts and observations
-   Key insights without structure
-   Examples and scenarios
-   Personal experiences and discoveries

**Purpose:** Capture all relevant ideas without worrying about organization or flow

## Phase 2: Curiosity Gap Identification

**Find the hook that will grab attention**

**Look for:**

-   The most relatable pain point
-   Surprising realizations or reversals
-   "Aha" moments that changed your approach
-   Specific, embarrassing moments that others will recognize

**Your effective patterns:**

-   "I stopped fighting my AI coding assistant when I realized..."
-   "There's a skill that I lean on more than prompt engineering..."
-   "I discovered something that changed how I document solutions..."

**Test:** Would this make someone stop scrolling and think "I've been there"?

## Phase 2b: Expansion Methods Selection

**Choose specific labels from expansion-methods.md that will strengthen your article**

**Available expansion methods:**

-   `tips` - Actionable advice readers can implement immediately
-   `stats` - Credible evidence to support your points
-   `steps` - Sequential actions for complex processes
-   `lessons` - Insights from your successes and failures
-   `benefits` - Why readers should care about your advice
-   `reasons` - Logical justification for your approach
-   `mistakes` - Common pitfalls to help readers avoid
-   `examples` - Concrete instances that make concepts relatable
-   `questions` - Engagement prompts and self-reflection
-   `personal_stories` - Authentic experiences that build connection

**Selection process:**

1. Review your bullet points and curiosity gap
2. Choose 3-5 specific labels that best support your story
3. Add chosen labels to `expansion_methods_chosen: []` in frontmatter
4. Mark `phase2b_expansion_methods: true` when complete

**Example for translation article:**

```yaml
expansion_methods_chosen: ["personal_stories", "examples", "tips", "mistakes"]
```

This would focus on: your AI frustration story, specific prompt examples, the translation framework, and the generator mindset pitfall.

## Phase 3: AIDA Structure Alignment

**Map bullet points to AIDA framework**

### Attention (Opening Hook)

-   Use the curiosity gap identified in Phase 2
-   Start with the most relatable pain point or "aha" moment
-   Keep it conversational, not salesy

### Interest (The Insight)

-   Explain why the problem exists
-   Share your mental model shift
-   Use natural transitions: "Then I realized..." "Here's what I discovered..."

### Desire (The Transformation)

-   Paint vivid before/after pictures
-   Use actual dialogue or scenarios from your bullet points
-   Include specific tools, numbers, timeframes
-   Show the emotional shift

### Action (Next Steps)

-   Define one clear, achievable next step
-   Use your natural patterns: "Your specific first steps:" "Try this tomorrow:"
-   Always end with an engagement question

## Phase 4: Section Header Refinement

**Remove or transform AIDA headings into natural article flow**

**Instead of:** "Attention," "Interest," "Desire," "Action"
**Use:** Natural transitions, conversational headers, or no headers at all

**Your effective approaches:**

-   Let sections flow into each other organically
-   Use bold text for emphasis rather than formal headers
-   Create natural breaks with margin notes or inline callouts

## Phase 5: Article Editing Checklist

**Apply the systematic editing process from article-editing-checklist.md:**

1. **Content Structure Review**

    - Check AIDA framework flow
    - Apply but/therefore rule (sections build on each other)
    - Verify headings match content

2. **Voice & Tone Consistency**

    - Remove sensational phrasing
    - Maintain conversational, discovery-sharing tone
    - Check for humble expertise

3. **Grammar & Mechanics**

    - Fix spelling errors and typos
    - Check subject-verb agreement
    - Correct article usage (a/an)

4. **Tense Consistency**

    - Past tense for personal experiences
    - Present tense for current practices
    - Logical tense transitions

5. **Active Voice Conversion**
    - Convert passive constructions to active
    - Make the writing more direct and engaging

## Phase 6: Rhetorical Enhancement

**Add memorable language using rhetorical devices**

### Alliteration

-   Replace generic words with alliterative alternatives
-   "stuff" → "catastrophes" (catching catastrophes)
-   "add up" → "stack up surprisingly"
-   Create memorable phrases that stick

### Antithesis

-   Create contrasting pairs for emphasis
-   "stopped hurting me and started helping me"
-   Before/after contrasts
-   Problem/solution pairs

### Merism

-   Use "parts for the whole" to create comprehensive feeling
-   "from tweets to books" (representing all content types)
-   "development to deployment" (representing full process)

### Other Memorable Techniques

-   **Specific details:** "200 lines," "20 minutes," "server 31"
-   **Concrete scenarios:** "Dave on vacation," specific tool names
-   **Rhythmic patterns:** Mix short and long sentences
-   **Intentional fragments:** "Yeah. That was me. Daily."

## Process Integration Guidelines

**Don't skip phases:** Each builds on the previous one
**Iterate as needed:** You might cycle back to earlier phases
**Trust the process:** Structure enables creativity, doesn't constrain it
**Polish gradually:** Don't try to perfect everything in one pass

## Recognition Patterns

When the user says any of these, guide them through the appropriate phase:

**Phase 1:** "I have some ideas," "rough thoughts," "bullet points"
**Phase 2:** "find the hook," "what's the curiosity gap," "how do I start this"
**Phase 2b:** "what should I include," "how do I expand this," "what content methods"
**Phase 3:** "structure this," "organize these ideas," "make this into an article"
**Phase 4-5:** "polish this," "edit the draft," "make it flow better"
**Phase 6:** "final polish," "make it memorable," "enhance the writing"

## Output Approach

**During writing phases (1-4):** Focus on structure and content
**During editing phases (5-6):** Focus on polish and memorability
**Always maintain:** Your authentic, conversational voice throughout

The goal is posts that feel like natural conversation while leveraging proven persuasive structure and memorable language techniques.
