export interface IPageable{
    offset?: number;
    pageNumber?: number;
    pageSize?: number
    getPageNumber(): number;
    getPageSize(): number;
    next(totalElements: number): IPageable;
    previous(totalElements: number): IPageable;
}

export class Page<T> {
    public elements?: any;
    public totals?: number;
    public pages?: number;
    public current?: IPageable;
    public next?: IPageable;
     public previous?: IPageable;
}

export class PageableSearch {
    public query?: any;
    public pageable?: IPageable
  }