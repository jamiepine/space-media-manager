/*
 * Reducers: YOU LIKELY WON'T NEED TO EDIT THIS FILE.
 * This is boilerplate code to connect your store to debug tools and HMR.
 * Customize your root reducer and AppState in `root.ts`.
 */
import { compose } from '@ngrx/store';
import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { Params, RouterStateSnapshot } from '@angular/router';
import {
  routerReducer,
  RouterReducerState,
  RouterStateSerializer
} from '@ngrx/router-store';
// storeFreeze is currently conflicting with @ngrx/router-store
import { storeFreeze } from 'ngrx-store-freeze';
import { storeLogger } from 'ngrx-store-logger';
import { AppState } from './root';
export { reducers, AppState } from './root';

declare const ENV: string;

// Generate a reducer to set the root state in dev mode for HMR
function stateSetter(reducer: ActionReducer<any>): ActionReducer<any> {
  return function(state, action: any) {
    if (action.type === 'SET_ROOT_STATE') {
      return action.payload;
    }
    return reducer(state, action);
  };
}

function logger(reducer: ActionReducer<AppState>): any {
  return storeLogger()(reducer);
}

export const metaReducers = ENV === 'development'
  ? [stateSetter, logger, storeFreeze]
  : [];

export interface RouterStateUrl {
  url: string;
  queryParams: Params;
}

// The CustomSerializer improves @ngrx performance and allows storeFreeze
// to co-exist with the router-store.
// See: https://github.com/ngrx/platform/blob/master/docs/router-store/api.md
export class CustomSerializer implements RouterStateSerializer<RouterStateUrl> {
  public serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    const { url } = routerState;
    const queryParams = routerState.root.queryParams;

    // Only return an object including the URL and query params
    // instead of the entire snapshot
    return { url, queryParams };
  }
}
