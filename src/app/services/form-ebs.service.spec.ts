import { TestBed } from '@angular/core/testing';

import { FormEbsService } from './form-ebs.service';

describe('FormEbsService', () => {
  let service: FormEbsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormEbsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
