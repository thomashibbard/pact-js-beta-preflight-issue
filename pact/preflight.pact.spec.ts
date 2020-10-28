import * as path from 'path';
import { HTTPMethod } from '@pact-foundation/pact/common/request';
import { TestBed } from '@angular/core/testing';
import {
  HttpClientModule,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable } from 'rxjs';
import { provideMockStore } from '@ngrx/store/testing';
import {
  MatchersV3 as Matchers,
  PactV3 as Pact,
  V3MockServer,
} from '@pact-foundation/pact/v3';

import { ApiService } from '../src/app/services/api.service';

import { requestHeaders, responseHeaders } from '../src/app/services/headers';
const PACT_PORT = 8889;

describe('preflight test', () => {
  let apiService: ApiService;
  let provider: Pact;
  beforeEach(async () => {
    provider = new Pact({
      cors: true,
      port: PACT_PORT,
      dir: path.resolve(process.cwd(), 'pact', 'pacts'),
      consumer: 'my-consumer',
      provider: 'my-provider',
    });
    const initialState = {
      api: {
        baseUrl: `http://127.0.0.1:${PACT_PORT}`,
      },
    };

    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        ApiService,
        provideMockStore({
          initialState,
        }),
      ],
    });
    apiService = TestBed.get(ApiService);
  });

  it('should get items', async () => {
    const itemExample = { id: 0, value: 'item a' };
    const EXPECTED_BODY = Matchers.eachLike(itemExample);

    provider
      .given('get_items', {
        some: 'key',
        value: 'pairs',
      })
      .uponReceiving('a request for items')
      .withRequest({
        method: 'GET',
        path: `/api/items`,
        headers: requestHeaders,
      })
      .willRespondWith({
        status: 200,
        body: EXPECTED_BODY,
        headers: responseHeaders,
      });
    return provider.executeTest(async (mockserver) => {
      return apiService
        .loadItems({})
        .toPromise()
        .then((response: any) => {
          console.log({ __response__: JSON.stringify(response.value) });
          return expect(response.value[0]).toEqual(itemExample);
        });
    });
  });
});
