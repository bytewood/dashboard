import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RangedGraphComponent} from './ranged-graph.component';
import {NgxChartsModule} from "@swimlane/ngx-charts";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {DatePickerComponent} from "../../common/date-picker/date-picker.component";
import {NgbDatepickerModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {GraphTypesService} from "../graph-types.service";
import {ApiService} from "../api/api.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {GraphMetadata} from "../metadata/graph-metadata";
import {Aggregate} from "../aggregrate";
import { GraphGroupMetadata } from "../metadata/graph-group-metadata";

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
                ApiService,
                {provide: GraphMetadata, useClass: GraphTypesService},
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        const gm = new GraphGroupMetadata("", false, "");
        fixture = TestBed.createComponent(RangedGraphComponent);
        component = fixture.componentInstance;
        component.metadata = new GraphMetadata(gm, false, "", Aggregate.count, "days", RangedGraphComponent);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
