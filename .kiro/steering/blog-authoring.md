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
excerpt: >
    SEO-optimized description (under 160 chars) describing what readers will learn.
    Use multi-line YAML for longer excerpts to improve readability.
date: YYYY-MM-DD
coverImage:
    imageSrc: /img/post-slug/cover.webp
    caption: Image description for accessibility
ogImage:
    url: /img/post-slug/social-share.webp
tags: ["tag1", "tag2", "tag3"]
---
```

#### Frontmatter Field Guide

**Required Fields:**

-   `title`: The main post title (used in `<title>` tag and `<h1>`)
-   `author`: Must match an author file in `content/authors/`
-   `date`: Publication date in YYYY-MM-DD format
-   `tags`: Array of relevant tags for categorization

**SEO & Social Media Fields:**

-   `excerpt`: **Critical for SEO** - Used as meta description and OpenGraph description

    -   Must be under 160 characters for optimal search results
    -   Should describe what readers will learn, not just what the post is about
    -   Match the post's tone (conversational for discovery posts, technical for tutorials)
    -   Examples:
        -   ✅ "Learn why git becomes your lifeline when AI writes most of your code"
        -   ❌ "This post is about using git with AI coding tools"

-   `subtitle`: Optional tagline that appears under the title
    -   Used for additional context or compelling hook
    -   Often more specific than the title
    -   Example: "Add user ID, session ID, and request ID to every log—AI can now trace any bug"

**Image Fields:**

-   `coverImage`: Primary article image displayed in post and previews

    -   `imageSrc`: Path to image file (preferably WebP format)
    -   `caption`: Alt text for accessibility and image description

-   `ogImage`: **Dedicated social sharing image** (takes priority over coverImage)
    -   `url`: Path to optimized social media image
    -   **Optimal dimensions**: 1200x630 pixels (1.91:1 aspect ratio)
    -   Used for Facebook, Twitter, LinkedIn previews
    -   Should be designed specifically for social sharing

**Image Priority for Social Sharing:**

1. `ogImage.url` (if present) - purpose-built for social media
2. `coverImage.imageSrc` (fallback) - article display image
3. No image (if neither exists)

**Optional Fields:**

-   `draft`: Set to `true` to exclude from published site
-   Custom fields for specific post types (add as needed)

#### SEO Implementation Details

The frontmatter automatically generates these HTML meta tags:

```html
<!-- From title -->
<title>Post Title | Join Function</title>

<!-- From excerpt -->
<meta name="description" content="Excerpt content here" />

<!-- From ogImage or coverImage -->
<meta
    property="og:image"
    content="https://www.fnjoin.com/img/post-slug/social.webp"
/>
<meta property="og:url" content="https://www.fnjoin.com/post/post-slug/" />

<!-- Canonical URL (with trailing slash) -->
<link rel="canonical" href="https://www.fnjoin.com/post/post-slug/" />
```

#### Excerpt Writing Guidelines

**Match the post's tone:**

-   Discovery posts: "Discover why...", "Learn how...", "Stop doing X and start..."
-   Technical tutorials: "Build a system that...", "Configure X to achieve Y..."
-   Experience posts: "Transform X into Y using...", "Turn your Z problem into..."

**Focus on learning outcomes:**

-   What will readers be able to do after reading?
-   What specific problem does this solve?
-   What insight or technique will they gain?

**Examples by post type:**

_AI Coding Tips (conversational):_

```yaml
excerpt: Stop arguing with chatbots about TypeScript vs JavaScript. Learn how to scaffold projects before AI writes application code, turning your workspace structure into the perfect prompt.
```

_Technical Tutorial (direct):_

```yaml
excerpt: Build a Kubernetes controller that automatically creates MySQL databases with StatefulSets, Services, and Secrets. Learn how controllers subscribe to API events and manage resource lifecycles.
```

_Infrastructure Guide (practical):_

```yaml
excerpt: Set up remote development with VS Code's SSH plugin and automatic port forwarding. Learn how to use AWS CDK to create and delete EC2 development environments with encrypted storage.
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

Avoid using these overused phrases:

-   Here's the thing nobody tells you about ...
-   Here's the kicker ...
-   You won't believe ...
-   This one weird trick ...
-   The secret that [industry] doesn't want you to know ...

**Why to avoid**: These phrases have become clickbait cliches that make content sound sensational rather than authentic. Use more natural, conversational transitions instead.

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

-   [ ] **Frontmatter complete and properly formatted**
    -   [ ] Required fields: title, author, date, tags
    -   [ ] Excerpt written (under 160 chars, describes what readers learn)
    -   [ ] Subtitle added if helpful for context
    -   [ ] Author exists in `content/authors/`
-   [ ] **Images optimized and configured**
    -   [ ] Cover image exists and is optimized
    -   [ ] OG image created (1200x630px) for social sharing if needed
    -   [ ] Image captions include proper alt text
-   [ ] **Content quality checks**
    -   [ ] All code examples tested and working
    -   [ ] Links verified and working
    -   [ ] Post follows AIDA structure
    -   [ ] Voice matches style guidelines (conversational, humble)
    -   [ ] Specific details included (numbers, tool names, scenarios)
    -   [ ] Clear call-to-action at the end
-   [ ] **SEO and discoverability**
    -   [ ] Tags are relevant and consistent with existing posts
    -   [ ] Excerpt optimized for search results and social sharing
    -   [ ] Title is compelling and descriptive

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
