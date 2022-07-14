import { TestBed } from '@angular/core/testing';

import { IonSelectSearchService } from './ion-select-search.service';

describe('IonSelectSearchService', () => {
  let service: IonSelectSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IonSelectSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
