# Frontmatter Guidelines

## Date Format Requirements

**CRITICAL**: The `date` field in frontmatter must be unquoted and in ISO format.

### Correct Format

```yaml
---
title: "Your Article Title"
date: 2026-01-02T05:35:07.322Z
# OR simple date format
date: 2026-01-02
---
```

### Incorrect Format (Will Break RSS Feed)

```yaml
---
title: "Your Article Title"
date: "2026-01-02T05:35:07.322Z"  # ❌ DO NOT QUOTE DATES
date: "2026-01-02"                # ❌ DO NOT QUOTE DATES
---
```

## Required Fields

All blog posts must include:

```yaml
---
title: "Article Title"
excerpt: "Brief description for SEO and social sharing"
date: 2026-01-02
author: Author Name
tags: ["tag1", "tag2", "tag3"]
---
```

## Optional Fields

```yaml
---
# Required fields above...
coverImage: "/assets/blog/post-slug/cover.jpg"
ogImage:
    url: "/assets/blog/post-slug/social.jpg"
figurens:
    img: Image
    fig: Figure
    code: Code Excerpt
preview: false
---
```

## Field Specifications

-   **title**: Always quoted string
-   **excerpt**: Always quoted string for SEO/social descriptions
-   **date**: NEVER quoted, use ISO format (YYYY-MM-DD or YYYY-MM-DDTHH:MM:SS.sssZ)
-   **author**: Unquoted string (matches author directory name)
-   **tags**: Array of quoted strings
-   **coverImage**: Quoted path to cover image
-   **ogImage.url**: Quoted path to social sharing image
-   **figurens**: Object mapping namespace to display names for figure references (optional, see Figure Reference System below)
-   **preview**: Boolean (true/false, unquoted)

## Common Mistakes

1. **Quoting dates** - This breaks RSS feed generation
2. **Missing required fields** - Causes build warnings
3. **Incorrect tag format** - Use array syntax: `["tag1", "tag2"]`
4. **Wrong author name** - Must match directory in `content/authors/`

## Validation

The build process will fail if:

-   Date fields are quoted (RSS generation error)
-   Required fields are missing
-   Date format is invalid

Always test your build after adding new posts to catch frontmatter errors early.

## Figure Reference System (Optional)

The `figurens` field is only needed when using `:::figure-fence` blocks or figure references in your content.

### When to use figurens

-   You have `:::figure-fence` blocks with `id` attributes in your markdown
-   You want semantic figure labels ("Code Excerpt 1" vs "Figure 1")
-   You're using reference links to figures in your content

### What happens without figurens

-   Build warning: "Missing ref namespaces in the article frontmatter"
-   All figures default to "Figure N" numbering (still functional)
-   No impact on site functionality, just less semantic richness

### Example usage

```yaml
figurens:
    img: Image # img:screenshot1 → "Image 1"
    fig: Figure # fig:diagram1 → "Figure 1"
    code: Code Excerpt # code:example1 → "Code Excerpt 1"
```

### How it works

When you create a figure with `:::figure-fence{id="img:screenshot1"}`, the system:

1. Extracts the namespace (`img`) from the ID
2. Looks up the display name in `figurens` (`Image`)
3. Numbers sequentially within that namespace (`Image 1`, `Image 2`, etc.)

Without `figurens`, everything becomes "Figure 1", "Figure 2" regardless of content type.
