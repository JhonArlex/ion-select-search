import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IOption } from './ion-select-search.component';

@Injectable({
  providedIn: 'root'
})
export class IonSelectSearchService {

  options: BehaviorSubject<IOption[]> = new BehaviorSubject([] as IOption[]);

  constructor() { }

}
