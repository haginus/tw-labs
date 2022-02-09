import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GistService {

  constructor(private http: HttpClient) { }

  getGistFile(gistId: string, type: 'html' | 'css' | 'js'): Observable<string> {
    const last = gistId.split("/").pop() + '.' + type;
    const url = `/assets/gists/${gistId}/${last}`;
    return this.http.get(url, { responseType: 'text' }).pipe(
      catchError(err => of(null))
    );
  }
}
