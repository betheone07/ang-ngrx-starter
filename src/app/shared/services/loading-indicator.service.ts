import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoadingIndicatorService {
  private _show$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  //Getter for show
  get show$(): Observable<boolean> {
    return this._show$.asObservable();
  }

  show(): void {
    this._show$.next(true);
  }

  hide(): void {
    this._show$.next(false);
  }
}
