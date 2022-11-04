import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logging-in',
  templateUrl: './logging-in.component.html',
  styleUrls: ['./logging-in.component.scss']
})
export class LoggingInComponent implements OnInit {

  constructor(  private _router: Router) { }

  ngOnInit(): void {
    setTimeout(() => {
      return this._router.navigate(['/app', 'dashboard'])

    }, 5000);
  }

}
