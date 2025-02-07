import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators ,AbstractControl ,ValidationErrors } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-doctor-registration',
  standalone: true,
  imports: [ReactiveFormsModule , NgIf],
  templateUrl: './doctor-registration.component.html',
  styleUrl: './doctor-registration.component.scss'
})
export class DoctorRegistrationComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group(
      {
        doctorId: [
          '',
          [
            Validators.required,
            Validators.minLength(14),
            Validators.pattern(/^[0-9]{14}$/), 
          ],
        ],
        name: [
          '',
          [
            Validators.required,
            Validators.minLength(10),
            Validators.pattern(/^[a-zA-Z\s]+$/),
          ]
        ],
        email: [ '',[Validators.required,
            Validators.pattern(
              /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ ),]
        ],
        phone: [
          '',
          [
            Validators.required,
            Validators.pattern(/^[0-9]{12}$/), ]],
        password: [ '',[Validators.required, Validators.minLength(6),
            Validators.pattern(
              /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*\d).{6,}$/ ), ]
        ],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: this.matchPasswordsValidator }
    );
  }

  matchPasswordsValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { passwordsMismatch: true };
  }
  isInvalid(field: string): boolean {
    const control = this.registerForm.get(field);
    return control ? control.invalid && control.touched : false;
  }

  getError(field: string): string | null {
    const control = this.registerForm.get(field);
    if (control?.hasError('required') && control.touched) {
      return 'This field is required.';
    }
    if (control?.hasError('minlength')) {
      const requiredLength = control.getError('minlength')?.requiredLength;
      return `Must be at least ${requiredLength} characters .`;
    }
    if (control?.hasError('pattern')) {
      switch (field) {
        case 'doctorId':
          return 'ID must be At Least 14 digits.';
        case 'name':
          return 'Only letters and spaces are allowed.';
        case 'email':
          return 'Enter a valid email address.';
        case 'phone':
          return 'Phone must be 12 digits.';
        case 'password':
          return 'Password must include At least(1 uppercase, 1 special char, 1 number).';
      }
    }
    if (field === 'confirmPassword' && this.registerForm.hasError('passwordsMismatch')) {
      return 'Passwords must match.';
    }
    return null;
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      alert('❌ ❌ You Must fill in all fields Correctly Before Submitting.');
      return;
    }
    alert('Registration successful!');
  }


}
