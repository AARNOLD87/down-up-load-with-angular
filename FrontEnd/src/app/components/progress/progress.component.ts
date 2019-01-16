import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: 'progress.component.html'
})

export class ProgressComponent {
  @Input() public percentage: number;
  @Input() public show: boolean;

  constructor() { }
}
