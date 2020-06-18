import { TestBed, async, inject } from '@angular/core/testing';

import { Guard2Guard } from './guard2.guard';

describe('Guard2Guard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Guard2Guard]
    });
  });

  it('should ...', inject([Guard2Guard], (guard: Guard2Guard) => {
    expect(guard).toBeTruthy();
  }));
});
