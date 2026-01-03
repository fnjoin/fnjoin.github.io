# Polyglot Feature Matrix Research Tasks

Article to update: content/post/2026-01-03-what-tools-help-manage-polyglot-project-dependencies.md
Steering: .kiro/steering/feature-matrix-research-guide.md

## Build Systems & Monorepo Tools

### Header Row & Multi-Language Support

-   [x] **Tool Header Links**: Add official documentation links to tool names
-   [x] **Multi-Language Support**: Research plugin architectures and extensibility models
-   [x] **Supported Languages**: Find specific language support documentation pages

### Core Build Features

-   [x] **Incremental Builds**: Research and link to specific incremental build documentation

    -   [x] Bazel incremental build docs
    -   [x] Pants incremental build implementation
    -   [x] Buck2 incremental build features
    -   [x] Gradle incremental compilation
    -   [x] Nx affected builds
    -   [x] Turborepo incremental builds
    -   [x] Rush incremental builds
    -   [x] Lerna incremental features

-   [x] **Remote Caching**: Find specific remote caching documentation and verify capabilities

    -   [x] Bazel remote caching setup
    -   [x] Pants remote caching configuration
    -   [x] Buck2 remote execution
    -   [x] Gradle build cache (Enterprise vs Community)
    -   [x] Nx Cloud caching
    -   [x] Turborepo remote caching
    -   [x] Rush cloud storage capabilities
    -   [x] Lerna caching via Nx integration

-   [x] **Distributed Builds**: Research distributed/parallel build capabilities

    -   [x] Bazel remote execution
        -   `site:bazel.build "remote execution" distributed builds documentation`
        -   `site:bazel.build remote execution current documentation`
        -   WebFetch: `https://bazel.build/remote/rbe`
    -   [x] Pants distributed builds
        -   `site:pantsbuild.org distributed builds remote execution`
    -   [x] Buck2 distributed execution
        -   `site:buck2.build distributed execution remote builds`
    -   [x] Gradle parallel execution
        -   `site:gradle.org parallel execution distributed builds`
    -   [x] Nx distributed task execution
        -   `site:nx.dev distributed task execution remote builds`
    -   [x] Turborepo parallel limitations
        -   `site:turbo.build distributed builds parallel execution limitations`
    -   [x] Rush parallel build support
        -   `site:rushjs.io distributed builds parallel execution`
    -   [x] Lerna parallel execution
        -   `site:lerna.js.org distributed builds parallel execution`

-   [x] **Hermetic Builds**: Research build isolation and reproducibility
    -   [x] Bazel hermetic build guarantees
        -   `site:bazel.build hermetic builds sandboxing isolation`
        -   WebFetch: `https://bazel.build/basics/hermeticity`
    -   [x] Pants build isolation
        -   `site:pantsbuild.org hermetic builds sandboxing isolation`
    -   [x] Buck2 hermetic builds
        -   `site:buck2.build hermetic builds sandboxing`
    -   [x] Gradle build isolation capabilities
        -   `site:gradle.org build isolation hermetic builds`
    -   [x] Nx build isolation
        -   `site:nx.dev build isolation hermetic builds sandboxing`
    -   [x] Turborepo build isolation
        -   `site:turbo.build build isolation hermetic builds`
    -   [x] Rush build isolation
        -   `site:rushjs.io build isolation hermetic builds`
    -   [x] Lerna build isolation
        -   `site:lerna.js.org build isolation hermetic builds`

### Developer Experience Features

-   [x] **Dependency Inference**: Research automatic dependency detection

    -   [x] Bazel manual dependency declaration
        -   `site:bazel.build dependency declaration manual BUILD files`
        -   WebFetch: `https://bazel.build/concepts/dependencies`
    -   [x] Pants automatic dependency inference
        -   `site:pantsbuild.org automatic dependency inference`
        -   WebFetch: `https://www.pantsbuild.org/stable/reference/subsystems/python-infer`
        -   WebFetch: `https://www.pantsbuild.org/stable/reference/subsystems/java-infer`
        -   WebFetch: `https://www.pantsbuild.org/stable/reference/subsystems/scala-infer`
        -   WebFetch: `https://www.pantsbuild.org/stable/docs/go`
    -   [x] Buck2 dependency management
        -   `site:buck2.build dependency management`
        -   WebFetch: `https://buck2.build/docs/getting_started/tutorial_adding_dependencies/`
    -   [x] Gradle dependency resolution
        -   `site:gradle.org dependency resolution`
        -   WebFetch: `https://docs.gradle.org/current/userguide/dependency_resolution.html`
    -   [x] Nx dependency graph inference
        -   `site:nx.dev dependency graph inference`
        -   WebFetch: `https://nx.dev/l/r/structure/dependency-graph`
        -   WebFetch: `https://nx.dev/docs/extending-nx/project-graph-plugins`
    -   [x] Turborepo dependency detection
        -   `site:turbo.build dependency detection`
        -   WebFetch: `https://turbo.build/repo/docs/crafting-your-repository/configuring-tasks`
    -   [x] Rush dependency management
        -   `site:rushjs.io dependency management`
        -   WebFetch: `https://rushjs.io/pages/intro/welcome/`
    -   [x] Lerna dependency handling
        -   `site:lerna.js.org dependency handling`
        -   WebFetch: `https://lerna.js.org/docs/features/project-graph`

-   [x] **Configuration Complexity**: Research setup and configuration requirements - **COMPLETED WITH LINKS ADDED TO MATRIX**

    -   [x] Bazel BUILD files and Starlark complexity
        -   `site:bazel.build BUILD files Starlark complexity configuration`
        -   `site:bazel.build getting started tutorial BUILD files complexity`
        -   WebFetch: `https://bazel.build/start/cpp`
    -   [x] Pants configuration simplicity
        -   `site:pantsbuild.org configuration simplicity setup`
        -   WebFetch: `https://www.pantsbuild.org/stable/docs/getting-started/initial-configuration`
    -   [x] Buck2 configuration requirements
        -   `site:buck2.build configuration requirements setup`
        -   WebFetch: `https://buck2.build/docs/concepts/buckconfig/`
    -   [x] Gradle build script complexity
        -   `site:gradle.org build script complexity configuration`
        -   `site:gradle.org getting started tutorial build.gradle complexity`
        -   Matrix updated with: `https://docs.gradle.org/current/userguide/writing_build_scripts.html`
    -   [x] Nx workspace configuration
        -   `site:nx.dev workspace configuration setup complexity`
        -   WebFetch: `https://nx.dev/getting-started/start-new-project`
    -   [x] Turborepo configuration simplicity
        -   `site:turbo.build configuration simplicity setup turbo.json`
        -   Matrix updated with: `https://turbo.build/repo/docs/crafting-your-repository/configuring-tasks`
    -   [x] Rush configuration requirements
        -   `site:rushjs.io configuration requirements setup rush.json`
        -   WebFetch: `https://rushjs.io/pages/intro/get_started/`
    -   [x] Lerna configuration ease
        -   `site:lerna.js.org configuration ease setup lerna.json`
        -   WebFetch: `https://lerna.js.org/docs/getting-started`

-   [x] **Learning Curve**: Research onboarding difficulty and documentation quality

    -   [x] Bazel learning resources and complexity
        -   `site:bazel.build getting started tutorial learning curve complexity`
        -   WebFetch: `https://bazel.build/start/cpp`
    -   [x] Pants getting started experience
        -   `site:pantsbuild.org getting started tutorial learning curve onboarding`
        -   WebFetch: `https://www.pantsbuild.org/stable/docs/getting-started/initial-configuration`
    -   [x] Buck2 onboarding process
        -   `site:buck2.build getting started tutorial learning curve onboarding`
        -   WebFetch: `https://buck2.build/docs/getting_started/tutorial_first_build/`
    -   [x] Gradle learning curve
        -   `site:gradle.org getting started tutorial learning curve onboarding`
        -   WebFetch: `https://gradle.org/guides/`
    -   [x] Nx developer experience
        -   `site:nx.dev getting started tutorial learning curve onboarding`
        -   WebFetch: `https://nx.dev/getting-started/`
    -   [x] Turborepo simplicity
        -   `site:turbo.build/repo getting started tutorial learning curve`
        -   WebFetch: `https://turbo.build/repo/docs/getting-started/create-new`
    -   [x] Rush learning requirements
        -   `site:rushjs.io getting started tutorial learning curve onboarding`
        -   WebFetch: `https://rushjs.io/pages/intro/get_started/`
    -   [x] Lerna ease of adoption
        -   `site:lerna.js.org getting started tutorial learning curve onboarding`
        -   WebFetch: `https://lerna.js.org/docs/getting-started`

-   [x] **IDE Integration**: Research editor support and tooling
    -   [x] Bazel IDE plugins and support
        -   `site:bazel.build IDE integration plugins VS Code IntelliJ`
        -   WebFetch: `https://bazel.build/install/ide`
    -   [x] Pants IDE integration
        -   `site:pantsbuild.org IDE integration plugins VS Code IntelliJ`
        -   WebFetch: `https://www.pantsbuild.org/dev/docs/using-pants/setting-up-an-ide`
    -   [x] Buck2 IDE support
        -   `site:buck2.build IDE integration plugins VS Code IntelliJ`
    -   [x] Gradle IDE integration (IntelliJ, VS Code)
        -   `site:gradle.org IDE integration plugins IntelliJ Eclipse VS Code`
    -   [x] Nx Console and IDE support
        -   `site:nx.dev IDE integration plugins VS Code IntelliJ Nx Console`
    -   [x] Turborepo IDE integration
        -   `"Turborepo" IDE integration VS Code IntelliJ plugins`
        -   WebFetch: `https://turborepo.com/docs/getting-started/editor-integration`
    -   [x] Rush IDE support
        -   `"Rush" "rushjs.io" IDE integration VS Code IntelliJ plugins`
    -   [x] Lerna IDE integration
        -   `"Lerna" IDE integration VS Code IntelliJ plugins`

### Ecosystem & Performance

-   [x] **Plugin Ecosystem**: Research plugin availability and community

    -   [x] Bazel rules ecosystem
        -   `site:bazel.build rules ecosystem plugins community`
        -   WebFetch: `https://bazel.build/extending/rules`
    -   [x] Pants plugin ecosystem
        -   `site:pantsbuild.org plugins ecosystem backends community`
    -   [x] Buck2 rules availability
        -   Research shows limited Buck2-specific rules, mostly inherited from Buck1
    -   [x] Gradle plugin ecosystem
        -   `site:gradle.org plugins ecosystem community marketplace`
        -   WebFetch: `https://plugins.gradle.org/search`
    -   [x] Nx plugin marketplace
        -   `site:nx.dev plugins marketplace ecosystem community`
    -   [x] Turborepo plugin ecosystem
        -   `"Turborepo" plugins ecosystem community extensions`
    -   [x] Rush plugin availability
        -   `"Rush" "rushjs.io" plugins ecosystem extensions community`
        -   WebFetch: `https://rushjs.io/pages/extensibility/creating_plugins/`
    -   [x] Lerna plugin ecosystem
        -   `"Lerna" plugins ecosystem extensions community`

-   [x] **Performance (Large Repos)**: Research benchmarks and performance claims
    -   [x] Bazel large-scale performance
        -   `site:bazel.build performance benchmarks large repositories scalability`
        -   WebFetch: `https://bazel.build/advanced/performance/build-performance-breakdown`
    -   [x] Pants performance characteristics
        -   `site:pantsbuild.org performance benchmarks large repositories scalability`
        -   WebFetch: `https://blog.pantsbuild.org/monorepos-and-performance` (content unavailable)
    -   [x] Buck2 performance improvements
        -   `site:buck2.build performance benchmarks large repositories scalability`
        -   WebFetch: `https://buck2.build/docs/about/why`
    -   [x] Gradle performance features
        -   `site:gradle.org performance benchmarks large repositories scalability build cache`
        -   WebFetch: `https://gradle.org/gradle-and-maven-performance`
    -   [x] Nx performance benchmarks
        -   `site:nx.dev performance benchmarks large repositories scalability monorepo`
        -   WebFetch: `https://nx.dev/blog/nx-vs-diy`
    -   [x] Turborepo performance limitations
        -   `site:turbo.build performance benchmarks large repositories scalability limitations`
    -   [x] Rush performance characteristics
        -   `site:rushjs.io performance benchmarks large repositories scalability`
    -   [x] Lerna performance issues
        -   `"Lerna" performance benchmarks large repositories scalability issues`

### Advanced Features

-   [x] **Workspace Management**: Research multi-project workspace features

    -   [x] Bazel workspace management
        -   `site:bazel.build workspace management multi-project features`
        -   WebFetch: `https://bazel.build/external/overview`
    -   [x] Pants workspace features
        -   `site:pantsbuild.org workspace management multi-project features`
    -   [x] Buck2 workspace capabilities
        -   `site:buck2.build workspace management multi-project features`
        -   WebFetch: `https://buck2.build/docs/concepts/key_concepts`
    -   [x] Gradle multi-project builds
        -   `site:gradle.org multi-project builds workspace management`
        -   WebFetch: `https://docs.gradle.org/current/userguide/multi_project_builds.html`
    -   [x] Nx workspace management
        -   `site:nx.dev workspace management multi-project features`
    -   [x] Turborepo workspace features
        -   `site:turbo.build workspace management multi-project features`
        -   WebFetch: `https://turbo.build/repo/docs/handbook/workspaces`
    -   [x] Rush workspace management
        -   `site:rushjs.io workspace management multi-project features`
        -   WebFetch: `https://rushjs.io/pages/advanced/subspaces`
    -   [x] Lerna workspace basics
        -   `site:lerna.js.org workspace management multi-project features`

-   [x] **Task Orchestration**: Research task dependency and execution

    -   [x] Bazel task orchestration
        -   `site:bazel.build task orchestration dependency execution build graph`
        -   WebFetch: `https://bazel.build/versions/8.4.0/basics/task-based-builds`
    -   [x] Pants task execution
        -   `site:pantsbuild.org task execution orchestration dependency graph`
        -   WebFetch: `https://www.pantsbuild.org/stable/docs/contributions/development/internal-architecture`
    -   [x] Buck2 task management
        -   `site:buck2.build task management orchestration dependency execution`
        -   WebFetch: `https://buck2.build/docs/developers/architecture/buck2/`
    -   [x] Gradle task orchestration
        -   `site:gradle.org task orchestration dependency execution graph`
        -   WebFetch: `https://docs.gradle.org/current/javadoc/org/gradle/api/execution/TaskExecutionGraph.html`
    -   [x] Nx task orchestration
        -   `site:nx.dev task orchestration dependency execution graph`
        -   WebFetch: `https://nx.dev/l/a/core-concepts/mental-model`
    -   [x] Turborepo task execution
        -   `site:turbo.build task execution orchestration dependency pipeline`
        -   WebFetch: `https://turbo.build/repo/docs/core-concepts/monorepos/filtering`
    -   [x] Rush task orchestration
        -   `site:rushjs.io task orchestration execution dependency graph`
        -   WebFetch: `https://rushjs.io/pages/intro/welcome/`
    -   [x] Lerna task execution
        -   `site:lerna.js.org task execution orchestration dependency`
        -   WebFetch: `https://lerna.js.org/docs/features/run-tasks`

-   [x] **Versioning/Publishing**: Research package versioning and publishing

    -   [x] Bazel versioning limitations
        -   `site:bazel.build versioning publishing packages release management`
        -   `Bazel package publishing maven npm docker registry deployment`
    -   [x] Pants publishing capabilities
        -   `site:pantsbuild.org versioning publishing packages release management`
        -   WebFetch: `https://www.pantsbuild.org/stable/docs/python/goals/publish`
    -   [x] Buck2 publishing features
        -   `site:buck2.build versioning publishing packages release management`
    -   [x] Gradle publishing support
        -   `site:gradle.org publishing packages maven repository versioning`
        -   WebFetch: `https://docs.gradle.org/current/userguide/publishing_maven.html`
    -   [x] Nx versioning and publishing
        -   `site:nx.dev versioning publishing packages release management`
        -   WebFetch: `https://nx.dev/recipes/nx-release`
    -   [x] Turborepo publishing limitations
        -   `site:turbo.build versioning publishing packages release management`
        -   WebFetch: `https://turbo.build/docs/guides/publishing-libraries`
    -   [x] Rush advanced publishing
        -   `site:rushjs.io versioning publishing packages release management`
        -   WebFetch: `https://rushjs.io/pages/maintainer/publishing/`
    -   [x] Lerna versioning and publishing
        -   `site:lerna.js.org versioning publishing packages release management`
        -   WebFetch: `https://lerna.js.org/docs/features/version-and-publish`

## Automated Dependency Update Tools

### Core Features

-   [ ] **Package Manager Support**: Verify supported package managers and ecosystems

    -   [ ] Renovate supported managers list
    -   [ ] Dependabot supported ecosystems

-   [ ] **Platform Support**: Research supported Git platforms

    -   [ ] Renovate platform support
    -   [ ] Dependabot platform limitations

-   [ ] **Monorepo Support**: Research monorepo-specific features
    -   [ ] Renovate monorepo features
    -   [ ] Dependabot monorepo limitations

### Configuration & Management

-   [ ] **Grouping Rules**: Research PR grouping capabilities

    -   [ ] Renovate grouping configuration
    -   [ ] Dependabot grouping limitations

-   [ ] **Automerge**: Research automatic merge capabilities

    -   [ ] Renovate automerge rules
    -   [ ] Dependabot automerge features

-   [ ] **Scheduling**: Research update scheduling options

    -   [ ] Renovate scheduling flexibility
    -   [ ] Dependabot scheduling options

-   [ ] **Configuration Complexity**: Research setup and configuration requirements
    -   [ ] Renovate configuration complexity
    -   [ ] Dependabot configuration simplicity

### Advanced Features

-   [ ] **Self-Hosted Option**: Research deployment options

    -   [ ] Renovate self-hosting
    -   [ ] Dependabot hosting limitations

-   [ ] **Preset System**: Research configuration presets

    -   [ ] Renovate preset ecosystem
    -   [ ] Dependabot preset limitations

-   [ ] **Custom Rules**: Research customization capabilities

    -   [ ] Renovate custom rules
    -   [ ] Dependabot customization limits

-   [ ] **Rate Limiting Control**: Research API rate limiting features

    -   [ ] Renovate rate limiting
    -   [ ] Dependabot rate limiting

-   [ ] **Dashboard/Analytics**: Research monitoring and analytics

    -   [ ] Renovate dashboard features
    -   [ ] Dependabot analytics

-   [ ] **Noise Management**: Research notification and PR management
    -   [ ] Renovate noise reduction
    -   [ ] Dependabot noise issues

## Research Guidelines

For each task:

1. **Find specific documentation pages** (not just homepages)
2. **Verify current capabilities** against official docs
3. **Link to relevant feature documentation**
4. **Note any limitations or caveats**
5. **Check for recent changes or updates**
6. **Distinguish between native vs. plugin support**
7. **Track search queries used** - Add as sub-bullets under each completed task
8. **Track webFetch calls used** - Include URLs fetched for detailed documentation

## Search Query Templates

```
site:tool.domain "feature-name" documentation
site:tool.domain "feature-name" configuration
"tool-name" "feature-name" official documentation
"tool-name" "feature-name" setup guide
```

## Research Process Tracking

When completing each task, organize search queries and webFetch calls under the specific tool subtasks:

**Format for completed tool subtasks:**

```
-   [x] Tool name feature research
    -   `site:tool.domain "feature-name" documentation`
    -   `site:tool.domain "feature-name" configuration`
    -   WebFetch: `https://tool.domain/specific/page` (if used)
```

**Format for upcoming tool subtasks:**

```
-   [ ] Tool name feature research
    -   `site:tool.domain "feature-name" documentation`
```

This approach:

-   **Organizes research by tool** - Easy to see what queries worked for each tool
-   **Tracks methodology per tool** - Useful when tools have different documentation structures
-   **Enables targeted updates** - Re-run specific tool queries when their docs change
-   **Shows research depth** - Some tools may need more queries than others

## Completion Criteria

Each feature cell should have:

-   [ ] Accurate capability assessment (✅/⚠️/❌)
-   [ ] Link to specific feature documentation
-   [ ] Contextual notes in parentheses where helpful
-   [ ] Verification against current tool version
