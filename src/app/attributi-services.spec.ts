import { TestBed } from '@angular/core/testing';

import { AttributiServices } from './attributi-services';

describe('AttributiServices', () => {
  let service: AttributiServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AttributiServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
