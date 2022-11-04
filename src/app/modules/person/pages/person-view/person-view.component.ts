import { isPlatformServer } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Observable, Subject, switchMap, tap, takeUntil, map } from 'rxjs';
import { Person } from 'src/app/core/models/person.model';
import { PersonService } from 'src/app/core/services/person.service';

const typeMap: Record<string, string> = {
  PersonBasic: 'basic',
  PersonBusiness: 'business',
};

export class Category {
  url!: string;
  name!: string;
  icon!: string;
}

@Component({
  selector: 'app-person-view',
  templateUrl: './person-view.component.html',
  styleUrls: ['./person-view.component.scss']
})
export class PersonViewComponent implements OnInit, OnDestroy {
 
  users$!: Observable<any>
  displayedColumns: string[] = ['id', 'name', 'position'];
  loadingIndicator = false;
  rows = [];
  columns : any

  @ViewChild('templateAction', { static: false }) templateAction: any;
 
  public customerWidth?: number;
  public items = new Array(18);
  public isLoading = false;
  public isServer!: boolean;
  users: any

  private _subscriptionSubject: Subject<void>;

  sections$: Observable<any> | undefined;

  public category!: any;
  public index!: number;

  public categories: Category[] = [
    { url: 'electronics', name: 'Electrocnics', icon: '🔋' },
    { url: 'developers', name: 'Developers', icon: '🖥' },
    { url: 'designer', name: 'Designer', icon: '♾' },
    { url: 'analysis', name: 'Analyses', icon: '📶' },
    { url: 'security', name: 'Security', icon: '🛡' },
    { url: 'archiver', name: 'Archiver', icon: '📂' },
    { url: 'marketing', name: 'Marketing', icon: '💶' },
    { url: 'photograph', name: 'Photographer', icon: '📷' },

  ];

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    nav: false,
    navSpeed: 700,
    navText: ['<', '>'],
    responsive: {
      0: { items: 3.2 },
      400: { items: 5 },
      740: { items: 8 },
      940: { items: 10 }
    },
  };

  

  constructor(
    private _service: PersonService,
 
    @Inject(PLATFORM_ID) private platformId: Object, //eslint-disable-line
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) { 
    this._subscriptionSubject = new Subject<void>();
     console.log('person component');
  }

  ngOnInit(): void {
    this.listenToEvents();
    this.isServer = isPlatformServer(this.platformId);

    this.route.queryParamMap.subscribe(params => {
      this.category = params.get('category');
      this.index = this.categories.findIndex(i => i.url === this.category);
    });
  }

  
  private listenToEvents(): void {
    this.listenToSearchQuery();
  }

  private listenToSearchQuery(): void {
    this._service.findAll({}).pipe(
      tap(() => this.setLoading(true)),
      switchMap(
        (query: any) => this.sections$ = this.getSearchRequest(query)
      ),
      takeUntil(this._subscriptionSubject)
    ).subscribe((users: Person[]) => {
      this.users = users
      console.log(this.users);
      this.setLoading(false);
      this.cdr.detectChanges();
    })
  }

  getSearchRequest(query: any): Observable<any>  {
    return this._service.findAll({}).pipe(
      map((users: Person[]) => {
        const grouped = groupBy(users, 'type');
        return Object.keys(grouped).map((key) => ({
          type: typeMap[key],
          users: grouped[key],
        }));
      })
    );
  }

  private setLoading(isLoading: boolean): void {
    this.isLoading = isLoading;
    this.cdr.detectChanges();
  }


  public onSelectPerson(personId?: string): void {
    if (!personId) {
      return;
    }
  }

  addDialog() {
   // this.matDialog.open(AddDialogComponent);
  }

  deleteItem(id: any) {
   // this.store.dispatch(deleteProductAction({ id }));
  }

  editItem(row: any) {
   // this.matDialog.open(AddDialogComponent, {
   //   data: row
   // })
  }



  ngOnDestroy(): void {
    this._subscriptionSubject.next();
    this._subscriptionSubject.complete();
    console.log('person component destroyed');
  }


  
}


export const groupBy = (items: any[], key: string) => items.reduce(
  (result, item) => ({
    ...result,
    [item[key]]: [
      ...(result[item[key]] || []),
      item,
    ],
  }), 
  {},
);