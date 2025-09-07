import { CommonModule } from '@angular/common';
import { Component, computed, Directive, inject, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

// TODO Falta por hacer

@Directive({
  selector: '[myDirectiva]'
})
export class MiDirectiva implements OnInit {
  TemplateRef = inject(TemplateRef);
  ViewContainerRef = inject(ViewContainerRef);

  ngOnInit() {
    const dia = new Date().getDay();
    console.log(dia);
    const apellido = { apellido: "Galiano" }
    if (dia === 0) {
      this.ViewContainerRef.createEmbeddedView(this.TemplateRef, { apellido: apellido })
    }
  }
}


@Component({
  selector: 'uno',
  template: `<h3>componente uno</h3>`
})
export class UnoComponent{}

@Component({
  selector: 'dos',
  template: `<h3>componente dos</h3>`
})
export class DosComponent{}

@Component({
  selector: 'app-ng-template-outlet2',
  imports: [CommonModule, MiDirectiva],
  providers: [],
  template: `
  <ng-template #plantilla let-name="nombre">
    <p>Nombre {{name}}</p>
  </ng-template>

  // @ Uso de Directiva
  <ng-template myDirectiva let-apellido="apellido.apellido">
    <h1>hola {{apellido}}</h1>
  </ng-template>
  <hr>
  <ng-container
    [ngTemplateOutlet]="plantilla"
    [ngTemplateOutletContext]="{nombre: 'Carlos'}"
  ></ng-container>

  <hr>

  <h1>Rendering components</h1>
  <ng-container [ngComponentOutlet]="mostar()"></ng-container>


  `
})
export class NgTemplateOutlet2Component {

  mostar = computed(()=> (false) ? UnoComponent : DosComponent)

}
