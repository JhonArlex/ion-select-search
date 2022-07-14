import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonSelectChipModule } from './ion-select-chip/ion-select-chip.module';
import { IonSelectSearchComponent } from './ion-select-search.component';



@NgModule({
  declarations: [
    IonSelectSearchComponent,
  ],
  imports: [
    CommonModule,
    IonSelectChipModule
  ],
  exports: [
    IonSelectSearchComponent,
  ],
  entryComponents: [
  ]
})
export class IonSelectSearchModule { }
