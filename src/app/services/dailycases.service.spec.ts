import { TestBed } from '@angular/core/testing';

import { DailycasesService } from './dailycases.service';

describe('DailycasesService', () => {
  let service: DailycasesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DailycasesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
