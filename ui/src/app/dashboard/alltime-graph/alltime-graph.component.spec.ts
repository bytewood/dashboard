import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlltimeGraphComponent } from './alltime-graph.component';
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { FormsModule } from "@angular/forms";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { DashboardMetadata } from "../model/dashboard-metadata.service";
import { DashboardService } from "../common/dashboard.service";
import { HttpClient } from "@angular/common/http";
import { HttpHandler } from "@angular/common/http";
import { NgbDatepickerModule } from "@ng-bootstrap/ng-bootstrap";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { CustomGraphTypes } from "../../custom/custom-graph-types.service";
import { ItemMetadata } from "../model/item-metadata";
import { DashboardItemAttributes } from "../common/dashboard-item-attributes";

describe('AlltimeGraphComponent', () => {
    let component: AlltimeGraphComponent;
    let fixture: ComponentFixture<AlltimeGraphComponent>;

    beforeEach(async(() => {
    }));

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [AlltimeGraphComponent],
            imports: [
                FormsModule,
                NoopAnimationsModule,
                NgxChartsModule,
                NgbDatepickerModule,
                FontAwesomeModule
            ],
            providers: [
                DashboardService,
                HttpClient,
                HttpHandler,
                {provide: DashboardMetadata, useClass: CustomGraphTypes}
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(AlltimeGraphComponent);
        component = fixture.componentInstance;
        component.attributes = new DashboardItemAttributes(new ItemMetadata(false, "Test Title", undefined, "Test Group", "Test Type"));
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
