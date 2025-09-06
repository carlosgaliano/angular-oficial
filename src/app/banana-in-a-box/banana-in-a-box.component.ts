import { Component, model, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: "contador",
  imports: [],
  template: `
    <button (click)="updateCount(-1)">-</button>
    <span style="margin:12px">{{ count() }}</span>
    <button (click)="updateCount(+1)">+</button>
 `
})
export class ContadorComponent {
  count = model<number>(0);

  updateCount(valor: number): void {
    this.count.update((actual => actual + valor));
  }
}

@Component({
  selector: 'app-banana-in-a-box',
  imports: [FormsModule, ContadorComponent],
  // templateUrl: './banana-in-a-box.component.html',
  template: `
      <h2>Hello {{ firstName }}!</h2>
      <input type="text" [(ngModel)]="firstName" />
      <br>
      <br>
      <contador [(count)]="initialCount"></contador>
      <p>{{initialCount}}</p>

      @for (item of [1,2,3,4];
        track $index;
        let e = $even;
        let c= $count;
        let f = $first;
        let last = $last;
        let odd = $odd) {
          item {{item}} = e {{e}} = cuantos items {{c}} = first {{f}} = last <b>{{last}}</b> last {{odd}}<br>
      } @empty {
        <p>-fin-</p>
      }
  `,
})
export class BananaInABoxComponent {
  firstName = "Carlos";
  initialCount = 18;
}


