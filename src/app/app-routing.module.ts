import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  
  {
    path: '',
    loadChildren: () => 
      import('./modules/index/index.module').then(m => m.IndexModule)
  },
  {
    path: 'app',
    loadChildren: () => 
      import('./modules/layouts/layouts.module').then(m => m.LayoutsModule)
  },
  {
      path: 'error',
      loadChildren: () => 
        import('./modules/error/error.module').then(m => m.ErrorModule)
  },
  {
    path: 'auth',
    loadChildren: () => 
      import('./modules/authentication/authentication.module').then(m => m.AuthenticationModule)
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: ''
  },  
  ]

  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }  
