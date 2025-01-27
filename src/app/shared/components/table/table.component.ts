import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ColumnOptions } from './column-options';
import { Observable, tap } from 'rxjs';
import { User } from '../../types/user.type';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class TableComponent implements OnInit {
  @Input() columns: ColumnOptions[] = [];
  @Input() users$!: Observable<User[]>;
  @Output() saveUser: EventEmitter<User> = new EventEmitter<User>();
  formGroup!: FormGroup;
  edits = new Set<number>();
  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    this.formGroup = this.fb.group({
      users: this.fb.array([]),
    });
    this.users$ = this.users$.pipe(
      tap((users) => {
        const usersFormArray = this.formGroup.get('users') as FormArray;
        usersFormArray.clear();
        users.forEach((user) =>
          usersFormArray.push(this.createIndividualUserFormGroup(user))
        );
      })
    );
  }

  createIndividualUserFormGroup(user: User): FormGroup {
    const controls: { [key: string]: any } = {};
    this.columns.forEach((col) => {
      // Adding validation for required and email format if the column is 'email'
      const validators = [Validators.required];
      if (col.key === 'email') {
        validators.push(Validators.email);
      }
      controls[col.key] = [user[col.key] || '', validators];
    });
    return this.fb.group(controls);
  }

  get usersFormArray(): FormArray {
    return this.formGroup.get('users') as FormArray;
  }

  onEdit(user: User): void {
    this.edits.add(user.id);
  }

  onSave(user: User, index: number): void {
    const userGroup = this.usersFormArray.at(index);
    this.edits.delete(user.id);
    const updatedUser = { ...user, ...userGroup.value };
    this.saveUser.emit(updatedUser);
  }

  isInvalid(controlName: string, index: number) {
    const control = this.usersFormArray.at(index).get(controlName);
    return control?.invalid && control?.touched;
  }
}
