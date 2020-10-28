# Pact Preflight Minimum Reproducible Example

This reproduces an issue where when the mock server has CORS enabled, it fails with the `OPTIONS` preflight request.

- Service tested: _./src/app/services/api.service.ts_
- Pact test: _./pact/preflight.pact.spec.ts_

Reproduce in this repo:

1. `npm install`
2. `npm run pact`

See Pact `header` mismatches and unexpected `OPTIONS`.

```
Mock server failed with the following mismatches:

  1) The following request was not expected:
      Method: OPTIONS
      Path: /api/items
      Headers:
        access-control-request-headers: Authorization, Accept-Version
        access-control-request-method: GET
        connection: keep-alive
        content-length: 0
        host: 127.0.0.1:8889
        origin: http://localhost
        user-agent: Mozilla/5.0 (darwin) AppleWebKit/537.36 (KHTML, like Gecko) jsdom/16.4.0

  2) The following request was expected but not received:
      Method: GET
      Path: /api/items
      Query String:
      Headers:
        Accept: application/json;v=3
        Accept-Version: 1.0
        Authorization: Bearer my_token
        Content-Type: application/json
```
