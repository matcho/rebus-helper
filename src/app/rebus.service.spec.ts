import { TestBed } from '@angular/core/testing';

import { RebusService } from './rebus.service';

describe('RebusService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RebusService = TestBed.get(RebusService);
    expect(service).toBeTruthy();
  });
});
