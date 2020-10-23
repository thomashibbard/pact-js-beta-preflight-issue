import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { IApiState, IAppState } from './models';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'ngrx';
  constructor(private apiState: Store<IApiState>, private api: ApiService) {}
  accessApiState() {
    this.apiState.select('api').subscribe((data) => {
      console.log('accessing api state', data);
    });
  }
  accessAppState() {
    // this.apiState.select('app').subscribe((data) => {
    //   console.log('accessing app state', data);
    // });
  }
  pingApiService() {
    return this.api.ping().subscribe((apiResponse) => {
      console.log({ apiResponse });
    });
  }
  ngOnInit() {
    this.accessApiState();
    this.pingApiService();
  }
}
