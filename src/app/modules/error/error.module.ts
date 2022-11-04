import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErrorRoutingModule } from './error-routing.module';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ErrorPermissionDeniedComponent } from './pages/error-permission-denied/error-permission-denied.component';
import { ErrorPermissionUnauthorizedComponent } from './pages/error-permission-unauthorized/error-permission-unauthorized.component';


@NgModule({
  declarations: [
    NotFoundComponent,
    ErrorPermissionDeniedComponent,
    ErrorPermissionUnauthorizedComponent
  ],
  imports: [
    CommonModule,
    ErrorRoutingModule
  ]
})
export class ErrorModule { }
