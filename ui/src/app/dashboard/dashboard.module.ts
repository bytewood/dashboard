import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlltimeGraphComponent } from "./alltime-graph/alltime-graph.component";
import { RangedGraphComponent } from "./ranged-graph/ranged-graph.component";
import { HttpClientModule } from "@angular/common/http";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule } from "@angular/forms";
import { DashboardComponent } from "./dashboard.component";
import { DashboardService } from "./common/dashboard.service";
import { DatePickerComponent } from "./common/date-picker/date-picker.component";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faChartBar } from "@fortawesome/free-regular-svg-icons";
import { faWindowMaximize } from "@fortawesome/free-regular-svg-icons";
import { faWindowClose } from "@fortawesome/free-regular-svg-icons";
import { faWindowRestore } from "@fortawesome/free-regular-svg-icons/faWindowRestore";
import { NormalViewDirective } from "./common/normal-view/normal-view.directive";
import { MenuComponent } from './menu/menu.component';
import { MenuGroupComponent } from './menu/menu-group/menu-group.component';
import { MenuItemComponent } from './menu/menu-group/menu-item/menu-item.component';
import { faBars } from "@fortawesome/free-solid-svg-icons/";

library.add(faBars, faChartBar, faWindowRestore, faWindowMaximize, faWindowClose);

@NgModule({
    declarations: [
        DashboardComponent,
        DatePickerComponent,
        NormalViewDirective,
        AlltimeGraphComponent,
        RangedGraphComponent,
        MenuComponent,
        MenuGroupComponent,
        MenuItemComponent
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
        DashboardService
    ],
    exports: [
        DashboardComponent
    ]
})
export class DashboardModule {
}
