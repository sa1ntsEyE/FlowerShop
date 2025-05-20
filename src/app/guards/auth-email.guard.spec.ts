import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authEmailGuard } from './auth-email.guard';

describe('authEmailGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authEmailGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
