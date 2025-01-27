import { delay, finalize, Observable, tap } from 'rxjs';
import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoadingIndicatorService } from './loading-indicator.service';

export const loadingInterceptor = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const loadingIndicatorService = inject(LoadingIndicatorService);

  // Set the loading status to true
  loadingIndicatorService.show();
  return next(req).pipe(
    delay(1000),
    // Set the status to false if there are any errors/request is completed
    finalize(() => loadingIndicatorService.hide())
  );
};
