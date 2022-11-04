import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonViewComponent } from './pages/person-view/person-view.component';

const routes: Routes = [
  {
    path: '',
    component: PersonViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class PersonRoutingModule { }
