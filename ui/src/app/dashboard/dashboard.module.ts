import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AlltimeGraphComponent} from "../graphs/alltime-graph/alltime-graph.component";
import {RangedGraphComponent} from "../graphs/ranged-graph/ranged-graph.component";
import {HttpClientModule} from "@angular/common/http";
import {NgxChartsModule} from "@swimlane/ngx-charts";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule} from "@angular/forms";
import {DashboardComponent} from "./dashboard.component";
import {ApiService} from "../graphs/api/api.service";
import {DatePickerComponent} from "../common/date-picker/date-picker.component";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {DynamicDashboardItemDirective} from "./dashboard-item/dynamic-dashboard-item.directive";
import {MenuComponent} from '../menu/menu.component';
import {MenuGroupComponent} from '../menu/menu-group/menu-group.component';
import {MenuItemComponent} from '../menu/menu-group/menu-item/menu-item.component';


@NgModule({
    declarations: [
        DashboardComponent,
        DatePickerComponent,
        DynamicDashboardItemDirective,
        AlltimeGraphComponent,
        RangedGraphComponent,
        MenuComponent,
        MenuGroupComponent,
        MenuItemComponent,
    ],
    entryComponents: [
        AlltimeGraphComponent,
        RangedGraphComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        NoopAnimationsModule,
        NgbModule,
        NgxChartsModule,
        FontAwesomeModule
    ],
    providers: [
        ApiService
    ],
    exports: [
        DashboardComponent
    ]
})
export class DashboardModule {
}
