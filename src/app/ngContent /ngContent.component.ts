import { Component, HostBinding, HostListener, ViewChild, computed, contentChild, viewChild, OnInit, signal, inject, ElementRef, input } from '@angular/core';

@Component({
  host: {
    '[class.active]': 'true',
  },
  selector: 'custom-card',
  template: `
    <div class="card-shadow">
      <ng-content select="[parrafo-dos]">XXX</ng-content>
      <div style="border:solid">----</div>
      <ng-content select="[parrafo-uno]"></ng-content>
    </div>
  `,
})
export class CustomCard {
  @HostBinding('attr.aria-dedo')
  value: number = 0;

  @HostBinding('attr.data-dd')
  get dedito() {
    return "4"
  }

  @HostListener('click', ['$event'])
  click(event: Event) {
    console.log("---", event);
  }

  texto: string = "uuuu";

  otroTexto = signal("bbbbb");

  constructor() {
    this.texto = "hhhhhhhhh";
  }

}
//////////////////////////
@Component({
  selector: 'app-ng-content-',
  imports: [CustomCard],
  templateUrl: './ngContent.component.html',
})
export class NgContentComponent implements OnInit {

  @ViewChild(CustomCard) este!: CustomCard;

  cabeza = contentChild<CustomCard>(CustomCard);

  texto2 = computed(() => {
    console.log(this.cabeza()?.otroTexto());
    return this.cabeza()
  });

  constructor() {

    const elementRef = inject(ElementRef);
    console.log(elementRef.nativeElement);
  }

  elementRef = inject(ElementRef);

  ngAfterViewInit() {
    console.log(this.este.texto);
    console.log(this.cabeza()?.otroTexto());

    this.elementRef.nativeElement.querySelector('input')?.focus();
  }


  ngOnInit() {

  }
}
