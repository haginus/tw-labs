import { TestBed } from '@angular/core/testing';

import { GistService } from './gist.service';

describe('GistService', () => {
  let service: GistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
