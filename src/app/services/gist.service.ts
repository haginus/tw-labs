import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Gist } from '../lib/models/Gist';
import { GistFile } from '../lib/models/GistFile';

@Injectable({
  providedIn: 'root'
})
export class GistService {

  constructor(private http: HttpClient) { }

  getGist(gistId: string): Observable<Gist> {
    const url = `/assets/gists/${gistId}/index.json`;
    return this.http.get<Gist>(url).pipe(
      catchError(err => of(null))
    );
  }

  getGistFile(gistId: string, gistFile: GistFile): Observable<GistFile> {
    const url = `/assets/gists/${gistId}/${gistFile.name}`;
    return this.http.get(url, { responseType: 'text' }).pipe(
      map(content => ({ ...gistFile, content })),
      catchError(err => of({...gistFile, content: null }))
    );
  }
}
