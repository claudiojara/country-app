import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Country } from '../interfaces/country.interface';
import { Observable, catchError, delay, map, of, tap } from 'rxjs';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({ providedIn: 'root' })
export class CountriesService {
  constructor(private http: HttpClient) {
    this.loadCacheFromLocalStorage()
  }

  private apiUrl: string = 'https://restcountries.com/v3.1/'

  public cacheStore: CacheStore = {
    byCapital: {
      term: '', countries: []
    },
    byCountry: {
      term: '', countries: []
    },
    byRegion: {
      region: '', countries: []
    }
  }

  private saveCacheToLocalStorage(): void {
    localStorage.setItem('cacheStorage', JSON.stringify(this.cacheStore));
  }
  private loadCacheFromLocalStorage(): void {
    const cache = localStorage.getItem('cacheStorage');
    if (!cache) return;
    this.cacheStore = JSON.parse(cache);
  }

  searchCountryByAlphaCode(code: string): Observable<Country | null> {
    const url = `${this.apiUrl}alpha/${code} `;
    return this.http.get<Country[]>(url)
      .pipe(
        map(countries => countries.length > 0 ? countries[0] : null),
        catchError(() => of(null))
      );
  }

  getCountriesRequest(url: string): Observable<Country[]> {
    return this.http.get<Country[]>(url)
      .pipe(
        catchError(() => of([])),
      )
  }

  searchCapital(term: string): Observable<Country[]> {
    const url = `${this.apiUrl}capital/${term} `;
    return this.getCountriesRequest(url)
      .pipe(
        tap(countries => this.cacheStore.byCapital = { term, countries }),
        tap(() => this.saveCacheToLocalStorage())
      )
  }

  searchCountry(term: string): Observable<Country[]> {
    const url = `${this.apiUrl}name/${term} `;
    return this.getCountriesRequest(url)
      .pipe(
        tap(countries => this.cacheStore.byCountry = { term, countries }),
        tap(() => this.saveCacheToLocalStorage())
      )
  }

  searchRegion(region: Region): Observable<Country[]> {
    const url = `${this.apiUrl}region/${region} `;
    return this.getCountriesRequest(url)
      .pipe(
        tap(countries => this.cacheStore.byRegion = { region, countries }),
        tap(() => this.saveCacheToLocalStorage())
      )
  }


}
