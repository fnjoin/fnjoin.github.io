---
inclusion: manual
---

# TitleSearch: Keyword Research for Better Blog Titles

## What It Does

TitleSearch queries Google's autocomplete API to discover what people are actually typing into search boxes. This helps you align your blog titles with real search behavior instead of guessing what might work.

## Basic Usage

```bash
# From the workspace root
npx titlesearch querycomplete --prefix "how to write"

# Or from the titlesearch package
cd packages/titlesearch
npx titlesearch querycomplete --prefix "your search term"
```

## Title Optimization Strategy

### 1. Test Your Current Titles

Before publishing, test variations of your planned title:

```bash
# If your title is "Writing Better Unit Tests"
npx titlesearch querycomplete --prefix "writing better"
npx titlesearch querycomplete --prefix "how to write better"
npx titlesearch querycomplete --prefix "unit test"
```

Look for suggestions that match your content. If Google suggests "how to write better unit tests" but not "writing better unit tests", consider adjusting your title.

### 2. Discover Popular Patterns

Find what people actually search for in your topic area:

```bash
# For programming content
npx titlesearch querycomplete --prefix "how to"
npx titlesearch querycomplete --prefix "what is"
npx titlesearch querycomplete --prefix "best way to"

# For tutorials
npx titlesearch querycomplete --prefix "learn"
npx titlesearch querycomplete --prefix "tutorial"
npx titlesearch querycomplete --prefix "guide to"
```

### 3. Research Specific Topics

When planning content, see what specific questions people ask:

```bash
# For React content
npx titlesearch querycomplete --prefix "react"
npx titlesearch querycomplete --prefix "react hooks"
npx titlesearch querycomplete --prefix "react vs"

# For DevOps content
npx titlesearch querycomplete --prefix "docker"
npx titlesearch querycomplete --prefix "kubernetes"
npx titlesearch querycomplete --prefix "ci cd"
```

## Interpreting Results

### High-Value Indicators

-   **Exact matches**: If your title appears in suggestions, that's gold
-   **Close variations**: Similar phrasing suggests you're on the right track
-   **Question formats**: "How to X" often performs better than "X Guide"
-   **Specific terms**: More specific suggestions indicate focused search intent

### Red Flags

-   **No related suggestions**: Your topic might be too niche or poorly phrased
-   **Very different phrasing**: People might think about your topic differently
-   **Missing key terms**: Important words from your title don't appear in any suggestions

## Title Optimization Workflow

1. **Draft your title** based on your content
2. **Extract key phrases** from your title (2-4 words each)
3. **Test each phrase** with titlesearch
4. **Look for patterns** in the suggestions
5. **Adjust your title** to match popular search patterns
6. **Test the new version** to confirm improvement

## Examples

### Before: "Comprehensive Unit Testing Strategies"

```bash
npx titlesearch querycomplete --prefix "comprehensive unit"
# Result: No matches - too formal

npx titlesearch querycomplete --prefix "unit testing"
# Result: "unit testing best practices", "unit testing tutorial"
```

### After: "Unit Testing Best Practices"

```bash
npx titlesearch querycomplete --prefix "unit testing best"
# Result: "unit testing best practices" - exact match!
```

### Before: "Optimizing Database Performance"

```bash
npx titlesearch querycomplete --prefix "optimizing database"
# Result: Few matches

npx titlesearch querycomplete --prefix "database performance"
# Result: "database performance tuning", "how to improve database performance"
```

### After: "How to Improve Database Performance"

```bash
npx titlesearch querycomplete --prefix "how to improve database"
# Result: "how to improve database performance" - exact match!
```

## Advanced Tips

### Seasonal Research

Some searches are seasonal. Test your titles at different times:

```bash
# Holiday content
npx titlesearch querycomplete --prefix "christmas"
npx titlesearch querycomplete --prefix "new year"

# Back-to-school content
npx titlesearch querycomplete --prefix "learn programming"
npx titlesearch querycomplete --prefix "coding bootcamp"
```

### Competitor Analysis

Research what people search for around your competitors:

```bash
npx titlesearch querycomplete --prefix "react vs vue"
npx titlesearch querycomplete --prefix "python vs javascript"
npx titlesearch querycomplete --prefix "aws vs azure"
```

### Long-tail Discovery

Find specific, less competitive phrases:

```bash
# Instead of just "javascript"
npx titlesearch querycomplete --prefix "javascript for beginners"
npx titlesearch querycomplete --prefix "javascript interview questions"
npx titlesearch querycomplete --prefix "javascript best practices"
```

## Integration with Content Strategy

### Content Planning

Use titlesearch during your content planning phase:

1. **Brainstorm topics** in your expertise area
2. **Research search patterns** for each topic
3. **Prioritize topics** with strong search suggestions
4. **Plan titles** that match popular search patterns

### SEO Alignment

Your titles should balance:

-   **Search popularity** (what titlesearch reveals)
-   **Content accuracy** (what your post actually covers)
-   **Brand voice** (how you want to sound)
-   **Click appeal** (what makes people want to read)

### Content Series

For multi-part content, research the entire series:

```bash
# For a React series
npx titlesearch querycomplete --prefix "react tutorial"
npx titlesearch querycomplete --prefix "learn react"
npx titlesearch querycomplete --prefix "react for beginners"
npx titlesearch querycomplete --prefix "advanced react"
```

This helps you structure your series around how people actually learn and search for information.

## Limitations

-   **Geographic bias**: Results may vary by location
-   **Temporal bias**: Popular searches change over time
-   **Language bias**: Only works for the language you specify
-   **Sample size**: Google's suggestions are based on aggregate data, not absolute search volumes

## Best Practices

1. **Test multiple variations** of your key phrases
2. **Look for patterns** across different searches
3. **Don't force unnatural phrasing** just to match suggestions
4. **Consider search intent** behind the suggestions
5. **Balance SEO with readability** - your title still needs to sound natural
6. **Test regularly** - search patterns evolve over time

Remember: The goal isn't to copy Google's suggestions exactly, but to understand how people think about and search for your topics. Use this insight to craft titles that feel natural to both search engines and human readers.
