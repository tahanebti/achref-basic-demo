import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { RandomDataExampleService } from './core/services/random-data.service';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
  
  `,
})
export class AppComponent {
  data: any;
  constructor(private __randomData: RandomDataExampleService ) {
    console.log("root component", this.__randomData.generate())
    //this.data = this.saveText(this.__randomData.generate(), "/assets/customers.json")
  }

  saveText(text: any, filename: any){
    var a = document.createElement('a');
    a.setAttribute('href', 'data:text/plain;charset=utf-u,'+encodeURIComponent(text));
    a.setAttribute('download', filename);
    a.click()
  }



 }