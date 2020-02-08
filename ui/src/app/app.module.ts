import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {DashboardModule} from "./dashboard/dashboard.module";
import {GraphTypesService} from "./graphs/graph-types.service";
import {FaIconComponent, FaIconLibrary, FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {faBars, fas, faWindowClose} from "@fortawesome/free-solid-svg-icons";
import {far, faWindowMaximize, faWindowMinimize, faWindowRestore} from "@fortawesome/free-regular-svg-icons";
import {CustomGraphTypesService} from "./graphs/custom-graph-types.service";

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
        {provide: GraphTypesService, useClass: CustomGraphTypesService}
    ],
    entryComponents: [FaIconComponent]
})
export class AppModule {
    constructor(library: FaIconLibrary) {
        library.addIconPacks(far, fas);
        library.addIcons(faBars, faWindowClose, faWindowMinimize, faWindowMaximize, faWindowRestore);
    }
}
