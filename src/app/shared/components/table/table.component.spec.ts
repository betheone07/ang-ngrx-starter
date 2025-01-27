import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { TableComponent } from './table.component';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
  const mockUsers = [
    { id: 1, name: 'User 1', email: 'user1@example.com' },
    { id: 2, name: 'User 2', email: 'user2@example.com' },
  ];
  const mockColumns = [
    { key: 'name', name: 'Name', width: '150px', editable: true },
    { key: 'email', name: 'Email', width: '150px', editable: false },
  ];
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableComponent, ReactiveFormsModule],
    }).compileComponents();
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    component.users$ = of(mockUsers);
    component.columns = mockColumns;
    fixture.detectChanges();
  });
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
  it('should display users in the table', () => {
    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(rows.length).toBe(mockUsers.length);
  });
  it('should display columns in the table header', () => {
    const headerCells = fixture.debugElement.queryAll(By.css('thead th'));
    expect(headerCells.length).toBe(mockColumns.length + 1);
  });
  it('should show "Edit" button when not in edit mode', () => {
    const editButtons = fixture.debugElement.queryAll(By.css('.edit-btn'));
    expect(editButtons.length).toBe(mockUsers.length);
    expect(editButtons[0].nativeElement.textContent).toBe(' Edit ');
  });
  it('should show "Save" button when in edit mode', () => {
    component.edits.add(1);
    fixture.detectChanges();
    const saveButtons = fixture.debugElement.queryAll(By.css('.save-btn'));
    expect(saveButtons.length).toBe(1);
    expect(saveButtons[0].nativeElement.textContent).toBe(' Save ');
  });
  it('should call onSave when Save button is clicked', () => {
    spyOn(component, 'onSave');
    component.edits.add(1);
    fixture.detectChanges();
    const saveButton = fixture.debugElement.query(By.css('.save-btn'));
    saveButton.triggerEventHandler('click', null);
    expect(component.onSave).toHaveBeenCalled();
  });
});
