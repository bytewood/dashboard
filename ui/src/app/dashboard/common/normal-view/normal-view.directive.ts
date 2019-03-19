import { ComponentFactoryResolver } from "@angular/core";
import { ViewContainerRef } from "@angular/core";
import { Type } from "@angular/core";
import { Directive } from "@angular/core";
import { ViewComponent } from "./view-component";
import { DashboardItemAttributes } from "../dashboard-item-attributes";
import { dbg } from "../logger";

@Directive({
    selector: '[appNormalView]'
})
export class NormalViewDirective {
    constructor(private componentFactoryResolver: ComponentFactoryResolver, private viewContainerRef: ViewContainerRef) {
    }

    load(component: Type<ViewComponent>, attributes: DashboardItemAttributes) {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
        const componentRef = this.viewContainerRef.createComponent(componentFactory);
        attributes.metadata.viewRef = componentRef.hostView;

        dbg(componentRef);

        (<ViewComponent>componentRef.instance).attributes = attributes;
    }

    unload(attributes: DashboardItemAttributes) {
        const index = this.viewContainerRef.indexOf(attributes.metadata.viewRef);
        this.viewContainerRef.remove(index);
    }
}
