import { Component, TemplateRef, viewChild, ViewRef, ViewContainerRef, OnInit, signal, Injector, Directive, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; // ante se hacia



@Component({
  selector: 'app-ng-template-outlet',
  imports: [CommonModule],
  // templateUrl: './NgTemplateOutlet.component.html',
  template: `
    <div id="contenedor">
      @if (true) {
        <ng-container *ngTemplateOutlet="nombre; context: {item: array}"></ng-container>
      }@else {
        <ng-container *ngTemplateOutlet="apellido2"></ng-container>
      }
    </div>

    <ng-template #nombre let-item="item">
      @for (persona of item; track $index) {
        <p>{{persona.nombre}} : {{persona.edad}} años</p>
      }
    </ng-template>
    <ng-template #apellido2>Hola</ng-template>

    <!------->



  `,
})
export class NgTemplateOutletComponent implements OnInit {

  nombre_ = "Carlos";
  apellido_ = "Galiano";

  // ref = viewChild("ref", { read: ViewContainerRef });
  // template = viewChild("template", { read: TemplateRef });

  array = [
    { nombre: "carlos", edad: 32 },
    { nombre: "melissa", edad: 52 },
  ]

  ///////////////



  ///////////////

  ngOnInit() {

  }





}
