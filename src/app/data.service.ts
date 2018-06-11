import { Injectable } from '@angular/core';
import { UUID } from 'angular2-uuid';

import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';

import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  result: any;

  uuid = UUID.UUID();

  options = {
    'headers': this.getHeaders()
  };

  getHeaders() {
    const _headers = new HttpHeaders();
    let headers = _headers.append('requestId', this.uuid);
    return headers;
  }

  constructor(private _http: HttpClient) { }

  prepareUrl(url, api) {
    if (api) {
      return '/api/' + url;
    } else {
      return '/user/' + url;
    }
  }

  getData(url) {

    var uri = this.prepareUrl(url, true);
    return this._http.get(uri, this.options)
      .map(response => this.result = response);
  }

  postData(url, data) {
    var uri = this.prepareUrl(url, false);
    let payload = {
      data: data
    };
    return this._http.post(uri, payload, this.options)
      .map(response => this.result = response);
  }

}
