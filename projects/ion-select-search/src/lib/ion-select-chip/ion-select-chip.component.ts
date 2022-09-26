import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IOption } from '../model';

@Component({
  selector: 'ion-select-chip',
  template: `
    <div class="w-fit flex items-center bg-slate-800 rounded-md p-1">
      <span class="text-white">{{option?.label}}</span>
      <button class="icon-close" (click)="onClose()"><svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><title>Close Circle</title><path d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm75.31 260.69a16 16 0 11-22.62 22.62L256 278.63l-52.69 52.68a16 16 0 01-22.62-22.62L233.37 256l-52.68-52.69a16 16 0 0122.62-22.62L256 233.37l52.69-52.68a16 16 0 0122.62 22.62L278.63 256z"/></svg></button>
    </div>
  `,
  styleUrls: ['./ion-select-chip.component.css', '../tailwind.css']
})
export class IonSelectChipComponent implements OnInit {
  @Input()  option!: IOption;
  @Output() close = new EventEmitter<IOption>();

  constructor() { }

  ngOnInit(): void {
  }

  onClose() {
    this.close.emit(this.option);
  }

}
