import {Component, Input, OnInit, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Person } from 'src/app/core/models/person.model';



@Component({
  selector: 'app-table-sticky-header',
  templateUrl: './table-sticky-header.component.html',
  styleUrls: ['./table-sticky-header.component.scss']
})
export class TableStickyHeaderComponent implements OnInit {
  @Input() elements: Person[] = []
  @Input() displayedColumns: any

  @ViewChild(MatPaginator) paginator: any;
  @ViewChild(MatSort) sort: any;

  
  dataSource: any 
  constructor(){
    this.dataSource = new MatTableDataSource<any>(this.elements);
    console.log("table datasource ",this.dataSource)
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: any) {
    console.log(filterValue)
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}



