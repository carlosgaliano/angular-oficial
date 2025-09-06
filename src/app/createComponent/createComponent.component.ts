import { Component, ElementRef, inject, TemplateRef, ViewChild, ViewContainerRef, contentChild } from '@angular/core';

@Component({
  selector: 'uno',
  imports: [],
  template: `
    uno
  `
})
export class Uno { }

@Component({
  selector: 'dos',
  imports: [],
  template: `
    <p>DOS</p>
  `
})
export class Dos { }

@Component({
  selector: 'app-create-component',
  imports: [Dos],
  // templateUrl: './createComponent.component.html',
  template: `
    <button (click)="loadContent()">Load content</button>
    <dos />
    <div #container></div>
  `
})
export class CreateComponentComponent {
  private vista = inject(ViewContainerRef);
  @ViewChild("container") container!: ElementRef<HTMLDivElement>;
  @ViewChild("container") container2!: TemplateRef<HTMLDivElement>;

  loadContent() {
    console.log(this.vista);
    console.log();
    this.container.nativeElement.innerHTML = "<p>aa</p>";
    this.vista.createComponent(Uno)
  }
}
