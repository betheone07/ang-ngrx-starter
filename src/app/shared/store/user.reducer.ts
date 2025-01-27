import { createReducer, on } from '@ngrx/store';
import * as UserActions from './user.actions';
import { User } from '../types/user.type';

export interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
}
export const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};
export const userReducer = createReducer(
  initialState,
  on(UserActions.fetchUsers, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(UserActions.fetchUsersSuccess, (state, { users }) => ({
    ...state,
    users,
    loading: false,
    error: null,
  })),
  on(UserActions.fetchUsersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(UserActions.updateUser, (state) => ({ ...state, loading: true })),
  on(UserActions.updateUserSuccess, (state, { user }) => ({
    ...state,
    users: state.users.map((u) => (u.id === user.id ? user : u)),
    loading: false,
    error: null,
  })),
  on(UserActions.updateUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
