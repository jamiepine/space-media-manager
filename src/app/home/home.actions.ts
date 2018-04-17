import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Action } from '@ngrx/store';

export const SET_VALUE = '[Home] Set Value';

export class SetValue implements Action {
  public readonly type = SET_VALUE;

  constructor(public payload: string) {}
}

export type Actions = SetValue;
