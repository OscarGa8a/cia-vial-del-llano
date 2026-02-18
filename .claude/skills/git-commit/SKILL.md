---
name: git-commit
description: Create industry-standard conventional commits with detailed bodies following CiaVialDelLlano conventions
license: MIT
compatibility: opencode
metadata:
  audience: developers
  workflow: git
  project: cia-vial-del-llano
  standard: conventional-commits-1.0.0
---

## What I do

I create professional Git commits following Conventional Commits 1.0.0 specification and CiaVialDelLlano's detailed commit style:

1. **Analyze all changes** using `git diff --staged` and `git status`
2. **Review recent commits** to match repository's style and tone
3. **Draft structured commit** with type, scope, subject, and detailed body
4. **Write comprehensive body** explaining what changed and why (following project's verbose style)
5. **Add footers** for breaking changes, references, co-authors, etc.
6. **Ensure atomicity** - one logical change per commit
7. **Verify quality** before committing

## When to use me

Use this skill when:

- User explicitly asks to commit changes ("commit this", "create a commit")
- Preparing to push changes to remote
- Ready to save a logical unit of work

**CRITICAL RULES**:

- ⛔ **NEVER commit proactively** - only when explicitly requested
- ⛔ **NEVER commit without user confirmation** of the message
- ⛔ **NEVER skip analysis** of what changed and why

## Conventional Commit structure

```
<type>[optional scope][optional !]: <description>

[optional body - RECOMMENDED for CiaVialDelLlano]

[optional footer(s)]
```

### Complete example from this project

```
feat: Enhance space and venue creation flows with reset functionality and improved navigation

Enhance space and venue creation flows with reset functionality and improved navigation:
- Improve owner page navigation:
  - Add tabClicked() method for explicit tab navigation
  - Update navigation to use navigateRoot for cleaner routing
  - Remove commented navigation code
- Enhance space list card component:
  - Remove editSpace() method (no longer needed)
  - Update viewSpace() to navigate to /owner/spaces/:id route
  - Inject NavController for navigation
- Improve space creation page:
  - Add initialFormValues constant for form reset functionality
  - Add reset() method to restore form to initial state and reset step to 1
  - Implement openOptionsVenues() method with action sheet UI
Technical improvements:
- Maintain ChangeDetectionStrategy.OnPush throughout components
- Follow Angular standalone component patterns
- Preserve existing functionality while adding new features
```

---

## Parts of a commit message

### 1. Type (REQUIRED)

Describes the kind of change. MUST be lowercase.

**Primary types** (trigger version bumps in SemVer):

- `feat` - New feature (→ MINOR version bump)
- `fix` - Bug fix (→ PATCH version bump)

**Supporting types** (no version bump unless BREAKING CHANGE):

- `refactor` - Code restructuring with no functional changes
- `perf` - Performance improvements
- `test` - Adding or updating tests
- `docs` - Documentation only changes
- `style` - Code style/formatting (no logic changes)
- `build` - Build system or dependencies
- `ci` - CI/CD configuration changes
- `chore` - Maintenance tasks (release prep, tooling)
- `revert` - Reverting previous commits

**When to use which**:

- Use `feat` when adding new user-facing functionality
- Use `fix` when correcting broken behavior
- Use `refactor` when improving code structure without changing behavior
- Use `perf` when improving performance measurably
- Use `docs` for README, comments, or documentation files
- Use `test` for test files only (no production code)
- Use `style` for formatting, linting, whitespace (no logic)
- Use `build` for package.json, webpack, build config
- Use `ci` for GitHub Actions, CircleCI, Jenkins config
- Use `chore` for miscellaneous tasks (release scripts, tooling)

### 2. Scope (OPTIONAL but RECOMMENDED)

A noun describing the section of codebase. Use kebab-case.

**CiaVialDelLlano scopes** by category:

**Features** (user-facing modules):

- `matches` - Match management
- `venues` - Venue management
- `spaces` - Space management
- `auth` - Authentication/authorization
- `profile` - User profile
- `wallet` - Player wallet
- `dashboard` - Owner dashboard
- `schedule` - Owner calendar
- `earnings` - Owner revenue
- `explore` - Venue/space exploration
- `home` - Player home feed

**Components**:

- `match-card`, `venue-form`, `space-list`, `location-picker`
- `player-card`, `quick-actions-match`, `hero-image-match`
- `filter-header`, `stats-card`, `upcoming-match-card`

**Services/Infrastructure**:

- `auth` - Authentication service
- `storage` - Storage service
- `api` - API client
- `geolocation` - Location services
- `routes` - Routing configuration
- `guards` - Route guards
- `interceptors` - HTTP interceptors
- `endpoints` - API endpoint definitions

**General**:

- `deps` - Dependencies (package.json)
- `build` - Build configuration
- `config` - App configuration
- `assets` - Images, icons, etc.

**Omit scope when**:

- Change affects entire project (e.g., `chore: update Angular to v21`)
- Multiple scopes are affected (mention in body instead)

### 3. Breaking Change Indicator (OPTIONAL)

Add `!` after type/scope to indicate breaking changes:

```
feat(api)!: change authentication endpoint structure
```

Or use both `!` and `BREAKING CHANGE:` footer for emphasis:

```
feat!: remove support for legacy auth tokens

BREAKING CHANGE: Auth tokens must now use JWT format. Legacy tokens are no longer supported.
```

### 4. Description/Subject (REQUIRED)

The subject line summarizes the change in ≤72 characters.

**Rules**:

- Use **imperative mood** ("add" not "added" or "adds")
- Lowercase first letter (except proper nouns)
- No period at the end
- Complete: "If applied, this commit will **\_**"
- Be specific but concise

**Good examples**:

```
add filter by sport type and date range
fix token refresh infinite loop in auth interceptor
refactor venue form to use reactive forms
remove deprecated legacy API endpoints
```

**Bad examples**:

```
Added filters                    // ❌ Past tense
Adds filtering feature.          // ❌ Wrong mood + period
Fix bugs                         // ❌ Too vague
Updated some files in matches    // ❌ Not imperative + vague
```

**Pro tips**:

- Start with a verb: add, remove, fix, update, refactor, extract, implement
- Be specific: "add email validation to signup form" > "improve validation"
- Mention what, not how: "cache venue data" > "add Map to store venues"

### 5. Body (OPTIONAL but STRONGLY RECOMMENDED for CiaVialDelLlano)

**CiaVialDelLlano style**: Detailed bodies explaining what, why, and how.

**When to include a body**:

- ✅ Changes affect multiple files/components
- ✅ Non-obvious implementation decisions
- ✅ Breaking changes or deprecations
- ✅ Complex refactorings
- ✅ Features with multiple sub-changes
- ❌ Simple one-line fixes or typos

**Body structure**:

```
<High-level summary paragraph (optional)>

<Grouped changes by area>:
- Component/Feature A changes:
  - Specific change 1
  - Specific change 2
  - Sub-detail with 2-space indent
- Component/Feature B changes:
  - Specific change 3

Technical improvements:
- Architectural pattern or standard followed
- Performance consideration
- Backwards compatibility note
```

**Formatting rules**:

- Start one blank line after subject
- Wrap lines at 72 characters
- Use bullet points (`-`) for lists
- Indent sub-items with 2 spaces
- Group related changes together
- Use colons after section headers

**Example body (matches project style)**:

```
feat(venues): add photo upload with camera integration

Implement photo upload module with Capacitor Camera integration:
- Create photo upload component:
  - Add camera button with native camera access
  - Display thumbnail previews of captured photos
  - Support multiple photo upload (up to 10)
  - Implement remove photo functionality
- Integrate with venue creation flow:
  - Add photo step to multi-step form
  - Prepare FormData for file upload
  - Handle upload progress and errors
- Add Capacitor Camera plugin:
  - Configure permissions for iOS and Android
  - Handle permission denied scenarios gracefully
  - Compress images before upload (max 2MB)
Technical improvements:
- Use Capacitor Camera for cross-platform support
- Implement FormData for multipart/form-data uploads
- Follow Angular standalone component patterns
- Maintain OnPush change detection strategy
```

**What to explain in the body**:

- **What changed**: Bullet list of modifications
- **Why changed**: Business/technical rationale
- **How changed**: Implementation approach (if non-obvious)
- **Impact**: Affected components, breaking changes, migration steps
- **Technical notes**: Patterns used, performance considerations

### 6. Footer(s) (OPTIONAL)

Metadata about the commit. Each footer is `Token: value` or `Token #value`.

**Breaking changes** (REQUIRED if breaking):

```
BREAKING CHANGE: Environment variables now take precedence over config files.
Migration: Update your config files to use the new format.
```

**Issue references**:

```
Fixes: #123
Closes: #456, #789
Refs: #321
Related-to: #654
See-also: #999
```

**Pull request references**:

```
PR-URL: https://github.com/org/repo/pull/123
```

**Co-authors** (pair/mob programming):

```
Co-authored-by: Jane Doe <jane@example.com>
Co-authored-by: John Smith <john@example.com>
```

**Reviewers**:

```
Reviewed-by: Tech Lead <lead@example.com>
Acked-by: Senior Dev <senior@example.com>
```

**Sign-offs** (DCO - Developer Certificate of Origin):

```
Signed-off-by: Developer Name <dev@example.com>
```

**Other metadata**:

```
Change-Id: I1234567890abcdef
Reported-by: User Name <user@example.com>
Tested-by: QA Name <qa@example.com>
```

---

## Commit workflow

When user asks to commit, follow these steps systematically:

### Step 1: Analyze current state (run in parallel)

```bash
git status              # See staged/unstaged files
git diff --staged       # See detailed staged changes
git diff --staged --stat # See summary of changes
git log -10 --oneline   # See recent commit style
git log --format="%s%n%b" -3 # See recent bodies for style matching
```

**What to look for**:

- Which files changed (components, services, config, tests)
- Nature of changes (new feature, bug fix, refactor, docs)
- Scope of changes (single component vs multiple areas)
- Recent commit message style (detailed vs concise bodies)

### Step 2: Classify and scope the changes

**Determine type**:

- New functionality → `feat`
- Fixing broken behavior → `fix`
- Restructuring code → `refactor`
- Speed/memory improvements → `perf`
- Adding/updating tests → `test`
- Documentation → `docs`
- Formatting/style → `style`
- Dependencies/build → `build` or `chore`

**Determine scope**:

- Look at primary files changed
- Identify the feature/component most affected
- If multiple scopes, consider splitting commits OR omit scope

**Check for issues**:

- ❌ Sensitive files (.env, credentials.json, API keys)
- ❌ Unrelated changes mixed together
- ❌ Debug code (console.log, debugger)
- ❌ Commented-out code blocks
- ❌ Large binary files

### Step 3: Draft commit message

**Subject line**:

1. Choose type + scope: `feat(matches):`
2. Write imperative verb: `add`, `fix`, `remove`, `update`
3. Describe what: `add filter by sport type`
4. Keep under 72 chars: `feat(matches): add filter by sport type and date`

**Body** (if changes are non-trivial):

1. Start with high-level summary (optional)
2. Group changes by component/area
3. Use bullet points with indentation
4. Add "Technical improvements:" section
5. Match the verbosity of recent commits in the repo

**Footers** (if applicable):

1. Add `BREAKING CHANGE:` if breaking
2. Reference issues: `Fixes: #123`
3. Add co-authors if pair programming

### Step 4: Present message to user for approval

**CRITICAL**: Always show the full commit message and ask for confirmation.

**Example**:

```
I've analyzed the changes and drafted this commit message:

---
feat(matches): add filter by sport type and date range

Implement filtering functionality for match list:
- Add filter component with sport type dropdown
- Add date range picker using Ionic datetime
- Implement filter logic in match service
- Update match list to react to filter changes
- Add clear filters button

Technical improvements:
- Use Angular Signals for reactive filter state
- Maintain OnPush change detection strategy
---

Does this look good, or would you like me to adjust anything?
```

**Wait for user response** before proceeding.

### Step 5: Execute commit

```bash
# If files need staging
git add <specific-files>

# Create commit with message (use git commit -m for subject only)
# For multi-line, use git commit (opens editor) or heredoc
git commit -m "type(scope): subject" -m "body paragraph 1" -m "body paragraph 2"

# Verify success
git log -1 --format="%H%n%s%n%b"
git status
```

**If commit fails**:

1. Read error message carefully
2. Fix the issue (linting, tests, hooks)
3. Create a NEW commit (don't amend unless explicitly asked)
4. Never use `--no-verify` unless user explicitly requests it

### Step 6: Confirm and offer next steps

```
✅ Committed successfully!

Commit hash: a1b2c3d
Message: feat(matches): add filter by sport type and date range

Would you like me to:
1. Push this to remote?
2. Create another commit?
3. View the full diff?
```

---

## Commit message examples

### Simple feature (no body needed)

```
feat(auth): add forgot password link to login page
```

### Bug fix with explanation

```
fix(auth): resolve token refresh infinite loop

The token refresh interceptor was creating an infinite loop when the
refresh token itself expired. Added check to prevent refreshing already
refreshed requests.

Fixes: #456
```

### Feature with detailed body (CiaVialDelLlano style)

```
feat: Implement space creation flow with multi-step form

Implement space creation flow with comprehensive sport type support:
- Create multi-step form component:
  - Step 1: Basic information (name, sport type, capacity)
  - Step 2: Pricing and availability
  - Step 3: Amenities and features
  - Add navigation between steps with validation
- Add sport type selector:
  - Support all major sports (football, basketball, tennis, etc.)
  - Dynamic amenity options based on sport type
  - Custom sport type input option
- Integrate with venue selection:
  - Query param support for pre-selected venue
  - Venue dropdown with search functionality
  - Navigate to venue creation if no venues exist
- Add photo upload:
  - Support multiple photos (up to 10)
  - Image compression before upload
  - Preview and remove functionality
Technical improvements:
- Use Angular Signals for form state management
- Implement OnPush change detection throughout
- Follow standalone component patterns
- Prepare FormData for multipart/form-data uploads
- Validate each step before allowing navigation

Refs: #234
```

### Refactoring

```
refactor(venues): extract venue form to separate component

Extract venue form logic to improve maintainability and reusability:
- Create VenueFormComponent with all form logic
- Move validation rules to form component
- Extract constants for form field configurations
- Update venue creation page to use new component
- Update venue edit modal to use new component

No functional changes - pure refactoring.
```

### Breaking change

```
feat(api)!: migrate to v2 authentication endpoints

Migrate authentication to new v2 API endpoints with JWT support:
- Update login endpoint: /api/v1/auth/login → /api/v2/auth/login
- Update register endpoint: /api/v1/auth/register → /api/v2/auth/register
- Update token refresh to use JWT rotation
- Add new auth interceptor for v2 API
- Remove legacy token format support

BREAKING CHANGE: Legacy authentication tokens are no longer supported.
All users will be logged out and must sign in again. The auth endpoints
now require JWT format tokens and use the /api/v2/auth namespace.

Migration guide:
1. Update all API calls to use /api/v2/auth
2. Clear local storage to remove legacy tokens
3. Update auth interceptor to handle JWT format

Closes: #789
```

### Performance improvement

```
perf(explore): implement virtual scrolling for venue list

Replace standard list rendering with virtual scrolling:
- Add @angular/cdk VirtualScrollModule
- Configure viewport with 80vh height
- Set item size to 120px based on venue card height
- Implement trackBy function for optimal rendering

Results: Rendering time reduced from 850ms to 45ms for 1000 venues.
Memory usage reduced by 70% on large lists.

Closes: #567
```

### Multiple scopes (omit scope from subject)

```
feat: add venue and space photo management

Implement photo upload functionality across venue and space modules:
- Venue photo upload:
  - Add photo upload component to venue creation flow
  - Support up to 15 photos per venue
  - Implement drag-and-drop reordering
- Space photo upload:
  - Add photo upload component to space creation flow
  - Support up to 10 photos per space
  - Inherit venue photos as defaults (optional)
- Shared photo component:
  - Create reusable photo upload component
  - Implement Capacitor Camera integration
  - Add image compression (max 2MB per image)
  - Handle iOS and Android permissions
Technical improvements:
- Extract shared logic to PhotoUploadService
- Use FormData for multipart uploads
- Implement loading states and error handling
- Follow Angular standalone component patterns
```

### Revert

```
revert: let us never speak of the noodle incident

This reverts commits 676104e and a215868.

The experimental navigation changes caused infinite loops in production.
Reverting to stable navigation implementation while we investigate.

Refs: 676104e, a215868
Related-to: #890
```

### Chore (dependency update)

```
chore(deps): update Angular from v21.0.6 to v21.1.0

Update Angular core and related packages:
- @angular/core: 21.0.6 → 21.1.0
- @angular/common: 21.0.6 → 21.1.0
- @angular/compiler: 21.0.6 → 21.1.0
- @angular/cli: 21.0.6 → 21.1.0

No breaking changes. Includes performance improvements for change detection.

Release notes: https://github.com/angular/angular/releases/tag/21.1.0
```

---

## Decision tree for commit types

Use this to decide the correct type:

```
Does it add new user-facing functionality?
  YES → feat
  NO ↓

Does it fix broken behavior?
  YES → fix
  NO ↓

Does it improve performance measurably?
  YES → perf
  NO ↓

Does it restructure code without changing behavior?
  YES → refactor
  NO ↓

Does it add/update tests only?
  YES → test
  NO ↓

Does it change documentation only?
  YES → docs
  NO ↓

Does it change formatting/style only (no logic)?
  YES → style
  NO ↓

Does it update dependencies or build config?
  YES → build or chore
  NO ↓

Does it update CI/CD configuration?
  YES → ci
  NO → chore (catchall for maintenance)
```

---

## Special cases and edge cases

### Multiple unrelated changes

**Problem**: Staged changes include both auth fixes AND UI updates.

**Solution**: Suggest splitting commits.

```
I see you have both authentication fixes and UI styling updates staged.
These are unrelated changes. Would you like me to:
1. Create separate commits for each (recommended)
2. Commit together with a generic message (not recommended)
```

If user chooses split:

```bash
# Unstage all
git reset

# Commit auth changes
git add src/app/core/services/auth.ts
git commit -m "fix(auth): resolve token refresh infinite loop"

# Commit UI changes
git add src/app/shared/components/button/
git commit -m "style(button): update primary button styling"
```

### Work-in-progress commits

**Problem**: User wants to save work but it's incomplete.

**Solution**: Use WIP prefix (to be squashed later).

```
WIP: working on match filter implementation

Partial implementation of filter functionality. Not ready for production.

TODO:
- Complete date range filtering
- Add tests
- Update documentation
```

### Merge commits

**Problem**: Merging a branch.

**Solution**: Let git handle the message, but customize if needed.

```bash
# Default merge commit (usually fine)
git merge feature/match-filters

# Custom merge commit message
git merge feature/match-filters -m "Merge feature/match-filters into main" -m "Adds match filtering by sport type and date range. Closes #123."
```

### Hotfix commits

**Problem**: Critical production bug needs immediate fix.

**Solution**: Use `fix` type with high priority indicators in body.

```
fix(auth)!: patch critical JWT validation vulnerability

CRITICAL: Fixes security vulnerability in JWT token validation that
allowed expired tokens to be accepted.

Impact: All users must re-authenticate after this deployment.

BREAKING CHANGE: JWT validation is now stricter. Tokens with expired
`exp` claims will be rejected immediately.

Security-Advisory: CVE-2024-XXXXX
Severity: High
Fixes: #999
```

### Squashing commits

**Problem**: Feature branch has many small commits to squash.

**Solution**: Use interactive rebase and write detailed squashed message.

```bash
# Squash last 5 commits
git rebase -i HEAD~5

# In editor, change 'pick' to 'squash' for commits to squash
# Write new comprehensive message following conventions
```

Final squashed message:

```
feat(matches): implement match filtering and sorting

Implement comprehensive filtering and sorting for match lists:
- Add filter by sport type (dropdown selector)
- Add filter by date range (date picker)
- Add filter by location (radius search)
- Add sort options (date, price, distance)
- Persist filter preferences to local storage
- Add clear all filters button
Technical improvements:
- Use Angular Signals for reactive filter state
- Debounce filter inputs (300ms) for performance
- Implement virtual scrolling for large result sets
- Add loading states during filtering

Squashed from commits:
- Add sport type filter
- Add date range picker
- Implement location filtering
- Add sort dropdown
- Persist filters
- Refactor filter logic
- Add tests

Closes: #456
```

---

## Quality checklist

Before committing, verify:

**Subject line**:

- [ ] ≤72 characters
- [ ] Type is correct and lowercase
- [ ] Scope is appropriate (or omitted if multi-scope)
- [ ] Imperative mood ("add" not "added")
- [ ] Lowercase (except proper nouns)
- [ ] No period at end
- [ ] Describes what will happen if applied

**Body** (if present):

- [ ] Blank line after subject
- [ ] Lines wrapped at 72 characters
- [ ] Explains what changed
- [ ] Explains why changed (rationale)
- [ ] Matches verbosity of recent commits
- [ ] Uses bullet points for lists
- [ ] Groups related changes
- [ ] Includes "Technical improvements:" if applicable

**Footers** (if applicable):

- [ ] BREAKING CHANGE explained if breaking
- [ ] Issues referenced (Fixes/Closes)
- [ ] Co-authors credited

**Content**:

- [ ] No sensitive data (.env, keys, tokens)
- [ ] No debug code (console.log unless intentional)
- [ ] No commented-out code blocks
- [ ] Changes are atomic (one logical change)
- [ ] Tests pass (if applicable)
- [ ] Linting passes

**Safety**:

- [ ] User explicitly requested commit
- [ ] User confirmed commit message
- [ ] No hooks skipped (unless explicitly requested)

---

## Git safety protocol

### NEVER do these:

- ⛔ Update git config without permission
- ⛔ Run destructive commands (force push, hard reset, `git clean -fdx`)
- ⛔ Skip hooks with `--no-verify` (unless explicitly requested)
- ⛔ Amend commits that have been pushed to remote
- ⛔ Commit without user explicitly requesting it
- ⛔ Commit without showing message and getting approval
- ⛔ Commit when changes should be logically split
- ⛔ Commit sensitive files (.env, credentials, private keys)
- ⛔ Push automatically without user confirmation

### ALWAYS do these:

- ✅ Check `git status` and `git diff --staged` before committing
- ✅ Review recent commits (`git log`) to match style
- ✅ Show draft message and wait for user approval
- ✅ Use imperative mood in subject
- ✅ Wrap body at 72 characters
- ✅ Verify commit success with `git log -1`
- ✅ Ask for clarification if changes are unclear or mixed
- ✅ Suggest splitting commits if multiple unrelated changes
- ✅ Group related changes together in one commit
- ✅ Focus on the "why" in body, not just "what"

---

## After committing

1. **Confirm success**:

   ```
   ✅ Committed successfully!
   Commit: a1b2c3d
   Message: feat(matches): add filter by sport type and date range
   ```

2. **Show commit details**:

   ```bash
   git log -1 --stat
   ```

3. **Ask about next steps**:

   ```
   Would you like me to:
   - Push to remote? (/push)
   - Create another commit?
   - View the full diff? (git show)
   - Amend the commit? (if needed)
   ```

4. **NEVER push automatically** unless user explicitly says "commit and push"

---

## Example interactions

### Interaction 1: Simple commit

```
User: "Commit these changes"

Agent: Let me analyze the current changes...
[Runs: git status, git diff --staged, git log -5 --oneline]

I see you've fixed a bug in the auth interceptor where token refresh
was causing an infinite loop. Here's the commit message I drafted:

---
fix(auth): resolve token refresh infinite loop

The token refresh interceptor was calling itself recursively when the
refresh token expired. Added check to prevent refreshing requests that
are already refresh attempts.

Fixes: #456
---

Does this look good?

User: "Yes, commit it"

Agent: [Executes commit]
✅ Committed successfully!
Commit: 7f8e9a2
Message: fix(auth): resolve token refresh infinite loop

Would you like me to push this to remote?
```

### Interaction 2: Complex feature needing detailed body

```
User: "Commit the match filter changes"

Agent: Let me analyze the changes...
[Runs: git status, git diff --staged --stat, git log --format="%s%n%b" -3]

I see you've implemented a comprehensive filtering system across multiple
components. Looking at recent commits, I see the project uses detailed
bodies explaining changes by component. Here's my draft:

---
feat(matches): implement filtering and sorting system

Implement comprehensive filtering and sorting for match lists:
- Add filter component:
  - Sport type dropdown with all supported sports
  - Date range picker with preset options (today, week, month)
  - Location radius filter with map preview
  - Price range slider (min/max)
- Integrate with match list:
  - Update MatchService to handle filter parameters
  - Add API endpoint for filtered results
  - Implement client-side caching of filter results
  - Add empty state when no matches found
- Add sort functionality:
  - Sort by date (earliest/latest)
  - Sort by price (low/high)
  - Sort by distance (nearest first)
  - Persist sort preference to local storage
- Add filter persistence:
  - Save active filters to Capacitor Preferences
  - Restore filters on page load
  - Add clear all filters button
Technical improvements:
- Use Angular Signals for reactive filter state
- Debounce filter inputs (300ms) to reduce API calls
- Implement virtual scrolling for performance with large result sets
- Follow OnPush change detection strategy
- Maintain standalone component patterns

Closes: #234
---

This matches the detailed style of recent commits. Would you like me to
adjust anything?

User: "Looks perfect, go ahead"

Agent: [Executes commit]
✅ Committed successfully!
Commit: 3a4b5c6
Message: feat(matches): implement filtering and sorting system
[Shows full message]

Would you like me to push this to remote?
```

### Interaction 3: Suggesting commit split

```
User: "Commit everything"

Agent: Let me check what's staged...
[Runs: git status, git diff --staged --stat]

I see you have both:
- Authentication bug fixes (auth.ts, auth.interceptor.ts)
- UI styling updates (button.component.scss, card.component.scss)

These are unrelated changes. I recommend creating separate commits:
1. fix(auth): [auth changes]
2. style(button): [UI changes]

This makes the git history clearer and easier to revert if needed.

Would you like me to:
A) Create separate commits (recommended)
B) Commit everything together (not recommended)

User: "A, please"

Agent: Great! Let me create separate commits.

[Unstages all, then stages and commits auth files]
✅ First commit created:
Commit: 9f8e7d6
Message: fix(auth): resolve token refresh infinite loop

[Stages and commits UI files]
✅ Second commit created:
Commit: 6d5c4b3
Message: style: update button and card component styling

Both commits created successfully! Would you like me to push these?
```

---

## Resources and references

- [Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/)
- [Angular Commit Guidelines](https://github.com/angular/angular/blob/main/CONTRIBUTING.md#commit)
- [Semantic Versioning](https://semver.org/)
- [Git Commit Best Practices](https://www.conventionalcommits.org/en/v1.0.0/#summary)
- [How to Write a Git Commit Message](https://cbea.ms/git-commit/)

---

## Project-specific notes

**CiaVialDelLlano commit style**:

- ✅ Prefers detailed bodies explaining changes by component
- ✅ Uses "Technical improvements:" section consistently
- ✅ Groups related changes with bullet points and indentation
- ✅ Often includes implementation details (not just what changed)
- ✅ References pull requests and issues
- ✅ Maintains consistent formatting across commits

**Match this style** by writing verbose bodies that explain not just what changed,
but also how and why, grouped by component/feature area.
