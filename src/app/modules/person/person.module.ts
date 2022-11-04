import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonRoutingModule } from './person-routing.module';
import { PersonViewComponent } from './pages/person-view/person-view.component';
import { PersonListComponent } from './components/person-list/person-list.component';
import { PersonCreateComponent } from './components/person-create/person-create.component';
import { PersonEditComponent } from './components/person-edit/person-edit.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TableStickyHeaderModule } from 'src/app/shared/components/table-sticky-header/table-sticky-header.module';
import { PersonCardComponent } from './components/person-card/person-card.component';

import { CarouselModule } from 'ngx-owl-carousel-o';

@NgModule({
  declarations: [
    PersonViewComponent,
    PersonListComponent,
    PersonCreateComponent,
    PersonEditComponent,
    PersonCardComponent
  ],
  imports: [
    CommonModule,
    PersonRoutingModule,
    SharedModule,
    TableStickyHeaderModule,
    CarouselModule
  ]
})
export class PersonModule { }
