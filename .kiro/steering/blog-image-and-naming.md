---
inclusion: manual
---

# Blog Image Management and File Naming

This steering document covers how to properly handle cover images and file naming for blog posts.

## Cover Image Setup Process

When adding a cover image to a blog post, follow these steps:

### 1. Image Directory Structure

Images are organized by post slug in the `content/img/` directory:

```
content/img/
├── [post-slug]/
│   ├── head-img.png
│   └── [other-images].png
```

### 2. Frontmatter Format

Add the cover image to the post's frontmatter using this exact structure:

```yaml
---
title: Post Title
author: Author Name
subtitle: Post subtitle
date: YYYY-MM-DD
coverImage:
    imageSrc: /img/[post-slug]/head-img.png
    caption: |
        Your caption text here.
        (Image credit, created using AI in the style of [xkcd](https://xkcd.com/))
tags: ["tag1", "tag2"]
---
```

### 3. Image File Management

When you have an image file (like `head-img.png`) in the workspace root:

1. **Create the image directory**:

    ```bash
    mkdir -p content/img/[post-slug]
    ```

2. **Move the image**:
    ```bash
    mv head-img.png content/img/[post-slug]/
    ```

## File Naming Convention

### Post File Naming Pattern

Posts follow the pattern: `YYYY-MM-DD-slug.md`

The slug should match the post title, converted to lowercase with hyphens:

-   "Good build output is also worth a thousand prompts"
-   → `2025-12-27-good-build-output-is-also-worth-a-thousand-prompts.md`

### Renaming Files to Match Title

When the filename doesn't match the actual title:

1. **Rename the post file** (use git mv to preserve history):

    ```bash
    git mv content/post/old-name.md content/post/new-name.md
    ```

2. **Rename the image directory** to match:

    ```bash
    mv content/img/old-slug content/img/new-slug
    ```

3. **Update the frontmatter** to point to the new image path:
    ```yaml
    coverImage:
        imageSrc: /img/new-slug/head-img.png
    ```

## Complete Example Workflow

Starting with:

-   File: `content/post/2025-12-27-build-robust-build-architecture.md`
-   Title: "Good build output is also worth a thousand prompts"
-   Image: `head-img.png` in workspace root

**Steps:**

1. Create image directory:

    ```bash
    mkdir -p content/img/2025-12-27-good-build-output-is-also-worth-a-thousand-prompts
    ```

2. Move image:

    ```bash
    mv head-img.png content/img/2025-12-27-good-build-output-is-also-worth-a-thousand-prompts/
    ```

3. Rename post file:

    ```bash
    git mv content/post/2025-12-27-build-robust-build-architecture.md content/post/2025-12-27-good-build-output-is-also-worth-a-thousand-prompts.md
    ```

4. Update frontmatter:
    ```yaml
    coverImage:
        imageSrc: /img/2025-12-27-good-build-output-is-also-worth-a-thousand-prompts/head-img.png
        caption: |
            Your caption here.
            (Image credit, created using AI in the style of [xkcd](https://xkcd.com/))
    ```

## Slug Generation Rules

Convert title to slug by:

1. Convert to lowercase
2. Replace spaces with hyphens
3. Remove special characters (keep letters, numbers, hyphens)
4. Remove articles like "a", "an", "the" if they make the slug too long

**Examples:**

-   "A failing test is worth a thousand prompts" → `failing-test-is-worth-a-thousand-prompts`
-   "Good build output is also worth a thousand prompts" → `good-build-output-is-also-worth-a-thousand-prompts`

## Common Patterns

### When user says:

-   "add this image to the article"
-   "put head-img.png as the cover"
-   "update the frontmatter for the image"

### Do:

1. Create proper image directory structure
2. Move image to correct location
3. Add coverImage frontmatter with proper path and caption

### When user says:

-   "update file names to match the title"
-   "rename files to match"
-   "fix the file naming"

### Do:

1. Generate proper slug from title
2. Use `git mv` to rename post file
3. Rename image directory to match
4. Update frontmatter image path

## Caption Guidelines

Standard caption format for AI-generated images:

```
[Description of what the image shows].
(Image credit, created using AI in the style of [xkcd](https://xkcd.com/))
```

Keep captions concise but descriptive, and always credit AI generation with xkcd style attribution.
