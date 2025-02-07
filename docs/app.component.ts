import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { LandingComponent } from "./Landing/landing.component";
import { FormsModule } from '@angular/forms';

import { DoctorHomeComponent } from "./doctor-home/doctor-home.component";
import { DoctorRegistrationComponent } from "./doctor-registration/doctor-registration.component";
import { PatientHomeComponent } from "./patient-home/patient-home.component";
import { PatientRegistrationComponent } from "./patient-registration/patient-registration.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet

],
   // formsModule for direcive ngModel...take input that user written in html and store it in proprety in ts(two way dataa binding (dom))
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'HeartDiseasePrediction';
}
