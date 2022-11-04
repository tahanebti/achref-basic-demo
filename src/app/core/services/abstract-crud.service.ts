import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


export interface CrudOperations<T, ID> {
  create(t: T): Observable<T>;
  update(id: ID, t: T): Observable<T>;
  delete(id: ID): Observable<any>;
  findOne(id: ID): Observable<T>;
  findAll(filters?: any): Observable<T[]>;
}


export abstract class AbstractCrudService<T, ID> implements CrudOperations<T, ID>{

  constructor(
    protected _http: HttpClient,
    protected _base: string
  ) { }

  
  create(t: T): Observable<T> {
    return this._http.post<T>(this._base, t);
  }

  update(id: ID, t: T): Observable<T> {
    return this._http.put<T>(`${this._base}/${id}`, t);
  }

  delete(id: ID): Observable<T> {
    return this._http.delete<T>(`${this._base}/${id}`)
  }

  findOne(id: ID): Observable<T> {
    return this._http.get<T>(`${this._base}/${id}`)
  }

  findAll(filters?: any): Observable<T[]> {
    const filterQuery = this.contsructFiltersQuery(filters);
    console.log({ filterQuery });
    return this._http.get<T[]>(`${this._base}`, {params: filterQuery ?? ''})
  }

  
  public contsructFiltersQuery(filters: any) {
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
