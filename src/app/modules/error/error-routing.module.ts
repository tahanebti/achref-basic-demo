import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPermissionDeniedComponent } from './pages/error-permission-denied/error-permission-denied.component';
import { ErrorPermissionUnauthorizedComponent } from './pages/error-permission-unauthorized/error-permission-unauthorized.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

const routes: Routes = [
  {
    path: '401',
    component: ErrorPermissionUnauthorizedComponent
  },
  {
    path: '403',
    component: ErrorPermissionDeniedComponent 
  },
  {
    path: '404',
    component: NotFoundComponent 
  },
  {
    path: '**',
    redirectTo: '404',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErrorRoutingModule { }
