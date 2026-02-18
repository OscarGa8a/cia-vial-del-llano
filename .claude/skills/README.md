# CiaVialDelLlano Skills - Documentation

> **AI Agent Skills for CiaVialDelLlano** - Reusable knowledge modules for Claude Code and other AI agents

## What are Skills?

Skills are **structured knowledge modules** that teach AI agents how to work with specific technologies, patterns, or project-specific logic. They follow the [Agent Skills specification](https://agentskills.io) for maximum compatibility.

## Why Skills?

- **Consistency**: Ensure all generated code follows the same patterns
- **Quality**: Codify best practices and prevent anti-patterns
- **Onboarding**: New agents (or developers) learn the project quickly
- **Maintainability**: Update patterns in one place, apply everywhere
- **Portability**: Works with Claude Code, Cursor, GitHub Copilot, and more

## Skill Categories

### Generic Skills (Reusable Across Projects)

These skills can be used in **any** Angular/Ionic project:

#### Framework Skills

- `angular-component` - Create standalone components (OnPush, Signals, JSDoc)
- `angular-feature` - Scaffold feature modules (pages, components, services)
- `angular-http` - HTTP services, interceptors, API integration
- `angular-guards` - Route guards, navigation protection
- `angular-forms` - Reactive forms, validation, form utilities
- `angular-state` - Signal-based state management
- `angular-testing` - Unit tests with Jasmine/Karma
- `angular-performance` - Performance optimization, lazy loading
- `angular-error-handling` - Error handling, logging patterns

#### Mobile & UI Skills

- `ionic-components` - Ionic component patterns, navigation, modals
- `ionic-capacitor` - Capacitor plugins, permissions, native features
- `tailwind-4` - Modern Tailwind CSS 4 with [class] bindings
- `template-to-feature` - Convert HTML/Figma/images to Angular features

#### Testing & Quality

- `playwright-e2e` - Playwright E2E tests, page objects
- `typescript` - TypeScript strict mode patterns

#### Workflow Skills

- `git-commit` - Conventional commits with detailed bodies
- `git-pr` - Pull request workflow, review guidelines

### CiaVialDelLlano-Specific Skills

These skills contain **business logic unique to CiaVialDelLlano**:

- `ciavial` - Project overview, architecture, module navigation
- `ciavial-api` - Backend API endpoints, models, data flow

### Meta Skills (Skill Management)

- `skill-creator` - Create new AI agent skills following best practices
- `skill-sync` - Sync skill metadata to AGENTS.md auto-invoke sections

## How to Use Skills

### Auto-Invoke (Recommended)

Skills automatically load when you perform certain actions. The system matches your action to the skill's `auto_invoke` triggers:

```
You: "Create a new HTTP service for venues"
     ↓
Claude: *Reads .claude/AGENTS.md auto-invoke table*
        *Finds: "Creating HTTP services" → angular-http*
        *Loads angular-http skill*
        *Follows patterns from skill*
     ↓
Result: Consistent, high-quality code following project patterns
```

### Manual Invocation

You can explicitly request a skill:

```
You: "Use the angular-component skill to create a venue card component"
```

### Discovery

Browse all available skills:

```
You: "What skills are available?"
You: "Show me skills for HTTP"
```

## Skill Structure

Every skill follows this structure:

```markdown
---
# Frontmatter (YAML metadata)
name: skill-name
description: >
  Brief description.
  Trigger: When to use this skill.
metadata:
  auto_invoke:
    - 'Action that triggers skill'
---

# Skill Content

## What I do

## When to use me

## Critical Patterns (ALWAYS/NEVER)

## Pattern 1, 2, 3... (with code examples)

## Decision Trees

## Commands

## Related Skills
```

### Key Sections

1. **What I do** - Brief overview (2-3 sentences)
2. **When to use me** - Clear trigger conditions
3. **Critical Patterns** - ALWAYS/NEVER rules (most important!)
4. **Patterns** - Code examples with explanations
5. **Decision Trees** - Visual guides for choosing approaches
6. **Commands** - Relevant CLI commands
7. **Related Skills** - Links to other skills

## Creating New Skills

Use the `skill-creator` skill:

```
You: "Create a new skill for working with Mapbox maps"
```

Or manually:

1. Create directory: `.claude/skills/your-skill-name/`
2. Copy template from `skill-creator`
3. Fill in content with real project examples
4. Update `.claude/AGENTS.md`:
   - Add to "Available Skills" table
   - Add to "Auto-invoke Skills" table
5. Test by triggering the skill

### Skill Naming Convention

**Generic skills**: `{technology}-{topic}`

- Examples: `angular-http`, `ionic-components`, `playwright-e2e`
- Reusable across projects

**Project-specific skills**: `{project}-{topic}`

- Examples: `ciavial-auth`, `ciavial-api`
- Contains business logic unique to the project

## Best Practices

### DO ✅

- Use **real code examples** from the project
- Keep skills focused (single responsibility)
- Use decision trees for common choices
- Link to related skills
- Update auto-invoke tables when adding skills
- Test skills by asking Claude to use them

### DON'T ❌

- Copy-paste generic examples from docs
- Create mega-skills covering too much
- Duplicate content across skills
- Forget to update AGENTS.md
- Use project-specific names for generic patterns

## Skill Hierarchy

When multiple skills apply, follow this priority:

1. **Most specific skill** (ciavial-auth > angular-guards)
2. **Explicit invocation** (manual request > auto-invoke)
3. **Recent context** (if skill was just discussed, use it)

## Maintenance

### Updating Skills

When patterns change in the project:

1. Update the skill file
2. Increment `metadata.version` (semantic versioning)
3. Update `Last Updated` date
4. Test that auto-invoke still works

### Deprecating Skills

If a skill becomes obsolete:

1. Add `DEPRECATED` notice at top of skill
2. Link to replacement skill
3. Remove from auto-invoke tables
4. Keep file for historical reference

## Integration with Tools

### Claude Code (claude.ai/code)

Skills work out-of-the-box with Claude Code. The `.claude/` directory is automatically detected.

### Cursor

Add to `.cursor/settings.json`:

```json
{
  "claude.skillsPath": ".claude/skills"
}
```

### GitHub Copilot

Skills are referenced in `.github/copilot-instructions.md`

## Metrics & Success

Track skill effectiveness:

- **Coverage**: % of common tasks with skills (target: 80%+)
- **Consistency**: % of code following skill patterns (target: 90%+)
- **Onboarding**: Time for new agent/developer to be productive (target: -50%)
- **Quality**: % reduction in pattern violations (target: 70%+)

## Troubleshooting

**Skill not auto-invoked?**

- Check `.claude/AGENTS.md` auto-invoke table
- Ensure trigger phrase matches your action
- Try manual invocation: "Use {skill-name} skill"

**Skill outdated?**

- Update the skill file
- Increment version number
- Notify team of changes

**Conflicts between skills?**

- More specific skill wins
- Update AGENTS.md priority order
- Consider merging or splitting skills

## Additional Resources

- **Main AGENTS.md**: `.claude/AGENTS.md` - Navigation and auto-invoke
- **CLAUDE.md**: Root `CLAUDE.md` - Extended documentation
- **Agent Skills Spec**: https://agentskills.io
- **Prowler Reference**: `prowler/` directory - Best practices example

---

## Quick Reference

### Skills by Use Case

**Creating Components**:

- `angular-component` - Standard/page/modal components
- `ionic-components` - Ionic-specific components
- `template-to-feature` - From design to code

**Working with Data**:

- `angular-http` - API integration
- `angular-state` - State management
- `angular-forms` - Form handling

**Authentication & Security**:

- `angular-guards` - Route protection

**Testing**:

- `angular-testing` - Unit tests
- `playwright-e2e` - E2E tests

**Mobile Development**:

- `ionic-components` - UI components
- `ionic-capacitor` - Native features

**Code Quality**:

- `typescript` - Type patterns
- `angular-performance` - Optimization
- `angular-error-handling` - Error patterns

**Workflow**:

- `git-commit` - Commits
- `git-pr` - Pull requests

---

**Version**: 1.0.0
**Last Updated**: January 2026
**Maintained by**: CiaVialDelLlano Team
**Questions?** Check `.claude/AGENTS.md` or create a new skill!
