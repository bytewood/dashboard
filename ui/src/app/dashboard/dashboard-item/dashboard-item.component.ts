import { Component, OnInit } from '@angular/core';
import { DashboardItemMetadata } from "../metadata/dashboard-item-metadata";
import { UiSyncService } from "../../ui-sync.service";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

@Component({
    selector: 'app-item',
    template: ''
})
export abstract class DashboardItemComponent implements OnInit {
    private readonly RESTORE_ICON = ['far', 'window-restore'] as IconProp;
    private readonly MINIMIZE_ICON = ['far', 'window-minimize'] as IconProp;
    private readonly MAXIMIZE_ICON = ['far', 'window-maximize'] as IconProp;
    private readonly CLOSE_ICON = ['far', 'window-close'] as IconProp;

    private _maximized = false;

    protected cardWidth = parent.innerWidth / 3;
    protected cardHeight = this.cardWidth / 1.618;

    data: any;
    metadata: DashboardItemMetadata;

    closeIcon = this.CLOSE_ICON;
    minimizeIcon = this.MINIMIZE_ICON;
    resizeIcon = this.MAXIMIZE_ICON;

    previousView = [];
    view = [];

    protected constructor(private readonly sync: UiSyncService) {
    }

    onResize() {
        if (this._maximized) {
            this._maximized = false;
            this.resizeIcon = this.MAXIMIZE_ICON;
            this.view = this.previousView;
        } else {
            this._maximized = true;
            this.resizeIcon = this.RESTORE_ICON;
            this.previousView = this.view;
            this.view = [this.cardWidth, this.cardHeight];
        }
    }

    onClose() {
        this.sync.closeDashboardItem(this.metadata);
    }

    ngOnInit(): void {
        this.previousView = this.view = [this.cardWidth, this.cardHeight];
    }
}
