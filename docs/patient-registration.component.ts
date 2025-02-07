import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators ,AbstractControl ,ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-patient-registration',
  standalone: true,
  imports: [ReactiveFormsModule , NgIf],
  templateUrl: './patient-registration.component.html',
  styleUrl: './patient-registration.component.scss'
})
export class PatientRegistrationComponent {


  registerForm: FormGroup;

  constructor(private fb: FormBuilder) {

    this.registerForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.pattern(/^[a-zA-Z\s]+$/),
        ]
      ],

      email: ['', [Validators.required,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ )

      ]],


      phone: ['', [Validators.required,
        Validators.minLength(10),
      Validators.pattern('^[0-9]{12}$')]],


      password: ['', [Validators.required, Validators.minLength(6),
      Validators.pattern(
          /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*\d).{6,}$/ )


      ]],
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

  onSubmit(): void {
    if (this.registerForm.invalid) {
      alert('❌ ❌ You Must fill in all fields Correctly Before Submitting.');
      return;
    }

    alert('Registration successful!');
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
      return `Must be at least ${requiredLength} characters long.`;
    }
    if (control?.hasError('pattern')) {
      switch (field) {
        case 'name':
          return '❌ Only letters and spaces are allowed.';
        case 'email':
          return '❌ Enter a valid email address.';
        case 'phone':
          return '❌  Only 12 digits are allowed .';
        case 'password':
          return '❌ Password must include At least(1 uppercase, 1 special char, 1 number).';
      }
    }
    if (field === 'confirmPassword' && this.registerForm.hasError('passwordsMismatch')) {
      return '❌ Confirm Password Must Match Password.';
    }
    return null;
  }

}
