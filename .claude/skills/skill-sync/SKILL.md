---
name: skill-sync
description: Sync skill metadata to AGENTS.md auto-invoke sections automatically. Trigger: When updating auto-invoke tables or syncing skill metadata.
license: MIT
compatibility: opencode
metadata:
  author: skills-community
  version: "1.0.0"
  scope: [root]
  audience: developers
  auto_invoke:
    - "Updating auto-invoke tables"
    - "Syncing skill metadata"
allowed-tools: Read, Edit, Write, Glob, Grep, Bash
---

# Skill Sync - Auto-Sync AGENTS.md

## What I do

I provide automation to sync skill metadata (auto_invoke triggers) to AGENTS.md files automatically.

## How It Works

1. Read all SKILL.md files in `.claude/skills/`
2. Extract `metadata.auto_invoke` from each
3. Extract `metadata.scope` to determine which AGENTS.md to update
4. Generate auto-invoke tables
5. Update AGENTS.md files

## Manual Sync Process

Until automation script is created, manually:

1. When creating a new skill, add its auto_invoke triggers to `.claude/AGENTS.md`
2. Add entry to "Available Skills" table
3. Add entries to "Auto-invoke Skills" table

## Future Automation

```bash
# Planned script
.claude/sync-skills.sh

# Will automatically:
# - Scan all skills
# - Extract metadata
# - Update all AGENTS.md files
# - Validate links
```

## Related Skills

- **Create Skills**: [skill-creator](../skill-creator/SKILL.md)

---

**Skill Version**: 1.0.0
**Last Updated**: January 2026
