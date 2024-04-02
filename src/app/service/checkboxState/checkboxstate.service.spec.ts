import { TestBed } from '@angular/core/testing';

import { CheckboxstateService } from './checkboxstate.service';

describe('CheckboxstateService', () => {
  let service: CheckboxstateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckboxstateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
