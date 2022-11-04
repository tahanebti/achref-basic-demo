import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { merge, startWith, switchMap, map, catchError, of, Observable } from 'rxjs';
import { IPageable, Page } from 'src/app/core/models/pageable.model';
import { PersonService } from 'src/app/core/services/person.service';
import { RandomDataExampleService } from 'src/app/core/services/random-data.service';
import { ConfirmComponent } from '../../components/confirm/confirm.component';
import { FormsComponent } from '../../components/forms/forms.component';

@Component({
  selector: 'app-users-view',
  templateUrl: './users-view.component.html',
  styleUrls: ['./users-view.component.scss']
})
export class UsersViewComponent implements AfterViewInit, OnInit {
  public displayedColumns = ['id', 'name', 'email', 'position', 'userid'];
  public pageSizeOptions = [5, 10, 20, 40, 100];
  public pageSize = 20;
  public dataSource = new MatTableDataSource();
  public pageEvent!: PageEvent;
  public resultsLength = 0;
  public page = 1;
  public isLoading = false;
  public isTotalReached = false;
  public totalItems = 0;
  public search = '';

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private userService: PersonService,
    private _fakeRandomDataService: RandomDataExampleService,
    private router: Router,
    public dialog: MatDialog,
    public snack: MatSnackBar
  ) { }

  ngOnInit() {
   // if (!this.authService.loggedIn.getValue()) {
   //   this.router.navigate(['/login']);
   // }
  }

  ngAfterViewInit() {
    // ANTES QUE LA VISTA CARGUE INICIA LA CARGA DE DATOS EN EL GRID
    this.getData();


  }

  ngAfterViewChecked() {
    this.changeDetectorRef.detectChanges();
  }

  private openSnack(data: any): void {
 //   this.snack.openFromComponent(SnackbarComponent, {
 //     data: { data: data },
 //     duration: 3000
 //   });
  }

  public onPaginateChange(event: any): void {
    this.page = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.getData();
  }

  public applyFilter(filterValue: any): void {
    
    filterValue = filterValue.target.value.trim().toLowerCase();
    this.getData()
  }


  getFakeData(filters?: any, active?: any, direction?: any, size?: any, number?: any): Observable<any>{
    const filterQuery: any = this.contsructFiltersQuery(filters);
     let data  = this._fakeRandomDataService.generate()

  
    return of({
      elements : data,
      filter: filterQuery ?? '',
      pageNumber: number,
      pageSize: size,
      active: active,
      direction: direction
    })
  }

  contsructFiltersQuery(filters: any) {
   // throw new Error('Method not implemented.');
  }


  getData(): void {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoading = true;
          return this.getFakeData(
            this.search,
            this.sort.active,
            this.sort.direction,
            this.pageSize,
            this.page,
          );
        }),
        map(data => {
          this.isLoading = false;
          this.isTotalReached = false;
          this.totalItems = data.elements.lenght;
          console.log(data)
          return data.elements;
        }),
        catchError(() => {
          this.isLoading = false;
          this.isTotalReached = true;
          return of([]);
        })
      ).subscribe(data => {
       // console.log(data)
        this.dataSource.data = data
      });
  }

  edit(client: any): void {
    this.userService.findOne(client.id).subscribe((data: any) => {
      if (data.success) {
        const dialogRef = this.dialog.open(FormsComponent, {
          width: '400px',
          data: { title: 'Update person', action: 'edit', data: data.data }
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.paginator._changePageSize(this.paginator.pageSize);
          }
        });
      }
    });
  }

  save(): void {
    const dialogRef = this.dialog.open(FormsComponent, {
      width: '400px',
      data: { title: 'Add person', action: 'save' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.paginator._changePageSize(this.paginator.pageSize);
      }
    });
  }

  delete(client: any): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '250px',
      data: {
        title: 'Delete record',
        message: 'Are you sure you want to delete this record?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.delete(client.id).subscribe((data: any) => {
          this.openSnack(data);
          if (data.success) {
            this.paginator._changePageSize(this.paginator.pageSize);
          }
        });
      }
    });
  }

}