import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IPageable, Page } from '../models/pageable.model';
import { Person } from '../models/person.model';
import { AbstractCrudService } from './abstract-crud.service';

@Injectable({
  providedIn: 'root'
})
export class PersonService extends AbstractCrudService<Person, string>{

  constructor(_http: HttpClient) {
    super(_http, `${environment.api.url}`)
   }

   search(filters?: any, page?: IPageable | undefined): Observable<Page<Person>> {
  
    const filterQuery = this.contsructFiltersQuery(filters);
    console.log({ filterQuery });

    const params: {} = !page ? {} : {
      filter: filterQuery ?? '',
      page: page.pageNumber,
      size: page.pageSize
    }

    return this._http.get<Page<Person>>(`${this._base}/search`, {params: params})
  }


  public override contsructFiltersQuery(filters: any) {
    if (!filters) return null;
    const { priceRange, brands, colors, ratings, stock, categories } = filters;
    let query = {};

    if (priceRange?.from) {
      query = { ...query, price_from: priceRange.from };
    }
    if (priceRange?.to) {
      query = { ...query, price_to: priceRange.to };
    }
    if (brands?.length > 0) {
      query = { ...query, brands: brands.join(',') };
    }
    if (categories?.length > 0) {
      query = { ...query, categories: categories.join(',') };
    }
    if (ratings?.length > 0) {
      query = { ...query, rating: ratings.join(',') };
    }
    if (colors?.length > 0) {
      query = { ...query, colors: colors.join(',') };
    }
    if (stock?.length > 0) {
      query = { ...query, stock };
    }

    return query;
  }
   

}
