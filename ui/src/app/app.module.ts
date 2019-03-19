import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DashboardModule } from "./dashboard/dashboard.module";
import { DashboardMetadata } from "./dashboard/model/dashboard-metadata.service";
import { CustomGraphTypes } from "./custom/custom-graph-types.service";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        DashboardModule
    ],
    bootstrap: [
        AppComponent
    ],
    providers: [
        {provide: DashboardMetadata, useClass: CustomGraphTypes}
    ]
})
export class AppModule {
}
