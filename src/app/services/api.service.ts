import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { requestHeaders as headers } from './headers';
interface IStore {
  api: {
    [key: string]: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiBaseUrl: string;
  constructor(private http: HttpClient, private store: Store<IStore>) {
    this.store.select('api').subscribe((api) => {
      this.apiBaseUrl = api.baseUrl;
    });
  }
  loadItems(config?: any) {
    return this.http.get(`${this.apiBaseUrl}/api/items`, {
      headers,
    });
  }
}
