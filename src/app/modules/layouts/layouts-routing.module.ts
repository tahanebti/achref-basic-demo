import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutViewComponent } from './pages/layout-view/layout-view.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutViewComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => 
        import('../person/person.module').then(m => m.PersonModule)
      },
      {
        path: 'users',
        loadChildren: () => 
        import('../users/users.module').then(m => m.UsersModule)
      },
      {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'dashboard'
      },  
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutsRoutingModule { }
