import { TestBed } from '@angular/core/testing';

import { ConfigserviceService } from './configservice.service';

describe('ConfigserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConfigserviceService = TestBed.get(ConfigserviceService);
    expect(service).toBeTruthy();
  });
});
