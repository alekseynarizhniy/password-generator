import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  private httpClient = inject(HttpClient);
  
  getPassword(obj: {lengthPassword: number, numbers: boolean, specialChars: boolean}) {
    const ln: string = String(obj.lengthPassword);
    const nm: string = obj.numbers === true ? '' : '&numbers';
    const sc: string = obj.specialChars === true ? '' : '&special';

    const url = `https://api.genratr.com/?length=${ln}&uppercase&lowercase` + sc + nm;
    const errorMessage = 'Something went wrong with fetching password';

    return new Promise((resolve, reject) => {
      this.httpClient.get<{password: string;}>(url).pipe(
        map((data) => {
          console.log('Password is', data.password);
          return data.password;
        }),
        catchError((error) => {
          console.log(error);
          reject(false);
          return throwError(() => new Error(errorMessage));
        })
      ).subscribe({
        next: (data) => resolve(data),
        error: () => reject(false)
      });
    });

  }

}
