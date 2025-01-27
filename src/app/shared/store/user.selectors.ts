import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './user.reducer';

export const selectUserState = createFeatureSelector<UserState>('users');
export const selectUsers = createSelector(
  selectUserState,
  (state) => state.users
);
export const loadingUsers = createSelector(
  selectUserState,
  (state) => state.loading
);
export const errorUser = createSelector(
  selectUserState,
  (state) => state.error
);
