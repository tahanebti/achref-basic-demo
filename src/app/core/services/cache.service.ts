import { Inject, Injectable } from '@angular/core';

import { InjectionToken } from '@angular/core';

export const CACHE_SERVICE: InjectionToken<string> = new InjectionToken<string>('CACHE_SERVICE');

export interface ICacheService {
  setItem<T>(key: string, t: T): void;
  getItem<T>(key: string): T | null;
  removeItem<T>(key: string): void;
  clear(): void;
}


@Injectable({
  providedIn: 'root'
})
export class CacheService implements ICacheService {
  constructor(
    @Inject(Window)
    private _window: Window
  ) { }

  public setItem<T>(key: string, t: T): void {
    this._window.sessionStorage.setItem(key, JSON.stringify(t));
  }

  public getItem<T>(key: string): T | null {
    const value = this._window.sessionStorage.getItem(key);
    return value ? JSON.parse(value) as T : null;
  }

  public removeItem<T>(key: string): void {
    this._window.sessionStorage.removeItem(key);
  }

  public clear(): void {
    this._window.sessionStorage.clear();
  }
}