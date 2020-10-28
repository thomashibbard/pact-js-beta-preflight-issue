import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { IApiState, IAppState } from './models';

import { AppComponent } from './app.component';
import { store } from '@angular/core/src/render3';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let apiStore: MockStore<IApiState>;
  const initialState = { api: false };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
      providers: [
        provideMockStore({
          initialState,
          selectors: [
            { selector: 'api', value: { api: true } },
            { selector: 'app', value: { app: true } },
          ],
        }),
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    apiStore = TestBed.get(Store);
    console.log({ __STORE__: apiStore.select('api') });
  }));
  it('should always pass', () => {
    console.log('in always truthy expectation');
    expect(true).toBeTruthy();
  });
  it('should test the api store', () => {
    // apiStore.overrideSelector('api', {api: true})
  });
});
