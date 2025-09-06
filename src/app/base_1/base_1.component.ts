import { Base2Component } from '../base_2/base_2.component';
import { Base1Service } from './../services/base1.service';
import { Component, inject, linkedSignal, resource, signal, OnInit, input } from '@angular/core';

@Component({
  selector: 'app-base1',
  imports: [Base2Component],
  templateUrl: './base_1.component.html',
})
export default class Base1Component {

  volume = signal(22);
  otroValor = 22;

  getValue(): number {
    return this.otroValor;
  }

  menos() {
    this.volume.update(v => v - 2)
  }

  resibeDelEmiter = signal("");

  recibe(ee: any) {
    console.log(ee);

    this.resibeDelEmiter.set(ee);
  }

  dette($event:Event){
    console.log($event)
  }

}
