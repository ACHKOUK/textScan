import { TestBed } from '@angular/core/testing';

import { TextocrService } from './textocr.service';

describe('TextocrService', () => {
  let service: TextocrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TextocrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
