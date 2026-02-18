---
name: git-pr
description: Pull request workflow, review guidelines, best practices. Trigger: When creating pull request or reviewing code.
license: MIT
compatibility: opencode
metadata:
  author: git-community
  version: "1.0.0"
  scope: [root]
  audience: developers
  auto_invoke:
    - "Creating pull request"
    - "Reviewing pull requests"
allowed-tools: Read, Edit, Write, Bash
---

# Git PR - Pull Request Workflow

## What I do

I provide patterns for creating and reviewing pull requests following best practices.

## When to use me

Use this skill when:

- Creating pull requests
- Reviewing code
- Writing PR descriptions

## Critical Patterns

### ALWAYS

- ✅ Run `pnpm lint && pnpm test` before PR
- ✅ Write clear PR description
- ✅ Link related issues
- ✅ Request reviews
- ✅ Keep PRs small (<500 lines)

### NEVER

- ❌ Create PRs with failing tests
- ❌ Skip PR description
- ❌ Merge without approval
- ❌ Force push after review

## Pattern 1: PR Template

```markdown
## Description

Brief description of changes

## Type of Change

- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing

- [ ] Unit tests pass
- [ ] E2E tests pass
- [ ] Manual testing completed

## Checklist

- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
```

## Commands

```bash
# Create PR with GitHub CLI
gh pr create --title "feat(matches): add filter by sport" --body "Description here"

# View PR
gh pr view

# Merge PR
gh pr merge --squash
```

## Related Skills

- **Commits**: [git-commit](../git-commit/SKILL.md)

---

**Skill Version**: 1.0.0
**Last Updated**: January 2026
