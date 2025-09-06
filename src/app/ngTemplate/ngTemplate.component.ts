import { AfterRenderRef, AfterViewInit, Component, ElementRef, inject, OnInit, signal, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { Base1Service } from '../services/base1.service';

@Component({
  selector: 'app-ng-template',
  imports: [],
  // templateUrl: './ngTemplate.component.html',
  template: `
    <p>This is a normal element</p>
    <ng-template #plantilla>
      <p>This is a template fragment</p>
    </ng-template>
    <ng-template #persona>
      <p>nombre: {{nombre}}</p>
      <p>edad {{edad}}</p>
    </ng-template>
    <button (click)="add()">add</button>
    <button (click)="clear()">limpiar</button>
    <div #container></div>
  `,
})
export class NgTemplateComponent implements AfterViewInit {

  @ViewChild("plantilla") plantilla!: TemplateRef<any>;
  @ViewChild("container", { read: ViewContainerRef }) container!: ViewContainerRef;

  @ViewChild("persona") persona!: TemplateRef<any>;



  nombre!: string;
  edad!: number;


  valor = signal(Base1Service)

  add() {
    this.container.createEmbeddedView(this.persona, {
      inject: () => this.valor()
    })
  }

  clear() {
    this.container.clear()
  }

  constructor(public elementRef:ElementRef ){
    elementRef = inject(ElementRef);

  }


  ngAfterViewInit() {
    console.log(this.plantilla);
    console.log(this.elementRef.nativeElement);

  }


}
