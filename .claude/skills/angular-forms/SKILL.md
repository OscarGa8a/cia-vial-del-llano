---
name: angular-forms
description: Angular reactive forms, validation, form utilities. Trigger: When creating reactive forms or adding form validation.
license: MIT
compatibility: opencode
metadata:
  author: angular-community
  version: "1.0.0"
  scope: [root]
  audience: developers
  framework: angular
  auto_invoke:
    - "Creating reactive forms"
    - "Adding form validation"
    - "Working with form utilities"
allowed-tools: Read, Edit, Write, Glob, Grep
---

# Angular Forms - Reactive Forms & Validation

## What I do

I provide patterns for creating reactive forms in Angular 21+ with proper validation, type safety, and best practices.

## When to use me

Use this skill when:

- Creating reactive forms
- Implementing form validation
- Creating custom validators
- Working with form utilities
- Handling form submission

## Critical Patterns

### ALWAYS

- ✅ Use `FormBuilder` with `inject()`
- ✅ Use typed forms with `FormGroup<T>`
- ✅ Mark forms as touched before showing errors
- ✅ Use `NonNullableFormBuilder` for non-nullable forms
- ✅ Create separate DTOs for form data

### NEVER

- ❌ Use template-driven forms for complex forms
- ❌ Access form values without type safety
- ❌ Show validation errors before user interaction
- ❌ Use `any` for form types

## Pattern 1: Typed Reactive Form

```typescript
// features/auth/pages/login/login.page.ts
import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth';
import { LoginDto } from '@core/models';

interface LoginForm {
  email: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.page.html',
})
export class LoginPage {
  private readonly fb = inject(FormBuilder).nonNullable;
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly loginForm = this.fb.group<LoginForm>({
    email: this.fb.control('', [Validators.required, Validators.email]),
    password: this.fb.control('', [Validators.required, Validators.minLength(8)]),
  });

  async onSubmit() {
    if (this.loginForm.invalid) {
      this.markAllAsTouched();
      return;
    }

    const loginData: LoginDto = this.loginForm.getRawValue();

    try {
      await this.authService.login(loginData);
      this.router.navigateByUrl('/player/home');
    } catch (error) {
      // Handle error
    }
  }

  private markAllAsTouched() {
    Object.values(this.loginForm.controls).forEach((control) => {
      control.markAsTouched();
    });
  }
}
```

## Pattern 2: Custom Validator

```typescript
// shared/validators/password-match.validator.ts
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordMatchValidator(
  passwordKey: string = 'password',
  confirmKey: string = 'confirmPassword'
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get(passwordKey);
    const confirm = control.get(confirmKey);

    if (!password || !confirm) {
      return null;
    }

    return password.value === confirm.value ? null : { passwordMismatch: true };
  };
}

// Usage
protected readonly registerForm = this.fb.group({
  email: ['', [Validators.required, Validators.email]],
  password: ['', [Validators.required, Validators.minLength(8)]],
  confirmPassword: ['', Validators.required]
}, { validators: passwordMatchValidator() });
```

## Pattern 3: Form Utilities

```typescript
// shared/utils/forms.ts
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';

/**
 * Marks all controls in a form as touched to trigger validation display
 */
export function touchControlsForm(form: FormGroup): void {
  Object.values(form.controls).forEach((control) => {
    control.markAsTouched();

    if (control instanceof FormGroup) {
      touchControlsForm(control);
    }
  });
}

/**
 * Type-safe form control cast
 */
export function toFormControl(control: AbstractControl): FormControl {
  return control as FormControl;
}

/**
 * Type-safe form group cast
 */
export function toFormGroup(control: AbstractControl): FormGroup {
  return control as FormGroup;
}

/**
 * Gets form error messages
 */
export function getFormErrors(form: FormGroup): string[] {
  const errors: string[] = [];

  Object.keys(form.controls).forEach((key) => {
    const control = form.get(key);
    if (control && control.errors && control.touched) {
      Object.keys(control.errors).forEach((errorKey) => {
        errors.push(`${key}: ${errorKey}`);
      });
    }
  });

  return errors;
}
```

## Pattern 4: Form Error Display Component

```typescript
// shared/components/form-error/form-error.component.ts
import { Component, input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-error',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (control()?.invalid && control()?.touched) {
      <div class="text-red-500 text-sm mt-1">
        @if (control()?.errors?.['required']) {
          <p>This field is required</p>
        }
        @if (control()?.errors?.['email']) {
          <p>Invalid email format</p>
        }
        @if (control()?.errors?.['minlength']) {
          <p>Minimum {{ control()?.errors?.['minlength'].requiredLength }} characters</p>
        }
        @if (control()?.errors?.['passwordMismatch']) {
          <p>Passwords do not match</p>
        }
      </div>
    }
  `,
})
export class FormErrorComponent {
  control = input.required<AbstractControl | null>();
}
```

## Pattern 5: Dynamic Form Array

```typescript
// Example: Adding multiple amenities
import { FormArray } from '@angular/forms';

protected readonly spaceForm = this.fb.group({
  name: ['', Validators.required],
  amenities: this.fb.array<string>([])
});

get amenities(): FormArray<FormControl<string>> {
  return this.spaceForm.get('amenities') as FormArray<FormControl<string>>;
}

addAmenity() {
  this.amenities.push(this.fb.control(''));
}

removeAmenity(index: number) {
  this.amenities.removeAt(index);
}
```

## Decision Trees

### Which form type?

```
Simple form (1-2 fields)? → Template-driven OK
Complex validation? → Reactive forms
Dynamic fields? → Reactive forms with FormArray
Multi-step wizard? → Reactive forms with separate groups
```

### When to show errors?

```
After user touches field? → control.touched
After form submission attempt? → control.touched OR formSubmitted
Real-time validation? → control.dirty
```

## Related Skills

- **Components**: [angular-component](../angular-component/SKILL.md)
- **HTTP**: [angular-http](../angular-http/SKILL.md)
- **Testing**: [angular-testing](../angular-testing/SKILL.md)

---

**Skill Version**: 1.0.0
**Last Updated**: January 2026
