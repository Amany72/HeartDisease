import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule ,FormBuilder, FormGroup,Validators ,AbstractControl ,ValidationErrors } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-doctor-login',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule , NgIf],
  templateUrl: './doctor-login.component.html',
  styleUrl: './doctor-login.component.scss'
})
export class DoctorLoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      doctorId: ['', [Validators.required, Validators.pattern(/^[0-9]{14}$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6),
        Validators.pattern(/^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*\d).{6,}$/)]]
    });
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
    if (control?.hasError('pattern')) {
      if (field === 'doctorId') {
        return '❌ ID must be 14 digits.';
      }
      if (field === 'password') {
        return '❌ Password must include at least 1 uppercase, 1 special char, and 1 number.';
      }
    }
    if (control?.hasError('email')) {
      return '❌ Enter a valid email address.';
    }
    if (control?.hasError('minlength')) {
      const requiredLength = control.getError('minlength')?.requiredLength;
      return `Must be at least ${requiredLength} characters long.`;
    }
    return null;
  }


}
