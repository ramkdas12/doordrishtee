import { Injectable } from '@angular/core';

import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class HomeTopicsService {

  result: any;

  constructor(private _http: Http) { }

  getHomeTopics() {
    return this._http.get('/api/getHomeTopics')
      .map(response => this.result = response.json().data);
  }

}
