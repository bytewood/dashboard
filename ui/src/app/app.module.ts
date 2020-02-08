import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DashboardModule } from "./dashboard/dashboard.module";
import { DashboardMetadata } from "./dashboard/model/dashboard-metadata.service";
import { CustomGraphTypes } from "./custom/custom-graph-types.service";
import { FaIconComponent, FaIconLibrary, FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { fas, faBars, faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { far, faWindowMaximize, faWindowMinimize, faWindowRestore } from "@fortawesome/free-regular-svg-icons";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        DashboardModule,
        FontAwesomeModule
    ],
    bootstrap: [
        AppComponent
    ],
    providers: [
        {provide: DashboardMetadata, useClass: CustomGraphTypes}
    ],
    entryComponents: [FaIconComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(far, fas);
    library.addIcons(faBars, faWindowClose, faWindowMinimize, faWindowMaximize, faWindowRestore);
  }
}
