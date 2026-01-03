---
inclusion: manual
---

# Feature Matrix Research Guide

A systematic approach for creating well-referenced, authoritative feature comparison matrices based on lessons learned from polyglot build system research.

## Overview

Creating accurate feature matrices requires deep research into tool capabilities, plugin ecosystems, and extensibility models. This guide provides a step-by-step process to ensure your comparisons are authoritative and useful.

## Research Process

### 1. **Start with Official Tool Links in Headers**

-   Link tool names in the header row to official homepages/main documentation
-   This provides readers with the primary entry point for each tool
-   Use the most authoritative domain (e.g., `bazel.build`, `gradle.org`, not GitHub)

### 2. **Research Plugin/Extension Architectures First**

Before making claims about capabilities, understand each tool's extensibility model:

-   **Search for**: `site:tool.domain "plugins" OR "extensions" OR "backends" OR "rules"`
-   **Key questions**: How does the tool add new language support? What's the plugin ecosystem like?
-   **Examples**: Bazel uses Starlark rules, Pants uses Python backends, Nx has community plugins

### 3. **Find Specific Feature Documentation Pages**

Don't link to generic homepages for feature details. Search for:

-   **Pattern**: `site:docs.tool.domain "feature-name" OR "supported languages" OR "backends"`
-   **Target pages**: Reference docs, feature guides, configuration pages
-   **Examples**:
    -   `https://bazel.build/rules` (not just `bazel.build`)
    -   `https://www.pantsbuild.org/stable/docs/using-pants/key-concepts/backends`
    -   `https://docs.gradle.org/current/userguide/building_java_projects.html`

### 4. **Verify Claims Against Current Documentation**

-   Cross-reference multiple sources to ensure accuracy
-   Check for recent changes in tool capabilities
-   Look for official "supported languages" or "compatibility" pages
-   Verify plugin ecosystem maturity (active vs. abandoned projects)

### 5. **Use Hierarchical Link Strategy**

Structure your links by specificity:

-   **Header row**: Main tool documentation
-   **Feature rows**: Specific feature documentation
-   **Capability cells**: Most specific relevant page (e.g., language support, plugin guides)

### 6. **Research Community Extensions**

For tools with plugin ecosystems:

-   **Search**: `"tool-name" community plugins languages`
-   **Check**: GitHub topics, npm packages, official plugin registries
-   **Verify**: Plugin maintenance status and adoption
-   **Example**: `nx-dotnet`, `nx-go` for Nx ecosystem

### 7. **Distinguish Between Native vs. Plugin Support**

Be clear about what's built-in vs. community-supported:

-   **Native**: "✅ Extensive (built-in rules)"
-   **Plugin-based**: "✅ Good (community plugins)"
-   **Limited**: "⚠️ JS/TS focused (package.json scripts)"

### 8. **Link to Architecture Documentation**

For extensibility claims, link to:

-   Plugin development guides
-   Architecture documentation
-   Extension APIs
-   Rule/backend writing guides

### 9. **Validate Link Quality**

Ensure links are:

-   **Specific**: Point to exact feature documentation, not homepages
-   **Current**: Use latest/stable documentation versions
-   **Authoritative**: Official docs over Wikipedia or third-party sites
-   **Accessible**: Public documentation, not behind paywalls

### 10. **Provide Context in Link Text**

Make link text descriptive:

-   **Good**: `[Extensive](https://bazel.build/extending/rules) (Starlark rules)`
-   **Bad**: `[Extensive](https://bazel.build/about/faq)`
-   **Context**: Include the mechanism (rules, plugins, backends) in parentheses

### 11. **Cross-Reference Multiple Sources**

For controversial or unclear capabilities:

-   Check official docs + community discussions
-   Look for recent blog posts or release notes
-   Verify against actual usage examples
-   Consider tool maturity and adoption

### 12. **Document Your Research Process**

Keep track of:

-   Search queries used
-   Sources consulted
-   Decisions made about ratings
-   Date of research (for future updates)

## Search Query Patterns

### Plugin Architecture Research

```
site:tool.domain "plugins" OR "extensions" OR "backends" OR "rules"
site:tool.domain "extensibility" OR "plugin development"
"tool-name" plugin architecture documentation
```

### Language Support Research

```
site:tool.domain "supported languages" OR "language support"
site:tool.domain "building" languages Java C++ Python
"tool-name" polyglot multi-language support
```

### Community Plugin Research

```
"tool-name" community plugins languages
"tool-name-plugin" OR "tool-name-extension" github
site:npmjs.com "tool-name-plugin"
```

## Link Quality Standards

### Preferred Link Types (in order)

1. **Official feature documentation** (e.g., `/docs/features/languages`)
2. **Official reference documentation** (e.g., `/reference/plugins`)
3. **Official user guides** (e.g., `/guides/multi-language`)
4. **Official homepages** (only for header row)
5. **Community plugin registries** (for plugin ecosystem claims)

### Avoid These Link Types

-   Wikipedia articles (use official docs instead)
-   Third-party blog posts (unless no official docs exist)
-   Outdated documentation versions
-   Generic homepages for specific feature claims

## Rating Guidelines

### Multi-Language Support Ratings

-   **✅ Extensive**: Native support for 8+ languages OR robust plugin system with active ecosystem
-   **✅ Excellent**: Strong plugin architecture with official multi-language support
-   **✅ Good**: Solid plugin system with community extensions for major languages
-   **⚠️ Limited/Focused**: Primarily designed for specific ecosystem but extensible
-   **❌ None**: No extensibility or very limited scope

### Plugin Ecosystem Assessment

Consider:

-   **Official support**: Does the tool vendor maintain plugins?
-   **Community activity**: Are there active community plugins?
-   **Documentation quality**: Are plugin APIs well-documented?
-   **Maintenance**: Are plugins actively maintained?
-   **Adoption**: Are plugins widely used?

## Quality Checklist

Before publishing, verify:

-   [ ] All links point to official documentation
-   [ ] Feature claims are backed by specific documentation
-   [ ] Plugin/extension capabilities are accurately represented
-   [ ] Links are specific to the feature, not generic homepages
-   [ ] Recent changes in tool capabilities are reflected
-   [ ] Community plugin ecosystems are fairly assessed
-   [ ] Extensibility models are clearly explained
-   [ ] Search queries and sources are documented
-   [ ] Research date is noted for future updates

## Example: Good vs. Bad References

### Good Reference

```markdown
| **Multi-Language Support** | ✅ [Extensive](https://bazel.build/extending/rules) (Starlark rules) |
| **Supported Languages** | [Java, C++, Go, Python, Rust, JS, Kotlin, Scala](https://bazel.build/rules) |
```

### Bad Reference

```markdown
| **Multi-Language Support** | ✅ Extensive |
| **Supported Languages** | Java, C++, Go, Python, Rust, JS, Kotlin, Scala |
```

## Maintenance

### Regular Updates

-   Review matrices quarterly for tool updates
-   Check for new plugin releases
-   Verify links are still active
-   Update ratings based on ecosystem changes

### Version Tracking

-   Note tool versions researched
-   Track major releases that affect capabilities
-   Update documentation links to current versions

This guide ensures your feature matrices become reliable references that readers can trust for making informed technical decisions.
