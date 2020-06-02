import { TestBed, inject } from '@angular/core/testing';

import { ScriptLoadService } from './script-load.service';

describe('ScriptLoadService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ScriptLoadService]
    });
  });

  it('should be created', inject([ScriptLoadService], (service: ScriptLoadService) => {
    expect(service).toBeTruthy();
  }));
});
