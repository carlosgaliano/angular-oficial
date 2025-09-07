import { HttpClient } from '@angular/common/http';
import { Component, inject, Inject, Input, input, TemplateRef, ViewChild, ViewContainerRef, Injectable, signal, OnInit, Signal, Pipe, AfterViewInit } from '@angular/core';
import { from, map, of } from 'rxjs';
import { concatMap, mergeMap } from "rxjs/operators";


interface Datos {
  id: number,
  nombre: string,
  edad: number
}

@Injectable({
  providedIn: "root"
})
export class Servicio {



  data = signal<Datos[]>([
    {
      id: 1,
      nombre: "Carlos",
      edad: 45
    },
    {
      id: 2,
      nombre: "Melissa",
      edad: 40
    }
  ]);




}


@Component({
  selector: "hijo",
  template: `
    <h1>Hijo</h1>
    <button (click)="mostrar()">Mostrar plantilla del padre</button>
    <ng-container #contenedor />
  `
})
export class hijoComponen2 {
  @Input() data!: Datos[];



  @Input() plantilla!: TemplateRef<any>;
  // @ViewChild("contenedor", { read: ViewContainerRef }) contenedor!: ViewContainerRef;
  // otra alternativa
  contenedor = inject(ViewContainerRef);

  mostrar() {

    console.log(this.data);
    const context = { personas: this.data };

    this.contenedor.createEmbeddedView(this.plantilla, context)
  }
}


@Component({
  selector: 'app-create-embedded-view',
  imports: [hijoComponen2],
  providers: [],
  // templateUrl: './createEmbeddedView.component.html',
  template: `
  <h1>Padre</h1>
  <ng-template #plantilla let-personas="personas">
    @for (item of personas; track item.id) {
    <ul>
        <li>Nombre: {{item.nombre}}</li>
        <li>Edad: {{item.edad}}</li>
      </ul>
    }
  </ng-template>
  <div style="border: solid; padding: 12px">
    <hijo [plantilla]="plantilla" [data]="servicio.data()"  />
  </div>
  `
})
export class CreateEmbeddedViewComponent implements AfterViewInit {


  servicio = inject(Servicio);

  ngAfterViewInit() {


  }

}


