import { TestBed } from '@angular/core/testing';

import { ClientStatusService } from './client-status.service';

describe('ClientStatusService', () => {
  let service: ClientStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
