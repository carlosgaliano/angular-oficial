import { Component, TemplateRef, ViewChild, OnInit, AfterViewInit, ElementRef, ViewContainerRef, inject } from '@angular/core';

@Component({
  selector: 'app-ng-template',
  imports: [],
  // templateUrl: './ng-template.component.html',
  template: `
    <div #contenedor></div>

    <p #plantilla1>Prueba {{nombre}}</p>
    <ng-template #plantilla2>Prueba ----</ng-template>



  `
})
export class NgTemplate2Component implements OnInit, AfterViewInit {

  nombre = "carlos";

  @ViewChild('contenedor', {read: ViewContainerRef}) contenedor!: ViewContainerRef;

  @ViewChild('plantilla1') plantilla1!: ElementRef<HTMLElement>;

  @ViewChild('plantilla2') plantilla2!: TemplateRef<HTMLElement>;

  ngOnInit() {

  }
  context = { name: 'Juan' };

  ngAfterViewInit() {
    console.log(this.plantilla1.nativeElement);

    this.contenedor.createEmbeddedView(this.plantilla2 );

  }
}
