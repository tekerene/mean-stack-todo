import { FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export const passwordMatchValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
  if (password.value && confirmPassword.value) {
    return password.value !== confirmPassword.value ? { 'passwordmatch': true } : null;
  }
  return null;
};