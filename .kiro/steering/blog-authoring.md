---
inclusion: manual
---

# Blog Authoring Guide

This steering document accelerates the creation of new blog posts for the fnjoin.com static blog.

## Content Structure Overview

The blog uses a structured content directory with the following organization:

```
content/
├── authors/          # Author profiles (markdown files)
├── post/            # Blog posts (markdown files)
├── page/            # Static pages
├── drafts/          # Draft posts
├── assets/          # Shared assets
└── img/             # Images organized by post
```

## Post Creation Workflow

### 1. File Naming Convention

Posts follow the pattern: `YYYY-MM-DD-slug.md`

Examples:

-   `2024-03-04-projen-pdk-nx.md`
-   `2024-05-12-the-reasons-i-dont-write.md`
-   `2021-08-27-show-deployments.md`

### 2. Required Frontmatter Structure

Every post must include this frontmatter at the top:

```yaml
---
author: Author Name
title: "Post Title"
subtitle: Optional subtitle for additional context
date: YYYY-MM-DD
coverImage:
    imageSrc: /img/post-slug/cover.webp
    caption: Image description for accessibility
tags: ["tag1", "tag2", "tag3"]
---
```

### 3. Author Management

Authors are defined in `content/authors/[username].md`:

```yaml
---
picture: /assets/author-photo.png
name: Full Name
bio: Brief professional bio
---
```

Current authors:

-   `acowan.md` - Archie Cowan
-   `smalik.md` - Salman Malik

## Content Style Guidelines

### Voice & Tone (from style.md)

-   **Enthusiastic without being annoying**: Share discoveries, don't preach
-   **Self-deprecating**: Show mistakes and learning process
-   **Conversational**: Write like talking to a colleague over coffee
-   **Humble expertise**: You know things, but you're still figuring it out

### Structure: AIDA Framework

1. **Attention** (1-3 sentences): Hook with relatable pain or surprising statement
2. **Interest** (2-4 paragraphs): Explain why the problem exists, reveal underlying principle
3. **Desire** (3-6 paragraphs): Paint before/after picture with specific details
4. **Action** (2-4 paragraphs): Tell them exactly what to do next

### Content Elements

-   **Specific details**: Include actual numbers, tool names, scenarios
-   **Code examples**: Use proper markdown code blocks with language hints
-   **Metaphors**: Ground in familiar concepts (IaC, cattle vs pets)
-   **Show, don't tell**: Include examples, not just descriptions

### Cliches to avoid

Avoid using these cliches:

-   Here's the thing nobody tells you about ...
-   Here's the kicker ...

## Technical Content Patterns

### Code Blocks

Use fenced code blocks with language specification:

```typescript
// TypeScript example
const project = new MonorepoTsProject({
    name: "my-project",
    packageManager: NodePackageManager.PNPM,
});
```

### Figures and Captions

For complex examples, use figure references:

````markdown
```{#fig:code-init .bash caption="Bootstrapping command"}
mkdir prototype-with-pdk
npm install -g pnpm
```
````

````

### Inline Callouts

Use special callout syntax for emphasis:

```markdown
:::inline-callout
Key insight or principle goes here
:::

:::margin-note
Additional context or tangential information
:::
````

## Image Management

### Directory Structure

Images are organized by post slug:

```
content/img/
├── post-slug/
│   ├── cover.webp
│   ├── diagram-1.png
│   └── screenshot-2.png
```

### Image Guidelines

-   Use WebP format for covers when possible
-   Include descriptive alt text in captions
-   Optimize images for web (reasonable file sizes)
-   Use consistent naming: `cover.webp`, `diagram-1.png`, etc.

## Draft Workflow

### Using Drafts Directory

1. Create new posts in `content/drafts/` first
2. Use same naming convention and frontmatter
3. Move to `content/post/` when ready to publish

### Draft Frontmatter

Add draft status to frontmatter:

```yaml
---
draft: true
author: Author Name
title: "Draft Post Title"
# ... rest of frontmatter
---
```

## Common Post Types

### Technical Tutorial Posts

Structure:

1. **Problem statement**: What we're solving
2. **Prerequisites**: What readers need
3. **Step-by-step walkthrough**: Numbered sections
4. **Code examples**: Working, complete examples
5. **Next steps**: What to explore further

Example tags: `["tutorial", "aws", "kubernetes", "java"]`

### Discovery/Experience Posts

Structure:

1. **The frustration**: Specific, relatable problem
2. **The insight**: What you discovered
3. **The transformation**: Before/after with specifics
4. **The takeaway**: What others can apply

Example tags: `["experience", "tools", "productivity"]`

### Tool/Library Reviews

Structure:

1. **Context**: Why you needed this tool
2. **Evaluation**: What you tested, how
3. **Results**: Specific outcomes, metrics
4. **Recommendation**: When to use, when not to

Example tags: `["review", "tools", "comparison"]`

## Publishing Checklist

Before moving from drafts to posts:

-   [ ] Frontmatter complete and properly formatted
-   [ ] Cover image exists and is optimized
-   [ ] All code examples tested and working
-   [ ] Links verified and working
-   [ ] Tags are relevant and consistent with existing posts
-   [ ] Author bio exists in `content/authors/`
-   [ ] Post follows AIDA structure
-   [ ] Voice matches style guidelines (conversational, humble)
-   [ ] Specific details included (numbers, tool names, scenarios)
-   [ ] Clear call-to-action at the end

## Quick Start Commands

Create a new post:

```bash
# Create the post file
touch "content/drafts/$(date +%Y-%m-%d)-your-post-slug.md"

# Create image directory
mkdir -p "content/img/your-post-slug"
```

Move draft to published:

```bash
mv "content/drafts/YYYY-MM-DD-post-slug.md" "content/post/"
```

## Content Ideas Tracking

Keep a running list of post ideas based on:

-   Problems you solved recently
-   Tools you discovered
-   Mistakes you made and learned from
-   Questions colleagues ask repeatedly
-   Interesting patterns you noticed

Remember: The best posts come from real experiences, not theoretical knowledge.
