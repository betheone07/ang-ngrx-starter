import {
  provideHttpClient,
  withInterceptors,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideStore } from '@ngrx/store';
import { provideAnimations } from '@angular/platform-browser/animations';
import { loadingInterceptor } from './shared/services/loading-indicator.interceptor';
import { userReducer } from './shared/store/user.reducer';
import { provideEffects } from '@ngrx/effects';
import { UserEffects } from './shared/store/user.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore({ users: userReducer }),
    provideEffects([UserEffects]),
    provideAnimations(),
    provideHttpClient(
      withInterceptors([loadingInterceptor]),
      withInterceptorsFromDi()
    ),
  ],
};
