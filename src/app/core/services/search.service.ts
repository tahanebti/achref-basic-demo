import { Injectable } from "@angular/core";
import { catchError, forkJoin, map, Observable, of, tap } from 'rxjs';
import { PersonService } from "./person.service";
import { isEmpty } from 'lodash';
import { Person } from "../models/person.model";


export interface AutoCompleteResult {
    products: AutoCompleteData[];
    categories: AutoCompleteData[];
  }
  
export interface AutoCompleteData {
    _id: string;
    name: string;
}

@Injectable({
    providedIn: 'root',
  })
export class FakeSearchService {
    users: any

    constructor(
        //  private readonly apiUrl: string,
        private _personService: PersonService,
    ) {
         this._personService.findAll().subscribe(
            users => {
                this.users = users
            }
        )
    }


    getAutoComplete(query: any): Observable<any> {
        return forkJoin([
            this.getBasicUsers(query),
            this.getBusinessUsers(query),
        ]).pipe(
            map(([basic, business]) => ({
                basic,
                business
            })
           )
        )    
    }
    getBusinessUsers(query: any): Observable<AutoCompleteData[]>  {
        const filterQuery = this.contsructFiltersQuery(query);

        return of(this.users.filter((user: any) => user.type = "BasicPerson" && filterQuery))
    }


    getBasicUsers(query: any): Observable<AutoCompleteData[]>  {
        const filterQuery = this.contsructFiltersQuery(query);

        return of(this.users.filter((user: any) => user.type = "BusinessPerson" && filterQuery))
    }

    contsructFiltersQuery(filters: any) {
        if (!filters) return null;
    const { firstName, lastName, positions } = filters;
    let query = {};

    if (firstName) {
      query = { ...query, firstName: firstName };
    }
    if (lastName) {
      query = { ...query, lastName: lastName };
    }
  
    if (positions?.length > 0) {
      query = { ...query, positions: positions.join(',') };
    }
 

    return query;
    }
    
}

