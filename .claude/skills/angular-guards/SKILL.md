---
name: angular-guards
description: Angular route guards, navigation protection, auth guards. Trigger: When creating or modifying route guards, implementing auth protection.
license: MIT
compatibility: opencode
metadata:
  author: angular-community
  version: '1.0.0'
  scope: [root]
  audience: developers
  framework: angular
  auto_invoke:
    - 'Creating or modifying route guards'
    - 'Implementing role-based route protection'
    - 'Working with navigation guards'
allowed-tools: Read, Edit, Write, Glob, Grep
---

# Angular Guards - Route Protection

## What I do

I provide patterns for creating route guards in Angular 21+ using functional guards (CanActivateFn) for authentication, authorization, and navigation protection.

## When to use me

Use this skill when:

- Creating authentication guards
- Implementing role-based access control
- Protecting routes from unauthorized access
- Implementing navigation guards (CanDeactivate)
- Redirecting users based on auth state

## Critical Patterns

### ALWAYS

- ✅ Use functional guards (`CanActivateFn`) instead of class-based
- ✅ Use `inject()` for dependency injection in guards
- ✅ Return boolean, UrlTree, or Observable/Promise of these
- ✅ Redirect with `Router.createUrlTree()` instead of `navigate()`
- ✅ Check auth state from centralized service (e.g., AuthStateService)

### NEVER

- ❌ Use class-based guards (deprecated in Angular 15+)
- ❌ Call `router.navigate()` in guard (use UrlTree)
- ❌ Perform async operations without returning Promise/Observable
- ❌ Trust frontend-only validation (backend must also validate)

## Pattern 1: Auth Guard (Simple)

```typescript
// core/guards/auth.guard.ts
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthStateService } from '@core/services/auth-state';

/**
 * Protects routes requiring authentication
 * Redirects to /auth/login if not authenticated
 */
export const authGuard: CanActivateFn = (route, state) => {
  const authState = inject(AuthStateService);
  const router = inject(Router);

  if (authState.isAuthenticated()) {
    return true; // Allow navigation
  }

  // Redirect to login, preserving intended URL
  return router.createUrlTree(['/auth/login'], {
    queryParams: { returnUrl: state.url },
  });
};
```

## Pattern 2: Role-Based Guard

```typescript
// core/guards/player.guard.ts
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthStateService } from '@core/services/auth-state';
import { UserRole } from '@core/models';

/**
 * Protects player-only routes
 * Allows: PLAYER role
 * Redirects: OWNER/ADMIN → /owner/dashboard, Unauthenticated → /auth/login
 */
export const playerGuard: CanActivateFn = (route, state) => {
  const authState = inject(AuthStateService);
  const router = inject(Router);

  // Not authenticated
  if (!authState.isAuthenticated()) {
    return router.createUrlTree(['/auth/login'], {
      queryParams: { returnUrl: state.url },
    });
  }

  const user = authState.user();

  // Check role
  if (user?.role === UserRole.PLAYER) {
    return true;
  }

  // Wrong role - redirect to their dashboard
  if (user?.role === UserRole.OWNER || user?.role === UserRole.ADMIN) {
    return router.createUrlTree(['/owner/dashboard']);
  }

  // Fallback
  return router.createUrlTree(['/auth/login']);
};
```

## Pattern 3: Guest Guard (Opposite of Auth Guard)

```typescript
// core/guards/guest.guard.ts
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthStateService } from '@core/services/auth-state';
import { UserRole } from '@core/models';

/**
 * Protects guest-only routes (login, register)
 * Redirects authenticated users to their dashboard
 */
export const guestGuard: CanActivateFn = () => {
  const authState = inject(AuthStateService);
  const router = inject(Router);

  if (!authState.isAuthenticated()) {
    return true; // Allow guests
  }

  const user = authState.user();

  // Redirect to appropriate dashboard based on role
  if (user?.role === UserRole.PLAYER) {
    return router.createUrlTree(['/player/home']);
  }

  if (user?.role === UserRole.OWNER || user?.role === UserRole.ADMIN) {
    return router.createUrlTree(['/owner/dashboard']);
  }

  return true;
};
```

## Pattern 4: CanDeactivate Guard (Unsaved Changes)

```typescript
// core/guards/unsaved-changes.guard.ts
import { CanDeactivateFn } from '@angular/router';

export interface CanComponentDeactivate {
  canDeactivate: () => boolean | Promise<boolean>;
}

/**
 * Prevents navigation away from forms with unsaved changes
 */
export const unsavedChangesGuard: CanDeactivateFn<CanComponentDeactivate> = (component) => {
  return component.canDeactivate ? component.canDeactivate() : true;
};

// Component implementation
@Component({
  /* ... */
})
export class VenueFormComponent implements CanComponentDeactivate {
  protected readonly form = this.fb.group({
    /* ... */
  });

  canDeactivate(): boolean {
    if (this.form.dirty) {
      return confirm('You have unsaved changes. Do you really want to leave?');
    }
    return true;
  }
}
```

## Pattern 5: Async Guard with Observable

```typescript
// core/guards/feature-flag.guard.ts
import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { map } from 'rxjs/operators';
import { FeatureFlagService } from '@core/services/feature-flag';

/**
 * Checks if feature flag is enabled before allowing access
 */
export const featureFlagGuard = (flagName: string): CanActivateFn => {
  return () => {
    const featureFlags = inject(FeatureFlagService);

    return featureFlags.isEnabled$(flagName).pipe(map((enabled) => (enabled ? true : false)));
  };
};
```

## Pattern 6: Applying Guards to Routes

```typescript
// app.routes.ts
import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { playerGuard } from './core/guards/player.guard';
import { ownerGuard } from './core/guards/owner.guard';
import { guestGuard } from './core/guards/guest.guard';

export const routes: Routes = [
  // Public routes (no guard)
  { path: '', redirectTo: '/start/splash', pathMatch: 'full' },
  { path: 'start', loadChildren: () => import('./features/start/start.routes') },

  // Guest routes (guest guard)
  {
    path: 'auth',
    canActivate: [guestGuard],
    loadChildren: () => import('./features/auth/auth.routes'),
  },

  // Player routes (player guard)
  {
    path: 'player',
    canActivate: [playerGuard],
    loadChildren: () => import('./features/player/player.routes'),
  },

  // Owner routes (owner guard)
  {
    path: 'owner',
    canActivate: [ownerGuard],
    loadChildren: () => import('./features/owner/owner.routes'),
  },
];
```

## Decision Trees

### Which guard to use?

```
Need authentication check? → authGuard
Need role-based access? → playerGuard, ownerGuard, adminGuard
Want to block authenticated users? → guestGuard
Prevent navigation with unsaved changes? → unsavedChangesGuard (CanDeactivate)
Check feature flags? → featureFlagGuard
```

### Return value from guard?

```
Allow navigation? → return true
Block navigation? → return false
Redirect? → return router.createUrlTree(['/path'])
Async check? → return Observable<boolean | UrlTree>
```

## Testing Guards

```typescript
// auth.guard.spec.ts
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { authGuard } from './auth.guard';
import { AuthStateService } from '@core/services/auth-state';

describe('authGuard', () => {
  let authState: jasmine.SpyObj<AuthStateService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const authStateSpy = jasmine.createSpyObj('AuthStateService', ['isAuthenticated']);
    const routerSpy = jasmine.createSpyObj('Router', ['createUrlTree']);

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthStateService, useValue: authStateSpy },
        { provide: Router, useValue: routerSpy },
      ],
    });

    authState = TestBed.inject(AuthStateService) as jasmine.SpyObj<AuthStateService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should allow navigation when authenticated', () => {
    authState.isAuthenticated.and.returnValue(true);

    const result = TestBed.runInInjectionContext(() =>
      authGuard({} as any, { url: '/player/home' } as any),
    );

    expect(result).toBe(true);
  });

  it('should redirect to login when not authenticated', () => {
    authState.isAuthenticated.and.returnValue(false);
    router.createUrlTree.and.returnValue({} as any);

    TestBed.runInInjectionContext(() => authGuard({} as any, { url: '/player/home' } as any));

    expect(router.createUrlTree).toHaveBeenCalledWith(['/auth/login'], {
      queryParams: { returnUrl: '/player/home' },
    });
  });
});
```

## Related Skills

- **Auth Patterns**: [cialvial-auth](../ciavial/SKILL.md) (project-specific)
- **HTTP Services**: [angular-http](../angular-http/SKILL.md)
- **Testing**: [angular-testing](../angular-testing/SKILL.md)

---

**Skill Version**: 1.0.0
**Last Updated**: January 2026
