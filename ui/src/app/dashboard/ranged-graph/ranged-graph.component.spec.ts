import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RangedGraphComponent } from './ranged-graph.component';
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { DatePickerComponent } from "../common/date-picker/date-picker.component";
import { NgbDatepickerModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { DashboardMetadata } from "../model/dashboard-metadata.service";
import { CustomGraphTypes } from "../../custom/custom-graph-types.service";
import { DashboardService } from "../common/dashboard.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { DashboardItemAttributes } from "../common/dashboard-item-attributes";
import { ItemMetadata } from "../model/item-metadata";

describe('RangedGraphComponent', () => {
    let component: RangedGraphComponent;
    let fixture: ComponentFixture<RangedGraphComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                RangedGraphComponent,
                DatePickerComponent
            ],
            imports: [
                FormsModule,
                BrowserModule,
                HttpClientTestingModule,
                NoopAnimationsModule,
                NgxChartsModule,
                NgbDatepickerModule,
                FontAwesomeModule
            ],
            providers: [
                DashboardService,
                {provide: DashboardMetadata, useClass: CustomGraphTypes},
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RangedGraphComponent);
        component = fixture.componentInstance;
        component.attributes = new DashboardItemAttributes(new ItemMetadata(false, "Test Title", undefined, "Test Group", "Test Type"));
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
