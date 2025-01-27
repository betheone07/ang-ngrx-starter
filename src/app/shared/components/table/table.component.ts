import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Observable, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ColumnOptions } from './column-options';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class TableComponent<T extends { [key: string]: any }>
  implements OnInit
{
  @Input() columns: ColumnOptions[] = [];
  @Input() data$!: Observable<T[]>;
  @Output() saveItem: EventEmitter<T> = new EventEmitter<T>();
  formGroup!: FormGroup;
  edits = new Set<number>();
  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    this.formGroup = this.fb.group({
      items: this.fb.array([]),
    });
    this.data$ = this.data$.pipe(
      tap((items) => {
        const itemsFormArray = this.formGroup.get('items') as FormArray;
        itemsFormArray.clear();
        items.forEach((item) =>
          itemsFormArray.push(this.createIndividualItemFormGroup(item))
        );
      })
    );
  }
  createIndividualItemFormGroup(item: T): FormGroup {
    const controls: { [key: string]: unknown } = {};
    this.columns.forEach((col) => {
      // using required as default validator
      const validators = [Validators.required];
      if (col.type === 'email') {
        validators.push(Validators.email); // custom email validation
      }
      controls[col.key] = [item[col.key] || '', validators];
    });
    return this.fb.group(controls);
  }
  get itemsFormArray(): FormArray {
    return this.formGroup.get('items') as FormArray;
  }
  onEdit(index: number): void {
    this.edits.add(index);
  }
  onSave(item: T, index: number): void {
    const itemGroup = this.itemsFormArray.at(index);
    this.edits.delete(index);
    const updatedItem = { ...item, ...itemGroup.value };
    this.saveItem.emit(updatedItem);
  }
  isInvalid(controlName: string, index: number) {
    const control = this.itemsFormArray.at(index).get(controlName);
    return control?.invalid && control?.touched;
  }
}
