import { TestBed, inject } from '@angular/core/testing';

import { HomeTopicsService } from './home-topics.service';

describe('HomeTopicsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HomeTopicsService]
    });
  });

  it('should be created', inject([HomeTopicsService], (service: HomeTopicsService) => {
    expect(service).toBeTruthy();
  }));
});
