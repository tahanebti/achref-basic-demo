import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDetailsComponent } from './pages/user-details/user-details.component';
import { UsersViewComponent } from './pages/users-view/users-view.component';

const routes: Routes = [
  {
    path: '',
    component: UsersViewComponent
  },
  {
    path: ':id/details',
    component: UserDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
