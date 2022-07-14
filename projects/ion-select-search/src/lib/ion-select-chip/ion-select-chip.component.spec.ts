import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IonSelectChipComponent } from './ion-select-chip.component';

describe('IonSelectChipComponent', () => {
  let component: IonSelectChipComponent;
  let fixture: ComponentFixture<IonSelectChipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IonSelectChipComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IonSelectChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
