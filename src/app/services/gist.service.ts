import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Gist } from '../lib/models/Gist';
import { GistFile } from '../lib/models/GistFile';

@Injectable({
  providedIn: 'root'
})
export class GistService {

  constructor(private http: HttpClient) { }

  getGist(gistId: string, external: boolean = false): Observable<Gist> {
    const url = external ? this.getExternalGistUrl(gistId) + '_' : `/assets/gists/${gistId}/index.json`;
    return this.http.get<Gist>(url).pipe(
      catchError(err => of(null))
    );
  }

  getGistFile(gistId: string, gistFile: GistFile, external: boolean = false): Observable<GistFile> {
    if(external) return of(gistFile);
    const url = `/assets/gists/${gistId}/${gistFile.name}`;
    return this.http.get(url, { responseType: 'text' }).pipe(
      map(content => ({ ...gistFile, content })),
      catchError(err => of({...gistFile, content: null }))
    );
  }

  getExternalGistUrl(gistId: string): string {
    return environment.apiUrl + `/gists/${gistId}/`;
  }
}
