import { CommonModule } from '@angular/common';
import { Component, computed, Directive, effect, ElementRef, inject, input, OnInit, TemplateRef, viewChild, ViewChildren, ViewContainerRef, Injector } from '@angular/core';
import { CreateComponentComponent } from "../createComponent/createComponent.component";

// TODO Falta por hacer

@Directive({
  selector: '[tema]'
})
export class TemaDirectiva {
  tema = input<'luz' | 'noche'>();
   constructor(private el: ElementRef) {
    // Efecto reactivo que se ejecuta cuando cambia el input
    effect(() => {
      const value = this.tema();
      this.el.nativeElement.classList.remove('luz', 'nohe');
      this.el.nativeElement.classList.add(value);
    });
  }
}
//////

@Component({
  selector: 'Tuno',
  template: `<h3>componente uno 🤑</h3>`
})
export class UnoComponent{}

@Component({
  selector: 'Tdos',
  template: `<h3>componente dos</h3>`
})
export class DosComponent{}

///////

@Directive({
  selector: '[myDirectiva]'
})
export class MiDirectiva implements OnInit {
  TemplateRef = inject(TemplateRef);
  ViewContainerRef = inject(ViewContainerRef);

  ngOnInit() {
    const dia = new Date().getDay();
    console.log(dia);
    const apellido = { apellido: "Galiano 🤓" }
    if (dia === 2) {
      this.ViewContainerRef.createEmbeddedView(this.TemplateRef, { apellido: apellido })
    }
  }
}

@Component({
  selector: 'app-ng-template-outlet2',
  imports: [CommonModule, MiDirectiva, TemaDirectiva, CreateComponentComponent],
  providers: [],
  styles: [`
    .noche{
      background-color: black;
      color: aqua;
      padding: 12px
    }
    .luz{
      background-color: burlywood;
      color: #000;
      padding: 12px
    }
  `],
  template: `
  <ng-template #plantilla let-name="nombre">
    <p>Nombre {{name}}</p>
  </ng-template>

  <!--Uso de Directiva-->
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
  <ng-container [ngComponentOutlet]="mostrar()"></ng-container>

  <hr>
  <h1>Rendering template fragments</h1>
  <div [tema]='"noche"'>
    <ng-container [ngTemplateOutlet]="mostrarFracmento()"></ng-container>
    <ng-template #tuno>Plantilla uno</ng-template>
    <ng-template #tdos>Plantilla dos</ng-template>
  </div>
  <br>
  @defer{
    <app-create-component />
  }@placeholder(minimum 2000ms) {
    <p>Se esta cargando...</p>
  }
  <br>
  @defer{
    <app-create-component />
  }@loading(after 1000ms; minimum 1s) {
    <p>--🤯--</p>
  } @error {
    <p>Failed to load large component.</p>
  }

  @defer (on interaction) {
      <p>XXXXX</p>
  }@placeholder{
    <div style="border:solid; margin:12px">
      <p>espera</p>
    </div>
  }

  `
})
export class NgTemplateOutlet2Component {
  is = input(true);

  mostrar = computed(()=> this.is() ? UnoComponent : DosComponent)

  // Rendering template fragments
  tuno = viewChild("tuno", {read: TemplateRef});
  tdos = viewChild("tdos", {read: TemplateRef});
  mostrarFracmento = computed(()=> this.is() ? this.tuno() : this.tdos() )

}
