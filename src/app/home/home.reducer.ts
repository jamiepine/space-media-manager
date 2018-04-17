import { Action } from '@ngrx/store';

import * as home from './home.actions';

export interface HomeState {
  value?: string;
}

export const initialState: HomeState = {};

export function homeReducer(state = initialState, action: home.Actions): HomeState {
  switch (action.type) {

    case home.SET_VALUE: {
      return Object.assign({}, state, {
        value: action.payload
      });
    }

    default: {
      return state;
    }
  }
}
