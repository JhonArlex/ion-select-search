import { Component, ElementRef, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { IOption, IThemeSelectSearch } from './model';

@Component({
  selector: 'ion-select-search',
  template: `    
    <div class="content-input w-full flex flex-col">
      <div class="w-full flex gap-1 p-2 flex-wrap" *ngIf="multiple">
        <ion-select-chip *ngFor="let m of multipleOptions" [option]="m" (close)="selectOption($event)"></ion-select-chip>
      </div>
      <div class="w-full flex flex-col relative">
        <input #inputSelect (focus)="validInputClear()" (keyup)="keyUpAction($event)" type="text" [class]="joinClass" class="h-12 w-full border rounded pl-4 pr-3 font-medium text-base focus:border-2 outline-none" [placeholder]="placeholder"/>
        <button *ngIf="written" (click)="cancelSearch()" class="icon-close"><svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><title>Close Circle</title><path d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm75.31 260.69a16 16 0 11-22.62 22.62L256 278.63l-52.69 52.68a16 16 0 01-22.62-22.62L233.37 256l-52.68-52.69a16 16 0 0122.62-22.62L256 233.37l52.69-52.68a16 16 0 0122.62 22.62L278.63 256z"/></svg></button>
      </div>
      <div *ngIf="written" class="options-list" [class]="theme.backgroundColor">
        <ul *ngIf="options.length > 0">
          <li *ngFor="let o of options" [class]="exitsOption(o) ? theme.hoverOption + ' p-2' : 'p-2 hover:' + theme.hoverOption" (click)="selectOption(o)">{{o.label}}</li>
        </ul>
        <p *ngIf="options.length === 0" id="no-results" class="p-4">No se encontraron resultados</p>
      <div>
    </div>
    
  `,
  styleUrls: ['./ion-select-search.component.css', './tailwind.css'],
})
export class IonSelectSearchComponent implements OnInit, OnChanges {
  @ViewChild('inputSelect') inputSelect!: ElementRef;
  @Input() options: IOption[] = [];
  @Input() multiple: boolean = false;
  @Input() placeholder: string = 'Select';
  @Input() theme: IThemeSelectSearch = {
    backgroundColor: 'white',
    borderColor: 'border-slate-400',
    color: 'text-slate-40',
    focusBorderColor: 'border-amber-400',
    hoverOption: 'bg-slate-300',
  };
  @Output() selected = new EventEmitter<IOption | IOption[]>();
  @Output() keyUp = new EventEmitter<any>();


  written: boolean = false;
  multipleOptions: IOption[] = this.options;
  optionsBackup: IOption[] = [];
  joinClass: string = '';

  constructor(
    private eRef: ElementRef
  ) { }
  ngOnChanges(changes: SimpleChanges): void {
    this.optionsBackup = this.options;
  }

  ngOnInit(): void {
    this.joinClass = this.theme.backgroundColor + ' ' + this.theme.borderColor + ' ' + this.theme.color + ' focus:' + this.theme.focusBorderColor;
  }

  @HostListener('document:click', ['$event'])
  clickout(event: { target: any; }) {
    if (!this.eRef.nativeElement.contains(event.target) && this.written) {
      this.cancelSearch();
    }
  }

  keyUpAction(event: any) {
    this.validInputClear();
    this.validOptions(event);
  }

  validOptions(event: { target: { value: string; }; }) {
    if (this.optionsBackup.length === 0) {
      this.optionsBackup = this.options
    }
    this.options = this.filterOptions(event.target.value, this.optionsBackup);

  }

  validInputClear() {
    this.written = true;
    if (this.optionsBackup.length === 0) {
      this.optionsBackup = this.options
    }
  }

  filterOptions(text: string, options: IOption[]) {
    return options.filter(option => option.label.toLowerCase().includes(text.toLowerCase()));
  }

  selectOption(option: IOption) {
    if (!this.multiple) {
      this.selected.emit(option);
      setTimeout(() => {
        this.inputSelect.nativeElement.value = option.label;
      }, 20);
      this.inputSelect.nativeElement.value = option.label;
      this.options = this.optionsBackup;
      this.written = false;
    } else {
      if (this.exitsOption(option)) {
        this.removeOption(option);
      } else {
        this.multipleOptions.push(option);
      }
      this.selected.emit(this.multipleOptions);
    }
  }

  exitsOption(option: IOption) {
    return this.multipleOptions.find(o => o.value === option.value);
  }

  removeOption(option: IOption) {
    this.multipleOptions = this.multipleOptions.filter(o => o.value !== option.value);
  }

  cancelSearch() {
    this.options = this.optionsBackup;
    this.written = false;
    this.inputSelect.nativeElement.value = '';
  }

}


