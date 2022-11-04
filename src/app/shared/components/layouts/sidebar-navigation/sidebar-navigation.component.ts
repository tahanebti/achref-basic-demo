import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

export interface MenuItem {
  title?: string;
  icon?: string;
  link?: string;
  color?: string;

  hideFor?: string;

  expanded?: boolean;
  subMenu?: MenuItem[] ;
}


@Component({
  selector: 'app-sidebar-navigation',
  templateUrl: './sidebar-navigation.component.html',
  styleUrls: ['./sidebar-navigation.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarNavigationComponent  {
  @Input() menu: any
}
