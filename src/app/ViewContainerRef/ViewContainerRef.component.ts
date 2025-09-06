import { NgTemplate2Component } from './../ng-template/ng-template.component';
import { AfterViewInit, Component, ElementRef, inject, Input, input, TemplateRef, ViewChild, viewChild, ViewContainerRef } from '@angular/core';
import { CommonModule, NgComponentOutlet } from "@angular/common"
// TODO componente hijo
// ! texto
// ? otro
// @ otro

@Component({
  selector: 'app-hijo',
  imports: [CommonModule],
  template: `
    <button  (click)="mostrar()">Mostrar</button>
    <ng-container #conteedor />
  `
})
export class hijoComponen implements AfterViewInit {

  @ViewChild('conteedor', { read: ViewContainerRef }) viewContainer!: ViewContainerRef;
  // fracmento = input();
  @Input() template!: TemplateRef<any>;
  // nombre = input<string>();
  @Input() nombre:object = {};

  ngAfterViewInit() {
    console.log(this.nombre);

  }

  mostrar() {
    this.viewContainer.createEmbeddedView(this.template, this.nombre);
  }
}


@Component({
  selector: 'app-view-container-ref',
  imports: [hijoComponen],
  template: `
    <h1>Componente con fracmento</h1>
    <ng-template #ngFracmentoTemplate let-nombre='nombre' let-edades="edad">
      <p>Este es un gragmento {{nombre}} : {{edades}} 👋</p>
    </ng-template>
    <app-hijo [template]='ngFracmentoTemplate' [nombre]='{nombre: "Carlos", edad: 45}' />
  `
})
export class ViewContainerRefComponent {


}
