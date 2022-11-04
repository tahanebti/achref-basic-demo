import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, switchMap } from 'rxjs';
import { AutoCompleteResult, FakeSearchService } from 'src/app/core/services/search.service';

@Component({
  selector: 'app-layout-view',
  templateUrl: './layout-view.component.html',
  styleUrls: ['./layout-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutViewComponent implements OnInit {

  opened = true;

  public suggestions$!: Observable<AutoCompleteResult>;
  public  autoCompleteSubject = new Subject<string>();

  constructor(
    private  searchService: FakeSearchService,
    private  router: Router
  ) { }

  ngOnInit(): void {
    this.suggestions$ = this.autoCompleteSubject
    .asObservable()
    .pipe(
      switchMap((searchTerm) =>
        this.searchService.getAutoComplete(searchTerm)
      )
    );
  }


  onSearch(searchTerm: string) {
    this.router.navigate(['/app', 'users'], { queryParams: { q: searchTerm } });
  }

  onAutoComplete($event: string) {
    this.autoCompleteSubject.next($event);
  }

  onFilter({ key, value }: { key: string; value: string }) {
    this.router.navigate(['/users'], {
      queryParams: {
        filters: `${key}=${value}`,
      },
      queryParamsHandling: 'merge',
    });
  }

  
  menu: any = [
    {
      title: 'Home',
      icon: 'home',
      link: '/app',
      color: '#ff7f0e',
    },
    {
      title: 'Statistics',
      icon: 'bar_chart',
      color: '#ff7f0e',
      subMenu: [
        {
          title: 'Basic',
          icon: 'money',
          link: '/app/users',
          param: 'basic',
          color: '#ff7f0e',
        },
        {
          title: 'Business',
          icon: 'people',
          color: '#ff7f0e',
          link: '/app/users',
          param: 'busniess',
        },
      ],
    },
  ];

  toggle(): void {
    this.opened = !this.opened;
  }

}
