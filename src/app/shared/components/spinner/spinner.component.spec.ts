import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SpinnerComponent } from './spinner.component';
import { CommonModule } from '@angular/common';
import { By } from '@angular/platform-browser';

describe('SpinnerComponent', () => {
  let component: SpinnerComponent;
  let fixture: ComponentFixture<SpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpinnerComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(SpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
  it('should display the spinner when showSpinner is true', () => {
    component.showSpinner = true;
    fixture.detectChanges();
    const spinnerElement = fixture.debugElement.query(By.css('.spinner'));
    expect(spinnerElement).toBeTruthy();
  });
  it('should not display the spinner when showSpinner is false', () => {
    component.showSpinner = false;
    fixture.detectChanges();
    const spinnerElement = fixture.debugElement.query(By.css('.spinner'));
    expect(spinnerElement).toBeNull();
  });
});
