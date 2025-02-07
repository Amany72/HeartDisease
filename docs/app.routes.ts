import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './Landing/landing.component';
// import { DoctorRegistrationComponent } from './doctor-registration/doctor-registration.component';
// import { DoctorHomeComponent } from './doctor-home/doctor-home.component';
// import { PatientRegistrationComponent } from './patient-registration/patient-registration.component';
// import { PatientHomeComponent } from './patient-home/patient-home.component';
// import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
// import { NgModule } from '@angular/core';
import { DoctorLoginComponent } from './doctor-login/doctor-login.component';
import { PatientLoginComponent } from './patient-login/patient-login.component';
import { PatientRegistrationComponent } from './patient-registration/patient-registration.component';
import { DoctorRegistrationComponent } from './doctor-registration/doctor-registration.component';

export const routes: Routes = [
{path:'' ,redirectTo:'landing' , pathMatch:'full'},
{path:'landing' , component:LandingComponent},
{path:'doctor-login' , component:DoctorLoginComponent},
{path:'patient-login' , component:PatientLoginComponent},
 {path:'DoctorRegistration' , component:DoctorRegistrationComponent, title:'Registration'},
// {path:'DoctorHome' , component:DoctorHomeComponent , title:'Home'},
 {path:'PatientRegistration' , component:PatientRegistrationComponent , title:'Registration'},
// {path:'PatientHome' , component:PatientHomeComponent , title:'Home'},
// {path:'**' , component:PageNotFoundComponent , title:'Not Found'}

];

export class AppRoutingModule {}
