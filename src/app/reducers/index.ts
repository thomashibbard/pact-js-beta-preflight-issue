import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { IApiState, IAppState } from '../models';

export interface State {
  api: IApiState;
  app: IAppState;
}

export const apiInitialState = {
  api: true,
};
export const appInitialState = {
  app: true,
};

export function apiReducer(state = apiInitialState, action) {
  return state;
}
export function appReducer(state = appInitialState, action) {
  return state;
}

export const reducers: ActionReducerMap<State> = {
  api: apiReducer,
  app: appReducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];
