import { TestBed } from '@angular/core/testing';

import { TableauEbsService } from './tableau-ebs.service';

describe('TableauEbsService', () => {
  let service: TableauEbsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TableauEbsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
