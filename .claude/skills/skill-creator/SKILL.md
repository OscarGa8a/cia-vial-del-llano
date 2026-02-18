---
name: skill-creator
description: Create new AI agent skills following best practices and templates. Trigger: When creating new AI agent skills.
license: MIT
compatibility: opencode
metadata:
  author: skills-community
  version: "1.0.0"
  scope: [root]
  audience: developers
  auto_invoke:
    - "Creating new AI agent skills"
    - "Writing skill documentation"
allowed-tools: Read, Edit, Write, Glob, Grep
---

# Skill Creator - Create New Skills

## What I do

I provide templates and guidelines for creating new AI agent skills following best practices.

## Skill Template

```yaml
---
name: skill-name
description: >
  Brief description of what this skill does.
  Trigger: When to invoke this skill.
license: MIT
compatibility: opencode
metadata:
  author: author-name
  version: "1.0.0"
  scope: [root]  # or [root, feature-name]
  audience: developers
  framework: angular  # if applicable
  project: cia-vial-del-llano  # if project-specific
  auto_invoke:
    - "Action that triggers this skill"
    - "Another trigger action"
allowed-tools: Read, Edit, Write, Glob, Grep
---

# Skill Title

## What I do

2-3 sentences describing the skill's purpose.

## When to use me

Bullet list of scenarios when this skill should be used.

## Critical Patterns

### ALWAYS
- ✅ Pattern 1
- ✅ Pattern 2

### NEVER
- ❌ Anti-pattern 1
- ❌ Anti-pattern 2

## Pattern 1: Name

\`\`\`typescript
// Code example
\`\`\`

## Pattern 2: Name

\`\`\`typescript
// Code example
\`\`\`

## Decision Trees

\`\`\`
Question?
├─ Case A → Action A
└─ Case B → Action B
\`\`\`

## Commands

\`\`\`bash
# Relevant command 1
# Relevant command 2
\`\`\`

## Related Skills

- **Skill Name**: [skill-name](../skill-name/SKILL.md)

---

**Skill Version**: 1.0.0
**Last Updated**: Month Year
```

## Guidelines

1. Keep skills focused and specific
2. Use code examples from the actual project
3. Include decision trees for common choices
4. Link to related skills
5. Update AGENTS.md auto-invoke table after creating skill

## Related Skills

- **Sync Skills**: [skill-sync](../skill-sync/SKILL.md)

---

**Skill Version**: 1.0.0
**Last Updated**: January 2026
