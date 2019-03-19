import { DashboardModule } from './dashboard.module';
import { TestBed } from "@angular/core/testing";
import { DatePickerComponent } from "./common/date-picker/date-picker.component";
import { DashboardService } from "./common/dashboard.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { DashboardComponent } from "./dashboard.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { DashboardMetadata } from "./model/dashboard-metadata.service";
import { CustomGraphTypes } from "../custom/custom-graph-types.service";
import { AlltimeGraphComponent } from "./alltime-graph/alltime-graph.component";
import { RangedGraphComponent } from "./ranged-graph/ranged-graph.component";
import { MenuComponent } from "./menu/menu.component";
import { MenuGroupComponent } from "./menu/menu-group/menu-group.component";
import { MenuItemComponent } from "./menu/menu-group/menu-item/menu-item.component";

describe('DashboardModule', () => {
    let dashboardModule: DashboardModule;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                DashboardComponent,
                DatePickerComponent,
                AlltimeGraphComponent,
                RangedGraphComponent,
                MenuComponent,
                MenuGroupComponent,
                MenuItemComponent
            ],
            imports: [
                HttpClientTestingModule,
                FontAwesomeModule
            ],
            providers: [
                DashboardService,
                {provide: DashboardMetadata, useClass: CustomGraphTypes}
            ]
        });
        dashboardModule = new DashboardModule();
    });

    it('should create an instance', () => {
        expect(dashboardModule).toBeTruthy();
    });
});
