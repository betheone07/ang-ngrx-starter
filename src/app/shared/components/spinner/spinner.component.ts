import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [CommonModule],
  template: ` <span *ngIf="showSpinner" class="spinner"></span>`,
  styleUrl: './spinner.component.scss'
})
export class SpinnerComponent {
  @Input() showSpinner: boolean = false;
}
