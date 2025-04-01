import { TestBed } from '@angular/core/testing';

import { SiteCandidatService } from './site-candidat.service';

describe('SiteCandidatService', () => {
  let service: SiteCandidatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SiteCandidatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
