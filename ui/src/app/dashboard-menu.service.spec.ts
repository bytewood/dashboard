import { TestBed } from '@angular/core/testing';

import { UiSyncService } from './ui-sync.service';

describe('DashboardMenuService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: UiSyncService = TestBed.get(UiSyncService);
        expect(service).toBeTruthy();
    });
});
