import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { Person } from 'src/app/core/models/person.model';
import { PersonService } from 'src/app/core/services/person.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {


  public edit = false;
  public user: any;
  user$!: Observable<any>;


  constructor(
    private userService: PersonService,
    private _router: ActivatedRoute
  ) { }

  ngOnInit(): void { 
    let id: any = this._router.snapshot.paramMap.get('id')
    this.user$ = this.getUser(id)
  }

  getUser(id: any): Observable<any>{
    return this.userService.findAll()
      .pipe(
        switchMap((users: any) => of(users.find((user: any) => user.id == id)))
      )
  }

  toggleEdit() {
    this.edit = !this.edit;
  }


}
