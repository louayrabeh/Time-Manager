import { TestBed, async, inject } from '@angular/core/testing';

import { Guard1Guard } from './guard1.guard';

describe('Guard1Guard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Guard1Guard]
    });
  });

  it('should ...', inject([Guard1Guard], (guard: Guard1Guard) => {
    expect(guard).toBeTruthy();
  }));
});
