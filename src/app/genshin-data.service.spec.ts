import { TestBed } from '@angular/core/testing';

import { GenshinDataService } from './genshin-data.service';

describe('GenshinDataService', () => {
  let service: GenshinDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenshinDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
