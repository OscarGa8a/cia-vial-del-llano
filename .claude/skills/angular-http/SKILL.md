---
name: angular-http
description: Angular HTTP services, interceptors, API integration patterns. Trigger: When creating HTTP services, interceptors, or API integrations.
license: MIT
compatibility: opencode
metadata:
  author: angular-community
  version: "1.0.0"
  scope: [root]
  audience: developers
  framework: angular
  auto_invoke:
    - "Creating HTTP services or API integrations"
    - "Working with interceptors or HTTP middleware"
    - "Implementing API calls"
allowed-tools: Read, Edit, Write, Glob, Grep
---

# Angular HTTP - Services & Interceptors

## What I do

I provide patterns for creating HTTP services, interceptors, and API integrations in Angular 21+ using modern practices with signals and proper error handling.

## When to use me

Use this skill when:

- Creating new HTTP services
- Implementing API integrations
- Creating HTTP interceptors
- Handling HTTP errors
- Working with API endpoints
- Implementing token-based authentication

## Critical Patterns

### ALWAYS

- ✅ Use `inject(HttpClient)` for dependency injection
- ✅ Define endpoints as constants in separate endpoint files
- ✅ Return Observables from HTTP methods
- ✅ Handle errors with proper error types
- ✅ Use TypeScript generics for type safety
- ✅ Use `providedIn: 'root'` for services

### NEVER

- ❌ Hardcode URLs in services
- ❌ Subscribe in services (let components subscribe)
- ❌ Use `any` type for responses
- ❌ Catch errors without rethrowing or transforming
- ❌ Store HTTP state in services (use signals instead)

## Pattern 1: HTTP Service Structure

```typescript
// features/venues/endpoints/venue.endpoint.ts
import { environment } from '@env/environment';

export class VenueEndpoint {
  private static readonly BASE = `${environment.apiUrl}venues`;

  static readonly list = `${VenueEndpoint.BASE}/`;
  static readonly myVenues = `${VenueEndpoint.BASE}/my-venues/`;
  static readonly detail = (id: string) => `${VenueEndpoint.BASE}/${id}/`;
  static readonly create = `${VenueEndpoint.BASE}/`;
  static readonly update = (id: string) => `${VenueEndpoint.BASE}/${id}/`;
  static readonly delete = (id: string) => `${VenueEndpoint.BASE}/${id}/`;
}

// features/venues/services/venue.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Venue, CreateVenueDto, UpdateVenueDto } from '../models';
import { VenueEndpoint } from '../endpoints/venue.endpoint';

@Injectable({
  providedIn: 'root',
})
export class VenueService {
  private readonly http = inject(HttpClient);

  /**
   * Fetches all venues with optional pagination
   */
  getVenues(page: number = 1, limit: number = 10): Observable<PaginationResponse<Venue>> {
    return this.http.get<PaginationResponse<Venue>>(VenueEndpoint.list, {
      params: { page: page.toString(), limit: limit.toString() },
    });
  }

  /**
   * Fetches a single venue by ID
   */
  getVenue(id: string): Observable<Venue> {
    return this.http.get<Venue>(VenueEndpoint.detail(id));
  }

  /**
   * Creates a new venue
   */
  createVenue(data: CreateVenueDto): Observable<Venue> {
    return this.http.post<Venue>(VenueEndpoint.create, data);
  }

  /**
   * Updates an existing venue
   */
  updateVenue(id: string, data: UpdateVenueDto): Observable<Venue> {
    return this.http.put<Venue>(VenueEndpoint.update(id), data);
  }

  /**
   * Deletes a venue
   */
  deleteVenue(id: string): Observable<void> {
    return this.http.delete<void>(VenueEndpoint.delete(id));
  }
}
```

## Pattern 2: HTTP Interceptor (Auth Token)

```typescript
// core/interceptors/auth.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthStateService } from '@core/services/auth-state';

/**
 * Attaches JWT Bearer token to API requests
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authState = inject(AuthStateService);
  const accessToken = authState.accessToken();

  // Skip auth for non-API requests or auth endpoints
  const isApiRequest = req.url.includes('/api/');
  const isAuthEndpoint = req.url.includes('/auth/');

  if (isApiRequest && !isAuthEndpoint && accessToken) {
    // Clone request and add Authorization header
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return next(authReq);
  }

  return next(req);
};
```

## Pattern 3: Error Interceptor

```typescript
// core/interceptors/error.interceptor.ts
import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Toast } from '@core/services/toast';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toast = inject(Toast);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'An error occurred';

      if (error.error instanceof ErrorEvent) {
        // Client-side error
        errorMessage = `Error: ${error.error.message}`;
      } else {
        // Server-side error
        errorMessage = error.error?.message || `Error Code: ${error.status}`;
      }

      // Show toast notification
      toast.show({ message: errorMessage, isError: true });

      return throwError(() => error);
    }),
  );
};
```

## Pattern 4: Providing Interceptors

```typescript
// main.ts or app.config.ts
import { provideHttpClient, withInterceptors, withFetch } from '@angular/common/http';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { errorInterceptor } from './core/interceptors/error.interceptor';
import { tokenRefreshInterceptor } from './core/interceptors/token-refresh.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withFetch(), // Use fetch API (modern)
      withInterceptors([authInterceptor, errorInterceptor, tokenRefreshInterceptor]),
    ),
    // ... other providers
  ],
};
```

## Pattern 5: httpResource (Angular 19+ Reactive HTTP)

```typescript
// components/venue-list.component.ts
import { Component, signal, computed } from '@angular/core';
import { httpResource } from '@angular/core/rxjs-interop';
import { VenueEndpoint } from '../endpoints/venue.endpoint';

@Component({
  selector: 'app-venue-list',
  // ...
})
export class VenueListComponent {
  // Reactive signals for request params
  private readonly page = signal<number>(1);
  private readonly searchQuery = signal<string>('');

  // Compute request params
  private readonly requestParams = computed(() => ({
    page: this.page().toString(),
    limit: '10',
    search: this.searchQuery(),
  }));

  // Reactive HTTP resource
  protected readonly venuesResource = httpResource<PaginationResponse<Venue>>({
    url: VenueEndpoint.list,
    request: () => ({ params: this.requestParams() }),
  });

  // Computed view state
  protected readonly venues = computed(() => this.venuesResource.value()?.data || []);

  protected readonly isLoading = computed(() => this.venuesResource.isLoading());

  // Methods to update signals (triggers auto-refetch)
  onSearch(query: string) {
    this.searchQuery.set(query);
    this.page.set(1); // Reset to page 1
  }

  onPageChange(newPage: number) {
    this.page.set(newPage);
  }

  // Manual reload
  reload() {
    this.venuesResource.reload();
  }
}
```

## Decision Trees

### Service vs httpResource?

```
Simple CRUD operations? → Use service with Observable
Need reactive auto-refetch? → Use httpResource
Component-local data fetching? → Use httpResource
Shared data across components? → Use service + signal store
```

### Where to handle errors?

```
Need custom error per request? → Catch in component
Need global error handling? → Use error interceptor
Need both? → Interceptor for toast, catch for custom logic
```

## Commands

```bash
# Generate service
ng generate service features/{feature}/services/{name}

# Test HTTP service
pnpm test -- --include="**/{service-name}.service.spec.ts"
```

## Related Skills

- **Components**: [angular-component](../angular-component/SKILL.md)
- **State Management**: [angular-state](../angular-state/SKILL.md)
- **Error Handling**: [angular-error-handling](../angular-error-handling/SKILL.md)
- **Testing**: [angular-testing](../angular-testing/SKILL.md)

---

**Skill Version**: 1.0.0
**Last Updated**: January 2026
