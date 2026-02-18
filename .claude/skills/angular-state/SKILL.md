---
name: angular-state
description: Angular signal-based state management patterns. Trigger: When implementing signal-based state or creating global state services.
license: MIT
compatibility: opencode
metadata:
  author: angular-community
  version: "1.0.0"
  scope: [root]
  audience: developers
  framework: angular
  auto_invoke:
    - "Implementing signal-based state"
    - "Creating global state services"
    - "Working with Angular signals"
allowed-tools: Read, Edit, Write, Glob, Grep
---

# Angular State - Signal-Based State Management

## What I do

I provide patterns for managing state in Angular 21+ using signals, replacing BehaviorSubjects and RxJS-based state management.

## When to use me

Use this skill when:

- Creating global state services
- Managing component state with signals
- Implementing derived state with computed()
- Creating side effects with effect()
- Migrating from BehaviorSubject to signals

## Critical Patterns

### ALWAYS

- ✅ Use `signal()` for writable state
- ✅ Use `.asReadonly()` for public API
- ✅ Use `computed()` for derived state
- ✅ Use `effect()` for side effects
- ✅ Update signals immutably with `.update()`

### NEVER

- ❌ Use BehaviorSubject for new code
- ❌ Mutate signal values directly
- ❌ Create side effects in computed()
- ❌ Use signals without .asReadonly() in public API

## Pattern 1: Global State Service

```typescript
// core/services/auth-state.ts
import { Injectable, signal, computed, effect } from '@angular/core';
import { User, AuthTokens, AuthState } from '@core/models';
import { StorageService } from './storage';

@Injectable({
  providedIn: 'root',
})
export class AuthStateService {
  private readonly storage = inject(StorageService);

  // Private writable signals
  private readonly _user = signal<User | null>(null);
  private readonly _tokens = signal<AuthTokens | null>(null);
  private readonly _isLoading = signal<boolean>(true);

  // Public read-only signals
  readonly user = this._user.asReadonly();
  readonly tokens = this._tokens.asReadonly();
  readonly isLoading = this._isLoading.asReadonly();

  // Computed signals (derived state)
  readonly isAuthenticated = computed(() => this._user() !== null && this._tokens() !== null);

  readonly accessToken = computed(() => this._tokens()?.access ?? null);
  readonly refreshToken = computed(() => this._tokens()?.refresh ?? null);

  readonly state = computed<AuthState>(() => ({
    user: this._user(),
    tokens: this._tokens(),
    isAuthenticated: this.isAuthenticated(),
    isLoading: this._isLoading(),
  }));

  constructor() {
    // Effect: Auto-persist tokens to storage
    effect(() => {
      const tokens = this._tokens();
      if (tokens) {
        this.storage.setTokens(tokens);
      }
    });

    // Effect: Auto-persist user to storage
    effect(() => {
      const user = this._user();
      if (user) {
        this.storage.setUser(user);
      }
    });

    // Initialize from storage
    this.initialize();
  }

  /**
   * Initialize state from storage on app start
   */
  private async initialize() {
    try {
      const [user, tokens] = await Promise.all([this.storage.getUser(), this.storage.getTokens()]);

      if (user) this._user.set(user);
      if (tokens) this._tokens.set(tokens);
    } finally {
      this._isLoading.set(false);
    }
  }

  /**
   * Set authentication state (after login)
   */
  setAuth(user: User, tokens: AuthTokens) {
    this._user.set(user);
    this._tokens.set(tokens);
  }

  /**
   * Update tokens (after refresh)
   */
  setTokens(tokens: AuthTokens) {
    this._tokens.set(tokens);
  }

  /**
   * Update user (after profile edit)
   */
  updateUser(user: User) {
    this._user.set(user);
  }

  /**
   * Clear authentication state (logout)
   */
  clearAuth() {
    this._user.set(null);
    this._tokens.set(null);
    this.storage.clearAuth();
  }
}
```

## Pattern 2: Component Local State

```typescript
// features/venues/pages/venue-list/venue-list.page.ts
import { Component, signal, computed } from '@angular/core';
import { Venue } from '../../models';

@Component({
  selector: 'app-venue-list',
  // ...
})
export class VenueListPage {
  // Local state signals
  protected readonly searchQuery = signal<string>('');
  protected readonly selectedFilter = signal<string>('all');
  protected readonly venues = signal<Venue[]>([]);
  protected readonly isLoading = signal<boolean>(false);

  // Computed state
  protected readonly filteredVenues = computed(() => {
    const query = this.searchQuery().toLowerCase();
    const filter = this.selectedFilter();
    let results = this.venues();

    // Filter by search query
    if (query) {
      results = results.filter((v) => v.name.toLowerCase().includes(query));
    }

    // Filter by category
    if (filter !== 'all') {
      results = results.filter((v) => v.category === filter);
    }

    return results;
  });

  protected readonly venueCount = computed(() => this.filteredVenues().length);

  protected readonly showEmptyState = computed(() => this.venueCount() === 0 && !this.isLoading());

  // Methods to update state
  onSearchChange(query: string) {
    this.searchQuery.set(query);
  }

  onFilterChange(filter: string) {
    this.selectedFilter.set(filter);
  }

  async loadVenues() {
    this.isLoading.set(true);
    try {
      const data = await this.venueService.getVenues();
      this.venues.set(data);
    } finally {
      this.isLoading.set(false);
    }
  }
}
```

## Pattern 3: Signal with Complex Updates

```typescript
// features/matches/services/match-state.ts
import { Injectable, signal } from '@angular/core';
import { Match } from '../models';

@Injectable({
  providedIn: 'root',
})
export class MatchStateService {
  private readonly _matches = signal<Match[]>([]);
  readonly matches = this._matches.asReadonly();

  // Add match
  addMatch(match: Match) {
    this._matches.update((matches) => [...matches, match]);
  }

  // Update match (immutable)
  updateMatch(id: string, updates: Partial<Match>) {
    this._matches.update((matches) => matches.map((m) => (m.id === id ? { ...m, ...updates } : m)));
  }

  // Remove match
  removeMatch(id: string) {
    this._matches.update((matches) => matches.filter((m) => m.id !== id));
  }

  // Replace all matches
  setMatches(matches: Match[]) {
    this._matches.set(matches);
  }

  // Clear matches
  clearMatches() {
    this._matches.set([]);
  }
}
```

## Pattern 4: Effect for Side Effects

```typescript
import { Component, signal, effect } from '@angular/core';

@Component({
  selector: 'app-settings',
  // ...
})
export class SettingsComponent {
  protected readonly darkMode = signal<boolean>(false);

  constructor() {
    // Effect: Update document class when darkMode changes
    effect(() => {
      if (this.darkMode()) {
        document.body.classList.add('dark');
      } else {
        document.body.classList.remove('dark');
      }
    });

    // Effect: Save to localStorage
    effect(() => {
      localStorage.setItem('darkMode', JSON.stringify(this.darkMode()));
    });

    // Initialize from localStorage
    const saved = localStorage.getItem('darkMode');
    if (saved) {
      this.darkMode.set(JSON.parse(saved));
    }
  }

  toggleDarkMode() {
    this.darkMode.update((current) => !current);
  }
}
```

## Pattern 5: Signal Inputs (Angular 17.1+)

```typescript
import { Component, input, computed } from '@angular/core';

@Component({
  selector: 'app-venue-card',
  // ...
})
export class VenueCardComponent {
  // Signal inputs
  venue = input.required<Venue>();
  showDetails = input<boolean>(false);

  // Computed from inputs
  protected readonly displayName = computed(() => {
    const venue = this.venue();
    return `${venue.name} (${venue.city})`;
  });

  protected readonly cardClasses = computed(() => ({
    'show-details': this.showDetails(),
    featured: this.venue().isFeatured,
  }));
}
```

## Decision Trees

### Signal vs Observable?

```
New code? → Use signals
Need RxJS operators (debounce, switchMap)? → Keep Observable, convert with toSignal()
HTTP calls? → Use httpResource() or Observable
User interaction state? → Use signals
```

### When to use effect()?

```
DOM manipulation? → Use effect()
LocalStorage sync? → Use effect()
Logging/analytics? → Use effect()
API calls? → DON'T use effect(), use explicit methods
```

## Migration from BehaviorSubject

```typescript
// ❌ OLD (BehaviorSubject)
private matchesSubject = new BehaviorSubject<Match[]>([]);
public matches$ = this.matchesSubject.asObservable();

addMatch(match: Match) {
  this.matchesSubject.next([...this.matchesSubject.value, match]);
}

// ✅ NEW (Signals)
private _matches = signal<Match[]>([]);
readonly matches = this._matches.asReadonly();

addMatch(match: Match) {
  this._matches.update(matches => [...matches, match]);
}
```

## Related Skills

- **Components**: [angular-component](../angular-component/SKILL.md)
- **HTTP**: [angular-http](../angular-http/SKILL.md)
- **Testing**: [angular-testing](../angular-testing/SKILL.md)

---

**Skill Version**: 1.0.0
**Last Updated**: January 2026
