import {ComponentFactoryResolver, Directive, ViewContainerRef} from "@angular/core";
import {dbg} from "../../common/logger";
import {DashboardItemMetadata} from "./dashboard-item-metadata";

@Directive({
    selector: '[appDynamicDashboardItem]'
})
export class DynamicDashboardItemDirective {
    constructor(private componentFactoryResolver: ComponentFactoryResolver, private viewContainerRef: ViewContainerRef) {
    }

    load(metadata: DashboardItemMetadata) {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(metadata.componentType);
        const componentRef = this.viewContainerRef.createComponent(componentFactory);
        metadata.viewRef = componentRef.hostView;
        componentRef.instance.metadata = metadata;

        dbg(componentRef);
    }

    unload(metadata: DashboardItemMetadata) {
        const index = this.viewContainerRef.indexOf(metadata.viewRef);
        this.viewContainerRef.remove(index);
    }
}
