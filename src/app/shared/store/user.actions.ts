import { createAction, props } from '@ngrx/store';
import { User } from '../types/user.type';

export const fetchUsers = createAction('[User API] Fetch Users');
export const fetchUsersSuccess = createAction(
  '[User API] Fetch Users Success',
  props<{ users: User[] }>()
);
export const fetchUsersFailure = createAction(
  '[User API] Fetch Users Failure',
  props<{ error: string }>()
);

export const updateUser = createAction(
  '[User API] Update User',
  props<{ user: User }>()
);
export const updateUserSuccess = createAction(
  '[User API] Update User Success',
  props<{ user: User }>()
);
export const updateUserFailure = createAction(
  '[User API] Update User Failure',
  props<{ error: string }>()
);
