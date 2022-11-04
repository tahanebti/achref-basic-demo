import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersViewComponent } from './pages/users-view/users-view.component';
import { FormsComponent } from './components/forms/forms.component';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserDetailsComponent } from './pages/user-details/user-details.component';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [
    UsersViewComponent,
    FormsComponent,
    ConfirmComponent,
    UserDetailsComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule
  ]
})
export class UsersModule { }
