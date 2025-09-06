import { Component, input, signal } from '@angular/core';
import { NgComponentOutlet } from '@angular/common';

@Component({
  selector: "uno",
  imports: [],
  template: `
    <p>--uno--</p>
  `
})
export class Uno {

}

@Component({
  selector: "dos",
  imports: [],
  template: `
    <p>--dos--</p>
  `
})
export class Dos {

}

//////


@Component({
  selector: 'app-ng-component-outlet',
  imports: [NgComponentOutlet],
  // templateUrl: './NgComponentOutlet.component.html',
  template: `
    <h1>sss</h1>
    <ng-content *ngComponentOutlet="fn()"></ng-content>
    <button (click)="cambiar()" type="button">cambiar</button>
  `
})
export class NgComponentOutletComponent {
  user = signal(true);
  fn() {
    return this.user() ? Uno : Dos;

  }

  cambiar(){
    console.log(this.user());
    this.user.set(false)

  }



}
