import { booleanAttribute, ChangeDetectionStrategy, Component, computed, EventEmitter, Input, input, model, output, Output, OutputRef, signal } from '@angular/core';
import Base1Component from '../base_1/base_1.component';

export class BaseSlider {
  value2: number = 2;

  setValue(val: number) {
    this.value2 = val;
  }

  getValue(): number {
    return this.value2;
  }
}

@Component({
  selector: 'app-base2',
  imports: [],
  templateUrl: './base_2.component.html',
  outputs: ['otroValor']
})
export class Base2Component extends BaseSlider  {
  value = model(44);
  x = signal(this.getValue());

  constructor() {
    super();
    this.x.set(this.getValue())
  }

  emitir = output<any>();
  otroValor = new EventEmitter();


  incrementa() {
    this.value.update(oldValue => oldValue + 1);
    this.setValue(777);
    this.emitir.emit(this.value());
    this.otroValor.emit("CCCCC")
  }

}
