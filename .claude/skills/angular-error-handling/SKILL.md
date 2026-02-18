---
name: angular-error-handling
description: Angular error handling, logging, monitoring patterns. Trigger: When implementing error handling or logging.
license: MIT
compatibility: opencode
metadata:
  author: angular-community
  version: "1.0.0"
  scope: [root]
  audience: developers
  framework: angular
  auto_invoke:
    - "Implementing error handling"
    - "Adding error logging"
    - "Working with error monitoring"
allowed-tools: Read, Edit, Write, Glob, Grep
---

# Angular Error Handling - Logging & Monitoring

## What I do

I provide patterns for handling errors, logging, and monitoring in Angular applications.

## When to use me

Use this skill when:

- Implementing global error handling
- Adding error logging
- Creating custom error classes
- Handling HTTP errors
- Displaying user-friendly error messages

## Critical Patterns

### ALWAYS

- ✅ Use global ErrorHandler for uncaught errors
- ✅ Create custom error classes
- ✅ Log errors with context
- ✅ Show user-friendly messages
- ✅ Handle HTTP errors in interceptor

### NEVER

- ❌ Swallow errors silently
- ❌ Show technical errors to users
- ❌ Log sensitive data
- ❌ Use console.log in production

## Pattern 1: Global Error Handler

```typescript
// core/services/global-error-handler.ts
import { ErrorHandler, Injectable, inject } from '@angular/core';
import { Toast } from './toast';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  private readonly toast = inject(Toast);

  handleError(error: Error): void {
    console.error('Global error:', error);

    // Log to monitoring service (e.g., Sentry)
    // this.logger.logError(error);

    // Show user-friendly message
    this.toast.show({
      message: 'An unexpected error occurred. Please try again.',
      isError: true,
    });
  }
}

// Provide in app.config.ts
export const appConfig: ApplicationConfig = {
  providers: [
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    // ...
  ],
};
```

## Pattern 2: Custom Error Classes

```typescript
// core/models/errors.ts
export class AuthError extends Error {
  constructor(
    public readonly statusCode: number,
    message: string,
    public readonly originalError?: any,
  ) {
    super(message);
    this.name = 'AuthError';
  }
}

export class ValidationError extends Error {
  constructor(
    message: string,
    public readonly fields: Record<string, string[]>,
  ) {
    super(message);
    this.name = 'ValidationError';
  }
}

export const AUTH_ERROR_MESSAGES = {
  [409]: 'Email already registered',
  [400]: 'Invalid data provided',
  [401]: 'Invalid credentials',
  [429]: 'Too many attempts. Please try again later',
} as const;
```

## Pattern 3: HTTP Error Handling

```typescript
// core/services/auth.ts
import { AuthError, AUTH_ERROR_MESSAGES } from '@core/models/errors';

async login(credentials: LoginDto): Promise<AuthResponse> {
  try {
    const response = await firstValueFrom(
      this.http.post<AuthResponse>(AuthEndpoint.login, credentials)
    );
    return response;
  } catch (error: any) {
    const message = AUTH_ERROR_MESSAGES[error.status] || 'Login failed';
    throw new AuthError(error.status, message, error);
  }
}
```

## Pattern 4: Component Error Handling

```typescript
@Component({
  selector: 'app-login',
  // ...
})
export class LoginPage {
  protected readonly errorMessage = signal<string | null>(null);
  protected readonly isLoading = signal<boolean>(false);

  async onSubmit() {
    this.errorMessage.set(null);
    this.isLoading.set(true);

    try {
      await this.authService.login(this.loginForm.getRawValue());
      this.router.navigate(['/player/home']);
    } catch (error) {
      if (error instanceof AuthError) {
        this.errorMessage.set(error.message);
      } else {
        this.errorMessage.set('An unexpected error occurred');
      }
    } finally {
      this.isLoading.set(false);
    }
  }
}
```

## Related Skills

- **HTTP**: [angular-http](../angular-http/SKILL.md)
- **State**: [angular-state](../angular-state/SKILL.md)

---

**Skill Version**: 1.0.0
**Last Updated**: January 2026
