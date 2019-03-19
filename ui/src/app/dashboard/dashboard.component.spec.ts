import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { AlltimeGraphComponent } from "./alltime-graph/alltime-graph.component";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { RangedGraphComponent } from "./ranged-graph/ranged-graph.component";
import { DatePickerComponent } from "./common/date-picker/date-picker.component";
import { NgbDatepickerModule } from "@ng-bootstrap/ng-bootstrap";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { NormalViewDirective } from "./common/normal-view/normal-view.directive";
import { MenuComponent } from "./menu/menu.component";
import { MenuGroupComponent } from "./menu/menu-group/menu-group.component";
import { MenuItemComponent } from "./menu/menu-group/menu-item/menu-item.component";

describe('DashboardItemComponent', () => {
    let component: DashboardComponent;
    let fixture: ComponentFixture<DashboardComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                DashboardComponent,
                DatePickerComponent,
                AlltimeGraphComponent,
                RangedGraphComponent,
                NormalViewDirective,
                MenuComponent,
                MenuGroupComponent,
                MenuItemComponent
            ],
            imports: [
                FormsModule,
                BrowserModule,
                HttpClientModule,
                NgbModule,
                NgxChartsModule,
                NgbDatepickerModule,
                NoopAnimationsModule,
                FontAwesomeModule
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DashboardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
