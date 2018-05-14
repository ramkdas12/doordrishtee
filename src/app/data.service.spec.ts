import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DataService } from './data.service';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

describe('DataService', () => {
  let service: DataService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        DataService, 
        {
          provide: Http
        }
      ]
    });

    service = TestBed.get(DataService, ['getUsers']);
    httpMock = TestBed.get(HttpTestingController);

  });

  afterEach(() => {
    httpMock.verify();
  })

  it('should retrieve users from the API using get', () => {
    const test = {
      name: 'John Rambo',
      id: '1'
    }
    service.getUsers().subscribe(res => {
      expect(res).toBeDefined();
    });

    const request = httpMock.expectOne('/api/users');

    expect(request.request.method).toBe('GET');

    request.flush(test);
  });

});
