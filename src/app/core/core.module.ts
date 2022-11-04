import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CacheService, CACHE_SERVICE } from './services/cache.service';

const windowProvider = {
  provide: Window,
  useValue: window
}

const cacheProvider = {
  provide: CACHE_SERVICE,
  useExisting: CacheService
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule,

  ],
  providers: [
    windowProvider,
    cacheProvider,
  ]
})
export class CoreModule { }
