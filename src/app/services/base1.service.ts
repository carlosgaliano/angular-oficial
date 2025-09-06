import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, from, range } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Base1Service {

  api = 'https://api.github.com/users';

  http = inject(HttpClient);

  constructor() {

  }

  getGit() {
    this.http.get(this.api).pipe(
      catchError((err:Error) => {
        console.log("ERROR", err.message);
        return []
      })
    ).subscribe((resp) => {
      console.log(resp);
      return resp
    })
  }

  numeros() {
    return range(1, 10).subscribe((resp) => {
      console.log({ id: resp });

      return ({ id: resp });
    })
  }

}
