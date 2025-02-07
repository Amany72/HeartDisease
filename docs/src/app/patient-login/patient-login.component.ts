import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators ,AbstractControl ,ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-patient-login',
  standalone: true,
  imports: [RouterLink, NgIf , ReactiveFormsModule],
  templateUrl: './patient-login.component.html',
  styleUrl: './patient-login.component.scss'
})
export class PatientLoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
        ] ],
      password: [ '', [ Validators.required,Validators.minLength(6),
          Validators.pattern(/^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*\d).{6,}$/),
        ] ],
    });
  }


  isInvalid(field: string): boolean {
    const control = this.loginForm.get(field);
    return control ? control.invalid && control.touched : false;
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      alert('❌ Please fill in all fields with valid information before submitting.');
      return;
    }
    alert('Login successful!');
  }

  getError(field: string): string | null {
    const control = this.loginForm.get(field);
    if (control?.hasError('required') && control.touched) {
      return 'This field is required.';
    }
    if (control?.hasError('minlength')) {
      const requiredLength = control.getError('minlength')?.requiredLength;
      return `Must be at least ${requiredLength} characters`;
    }

    if (control?.hasError('pattern')) {
      switch (field) {
        case 'email':
          return '❌ Enter a valid email address.';

      }
    }

    return null;
  }

}
