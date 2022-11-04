import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth-view',
  templateUrl: './auth-view.component.html',
  styleUrls: ['./auth-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthViewComponent {}