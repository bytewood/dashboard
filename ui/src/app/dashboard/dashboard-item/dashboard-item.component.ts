import {Component, HostBinding, ViewChild} from '@angular/core';
import {DashboardItemMetadata} from "../metadata/dashboard-item-metadata";
import {UiSyncService} from "../../ui-sync.service";
import {IconProp} from "@fortawesome/fontawesome-svg-core";

@Component({
    selector: 'app-item',
    template: ''
})
export abstract class DashboardItemComponent {
    private readonly RESTORE_ICON = ['far', 'window-restore'] as IconProp;
    private readonly MINIMIZE_ICON = ['far', 'window-minimize'] as IconProp;
    private readonly MAXIMIZE_ICON = ['far', 'window-maximize'] as IconProp;
    private readonly CLOSE_ICON = ['far', 'window-close'] as IconProp;

    @HostBinding("class.col-4") private restored = true;
    @HostBinding("class.col-12") private maximized = false;

    data: any;
    metadata: DashboardItemMetadata;

    closeIcon = this.CLOSE_ICON;
    minimizeIcon = this.MINIMIZE_ICON;
    restoreIcon = this.RESTORE_ICON;
    maximizeIcon = this.MAXIMIZE_ICON;

    protected constructor(private readonly sync: UiSyncService) {
    }

    onRestore() {
        window.dispatchEvent(new Event("resize"));
        this.restored = true;
        this.maximized = false;
    }

    onMaximize() {
        window.dispatchEvent(new Event("resize"));
        this.restored = false;
        this.maximized = true;
    }

    onClose() {
        this.sync.closeDashboardItem(this.metadata);
    }
}
