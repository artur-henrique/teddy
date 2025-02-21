import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-btn',
  imports: [],
  templateUrl: './btn.component.html',
  styleUrl: './btn.component.scss'
})
export class BtnComponent {
  @Output() btnClick = new EventEmitter<void>();

  onClick() {
    this.btnClick.emit();
  }
}
