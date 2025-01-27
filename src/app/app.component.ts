import { Component, OnInit } from '@angular/core';
import { SpinnerComponent } from './shared/components/spinner/spinner.component';
import { TableComponent } from './shared/components/table/table.component';
import {
  ColumnOptions,
  columns,
} from './shared/components/table/column-options';
import * as UserActions from './shared/store/user.actions';
import { User } from './shared/types/user.type';
import { Observable } from 'rxjs';
import { LoadingIndicatorService } from './shared/services/loading-indicator.service';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectUsers, loadingUsers } from './shared/store/user.selectors';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [SpinnerComponent, TableComponent, CommonModule],
})
export class AppComponent implements OnInit {
  columnDefs: ColumnOptions[] = columns;
  users$: Observable<User[]>;
  loading$!: Observable<boolean>;

  constructor(
    protected readonly store: Store,
    readonly loadingIndicatorService: LoadingIndicatorService
  ) {
    this.users$ = this.store.select(selectUsers);
    this.loading$ = this.store.select(loadingUsers);
  }

  ngOnInit(): void {
    this.store.dispatch(UserActions.fetchUsers());
  }

  saveUser(user: User): void {
    this.store.dispatch(UserActions.updateUser({ user }));
  }
}
