import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '../services/user.service';
import * as UserActions from './user.actions';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private userService: UserService) {}
  fetchUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.fetchUsers),
      mergeMap(() =>
        this.userService.fetchUsers().pipe(
          map((users) => UserActions.fetchUsersSuccess({ users })),
          catchError((error) =>
            of(UserActions.fetchUsersFailure({ error: error.message }))
          )
        )
      )
    )
  );
  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.updateUser),
      mergeMap(({ user }) =>
        this.userService.updateUser(user).pipe(
          map((updatedUser) =>
            UserActions.updateUserSuccess({ user: updatedUser })
          ),
          catchError((error) =>
            of(UserActions.updateUserFailure({ error: error.message }))
          )
        )
      )
    )
  );
}
