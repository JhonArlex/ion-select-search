import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { first, of } from 'rxjs';
import { IonSelectChipModule, IonSelectSearchService } from '../public-api';

import { IonSelectSearchComponent, IOption } from './ion-select-search.component';

describe('IonSelectSearchComponent', () => {
  let component: IonSelectSearchComponent;
  let fixture: ComponentFixture<IonSelectSearchComponent>;
  let ionSelectSearchService: IonSelectSearchService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IonSelectSearchComponent],
      imports: [IonSelectChipModule],
      providers: [
        { provide: IonSelectSearchService }
      ]
    })
      .compileComponents();
    ionSelectSearchService = TestBed.inject(IonSelectSearchService);
    fixture = TestBed.createComponent(IonSelectSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Cuando el componente no tiene focus, los demas elementos no deben de estar', () => {
    const divContent = fixture.debugElement.nativeElement.querySelector('.content-input');
    expect(divContent.querySelector('.icon-close')).toBeNull();
    expect(divContent.querySelector('.options-list')).toBeNull();
  });

  it('Cuando el componente tiene focus y se ha escrito, los demas elementos deben de estar', () => {
    const input = fixture.debugElement.nativeElement.querySelector('input');
    input.focus();
    input.value = 'hola';
    input.dispatchEvent(new Event('keyup'));
    fixture.detectChanges();
    const divContent = fixture.debugElement.nativeElement.querySelector('.content-input');
    expect(divContent.querySelector('.icon-close')).toBeTruthy();
    expect(divContent.querySelector('.options-list')).toBeTruthy();
  });

  it('Deberá mostrar los items enviados desde el input options cuando se escriba un texto', () => {
    const options: IOption[] = [
      { value: '1', label: 'Opcion 1' },
      { value: '2', label: 'Opcion 2' },
      { value: '3', label: 'Opcion 3' },
    ];
    component.options = options;
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('input');
    fixture.detectChanges();
    input.value = 'Opcion';
    input.dispatchEvent(new Event('keyup'));
    fixture.detectChanges();
    const divContent = fixture.nativeElement.querySelector('.content-input');
    expect(divContent.querySelector('.options-list').querySelectorAll('li').length).toBe(3);
  });

  it('Deberá filtrar segun el array enviado', () => {
    const options: IOption[] = [
      { value: '1', label: 'Opcion 1' },
      { value: '2', label: 'Opcion 2' },
      { value: '3', label: 'Opcion 3' },
    ];
    const filter = component.filterOptions('2', options);
    expect(filter.length).toBe(1);
  });

  it('Deberá filtrar los items cuando se escriba un texto en el input', () => {
    const options: IOption[] = [
      { value: '1', label: 'Opcion 1' },
      { value: '2', label: 'Opcion 2' },
      { value: '3', label: 'Opcion 3' },
    ];
    component.options = options;
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('input');
    input.value = '2';
    input.dispatchEvent(new Event('keyup'));
    fixture.detectChanges();
    expect(component.options.length).toBe(1);
  });

  it('Deberá mostrar un mensaje cuando no aparezcan opciones', () => {
    const options: IOption[] = [
      { value: '1', label: 'Opcion 1' },
      { value: '2', label: 'Opcion 2' },
      { value: '3', label: 'Opcion 3' },
    ];
    component.options = options;
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('input');
    input.value = 'a';
    input.dispatchEvent(new Event('keyup'));
    fixture.detectChanges();
    const divContent = fixture.nativeElement.querySelector('.content-input');
    expect(divContent.querySelector('.options-list')).toBeTruthy();
    expect(divContent.querySelector('.options-list').querySelector('#no-results')).toBeTruthy();
  });

  it('Deberá seleccionar un item y retornarlo on event emmiter', () => {
    let selectedOption: IOption | IOption[] | undefined;
    component.selected.pipe(first()).subscribe((option) => selectedOption = option);
    const options: IOption[] = [
      { value: '1', label: 'Opcion 1' },
      { value: '2', label: 'Opcion 2' },
      { value: '3', label: 'Opcion 3' },
    ];
    component.options = options;
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('input');
    input.value = 'Opcion';
    input.dispatchEvent(new Event('keyup'));
    fixture.detectChanges();
    const divContent = fixture.nativeElement.querySelector('.content-input');
    const li = divContent.querySelectorAll('li')[1];
    li.click();
    fixture.detectChanges();
    expect(selectedOption).toEqual(options[1]);
  });

  it('Debe validar el numero de items cuando el select es multiple', () => {
    component.multiple = true;
    const options: IOption[] = [
      { value: '1', label: 'Opcion 1' },
      { value: '2', label: 'Opcion 2' },
      { value: '3', label: 'Opcion 3' },
    ];
    component.options = options;
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('input');
    input.value = 'Opcion';
    input.dispatchEvent(new Event('keyup'));
    fixture.detectChanges();
    const divContent = fixture.nativeElement.querySelector('.content-input');
    const li = divContent.querySelectorAll('li')[1];
    const li2 = divContent.querySelectorAll('li')[2];
    li.click();
    li2.click();
    fixture.detectChanges();
    expect(component.multipleOptions.length).toBe(2);
  });

  it('Cuando el select es multiple, debe retornar varias opciones', () => {
    let selectedOption: IOption | IOption[] | undefined;
    component.selected.subscribe((option) => selectedOption = option);
    component.multiple = true;
    const options: IOption[] = [
      { value: '1', label: 'Opcion 1' },
      { value: '2', label: 'Opcion 2' },
      { value: '3', label: 'Opcion 3' },
    ];
    component.options = options;
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('input');
    input.value = 'Opcion';
    input.dispatchEvent(new Event('keyup'));
    fixture.detectChanges();
    const divContent = fixture.nativeElement.querySelector('.content-input');
    const li = divContent.querySelectorAll('li')[1];
    const li2 = divContent.querySelectorAll('li')[2];
    li.click();
    li2.click();
    fixture.detectChanges();
    expect((selectedOption as IOption[]).length).toBe(2);
  });

  it('Cuando se eliminen todos los caracteres, el array options debe quedar en su estado original', () => {
    const options: IOption[] = [
      { value: '1', label: 'Opcion 1' },
      { value: '2', label: 'Opcion 2' },
      { value: '3', label: 'Opcion 3' },
    ];
    component.options = options;
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('input');
    input.value = '2';
    input.dispatchEvent(new Event('keyup'));
    fixture.detectChanges();
    input.value = '';
    input.dispatchEvent(new Event('keyup'));
    fixture.detectChanges();
    expect(component.options.length).toBe(options.length);
  });

  

  it('Cuando se da click en un item y el select es multiple, debe de quedar con el color del hover', () => {
    component.multiple = true;
    component.theme = {
      backgroundColor: 'white',
      borderColor: 'border-slate-400',
      color: 'text-slate-40',
      focusBorderColor: 'border-amber-400',
      hoverOption: 'bg-slate-300',
    }
    const options: IOption[] = [
      { value: '1', label: 'Opcion 1' },
      { value: '2', label: 'Opcion 2' },
      { value: '3', label: 'Opcion 3' },
    ];
    component.options = options;
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('input');
    input.value = 'Opcion';
    input.dispatchEvent(new Event('keyup'));
    fixture.detectChanges();
    const divContent = fixture.nativeElement.querySelector('.content-input');
    const li = divContent.querySelectorAll('li')[1];
    li.click();
    fixture.detectChanges();
    expect(li.classList.contains('bg-slate-300')).toBeTruthy();
  });

  it('Debe devolver si el option extiste en el array multipleOption', () => {
    component.multipleOptions = [{ value: '1', label: 'Opcion 1' }];
    const exits = component.exitsOption({ value: '1', label: 'Opcion 1' });
    expect(exits).toBeTruthy();
  });

  it('Debe eliminar un item del array multipleOptions', () => {
    component.multipleOptions = [{ value: '1', label: 'Opcion 1' }];
    component.removeOption({ value: '1', label: 'Opcion 1' });
    expect(component.multipleOptions.length).toBe(0);
  });

  it('Cuando se da click en un item ya seleccionado, debe ser eliminado del array de seleccionados', () => {
    component.multiple = true;
    component.multipleOptions = [{ value: '1', label: 'Opcion 1' }];
    const options: IOption[] = [
      { value: '1', label: 'Opcion 1' },
      { value: '2', label: 'Opcion 2' },
      { value: '3', label: 'Opcion 3' },
    ];
    component.options = options;
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('input');
    input.value = 'Opcion';
    input.dispatchEvent(new Event('keyup'));
    fixture.detectChanges();
    const divContent = fixture.nativeElement.querySelector('.content-input');
    const li = divContent.querySelectorAll('li')[0];
    li.click();
    fixture.detectChanges();
    expect(component.multipleOptions.length).toBe(0);
  });

  it('Cuando se da click en el boton de cerrar en el input, debe desaparecer la ventana de opciones y el texto escrito', () => {
    const options: IOption[] = [
      { value: '1', label: 'Opcion 1' },
      { value: '2', label: 'Opcion 2' },
      { value: '3', label: 'Opcion 3' },
    ];
    component.options = options;
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('input');
    input.value = 'Opcion';
    input.dispatchEvent(new Event('keyup'));
    fixture.detectChanges();
    const iconClose = fixture.nativeElement.querySelector('.icon-close');
    iconClose.click();
    fixture.detectChanges();
    const divContent = fixture.debugElement.nativeElement.querySelector('.content-input');
    expect(divContent.querySelector('.icon-close')).toBeNull();
    expect(divContent.querySelector('.options-list')).toBeNull();
    expect(input.value).toBe('');
  });

  it('Cuando se de click por fuera del input, debe cancelar la busqueda', () => {
    const options: IOption[] = [
      { value: '1', label: 'Opcion 1' },
      { value: '2', label: 'Opcion 2' },
      { value: '3', label: 'Opcion 3' },
    ];
    component.options = options;
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('input');
    input.value = 'Opcion';
    input.dispatchEvent(new Event('keyup'));
    fixture.detectChanges();
    document.dispatchEvent(new MouseEvent('click'));
    fixture.detectChanges();
    const divContent = fixture.nativeElement.querySelector('.content-input');
    expect(divContent.querySelector('.icon-close')).toBeNull();
    expect(divContent.querySelector('.options-list')).toBeNull();
  });

  it('Cuando se da click en un item y el tipo de select es unico, se debe limpiar el componente', () => {
    component.multiple = false;
    const options: IOption[] = [
      { value: '1', label: 'Opcion 1' },
      { value: '2', label: 'Opcion 2' },
      { value: '3', label: 'Opcion 3' },
    ];
    component.options = options;
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('input');
    input.value = 'Opcion';
    input.dispatchEvent(new Event('keyup'));
    fixture.detectChanges();
    const divContent = fixture.nativeElement.querySelector('.content-input');
    const li = divContent.querySelectorAll('li')[0];
    li.click();
    fixture.detectChanges();
    expect(input.value).toBe('Opcion 1');
    expect(divContent.querySelector('.icon-close')).toBeNull();
    expect(divContent.querySelector('.options-list')).toBeNull();
  });
  
});
