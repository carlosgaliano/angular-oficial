import { Component, Pipe, PipeTransform } from '@angular/core';

// kebab-case.pipe.ts
@Pipe({
  name: 'kebabCase',
})
export class KebabCasePipe implements PipeTransform {
  transform(value: string): string {
    return value.toLowerCase().replace(/ /g, '___');
  }
}

// Pipe puro
@Pipe({ name: 'filterPure', pure: true })
export class FilterPurePipe implements PipeTransform {
  transform(items: any[], filter: string): any[] {
    console.log('Pure pipe ejecutado');
    return items.filter(item => item.name.includes(filter));
  }
}

// Pipe impuro
@Pipe({ name: 'filterImpure', pure: false })
export class FilterImpurePipe implements PipeTransform {
  transform(items: any[], filter: string): any[] {
    console.log('Impure pipe ejecutado');
    console.log(items[0].name.includes("A"));

    return items.filter(item => item.name.includes(filter));
  }
}




@Component({
  selector: 'app-pipe',
  imports: [KebabCasePipe, FilterImpurePipe, FilterPurePipe],
  // templateUrl: './pipe.component.html',
  template: `
    <p>palabra: {{"ca  sa" | kebabCase}}</p>
    <p>En el template</p>
    <p>{{ items | filterPure:'A' }}</p>
    <p>{{ items | filterImpure:'A' }}</p>
  `
})
export class PipeComponent {
  items = [{
    name: "carlos A",
    edad : 32
  }];
}
