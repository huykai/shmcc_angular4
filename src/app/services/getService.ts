import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

@Injectable()
export class getService {
  configUrl = '';

  constructor(private http: HttpClient) { }

  getInfo(Url) {
    return this.http.get(Url);
  }
}