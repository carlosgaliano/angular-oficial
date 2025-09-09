import { Component, Directive, ElementRef, HostListener, inject, input, OnChanges, OnInit, output, signal, SimpleChanges } from '@angular/core';


@Directive({ selector: '[miDi]' })
export class miDiDirective implements OnInit, OnChanges {
  private el = inject(ElementRef);
  tamano = true;
  /// Color texto
  miDi = input('');

  constructor() {
    console.log(this.el.nativeElement);
    this.el.nativeElement.setAttribute('style', this.estilosComoCadena)

  }
  estilos = {
    'font-size': this.tamano ? '24px' : '12px',
    'padding': "12px",
  };

  ngOnInit(): void {

  }
  ngOnChanges(miDi: SimpleChanges): void {
    this.el.nativeElement.style.color = this.miDi();

  }



  @HostListener('mouseenter')
  onMouseenter() {
    this.el.nativeElement.style.backgroundColor = "red"
  }

  @HostListener('mouseleave')
  onMouseleave() {
    this.el.nativeElement.style.setProperty('background-color', '')
  }

  estilosComoCadena = Object.entries(this.estilos)
    .map(([key, value]) => `${key}: ${value}`)
    .join('; ');


}

//////////


@Directive({ selector: '[otraDirectiva]' })
export class OtraDirective implements OnInit {
  inputD = input();
  outputD = output<string>();
  constructor() { }

  ngOnInit(): void {
    this.outputD.emit("Desde un adirectia")
  }
}

@Component({
  selector: 'probar-D',
  hostDirectives: [{
    directive: OtraDirective,
    inputs: ['inputD:id'],
    outputs: ['outputD']
  }],

  template: `
    <p >Otra Directiva</p>
  `
})
export class ProbarDComponent implements OnInit {




  constructor() { }

  ngOnInit() { }
}


@Component({
  selector: 'app-directive',
  imports: [miDiDirective, ProbarDComponent],
  template: `
    <h1 [miDi]='miDi'>hola 👋 {{miDi}}</h1>
    <button (click)='enviarColor("#0033ffff")'>Azuk</button>
    <button (click)='enviarColor("#ff0000ff")'>Naranja</button>
    <hr>

    <probar-D id="cc" (outputD)="recibir($event)" />
    <p>>> {{out}}</p>
  `
})
export class DirectiveComponent implements OnInit {
  miDi = "";
  out:any= "";

  ngOnInit(): void {

  }

  recibir($event: string){
    this.out = $event
  }

  enviarColor(color:string){
    console.log(color);
    this.miDi = color;

  }


}
