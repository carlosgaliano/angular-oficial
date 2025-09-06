import { Component } from '@angular/core';


@Component({
  selector: 'button[btn]',
  imports: [],
  template: `
    <ng-content /> <!-- se pasa el interno del componente -->
  `
})
export class ButtonComponent{

}

@Component({
  selector: 'app-ng-content2',
  imports: [],
  // templateUrl: './ng-content2.component.html',
  template: `
    <button btn>
      Ver más...
    </button>
  `
})
export class NgContent2Component { }
