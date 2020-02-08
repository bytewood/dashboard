import {Component} from '@angular/core';
import {Output} from "@angular/core";
import {EventEmitter} from "@angular/core";
import {ViewChildren} from "@angular/core";
import {QueryList} from "@angular/core";
import {GraphGroupMetadata} from "../graphs/metadata/graph-group-metadata";
import {MenuGroupComponent} from "./menu-group/menu-group.component";
import {GraphMetadata} from "../graphs/metadata/graph-metadata";
import {GraphTypesService} from "../graphs/graph-types.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent {

  checked = false;

  groups: GraphGroupMetadata[];

  @ViewChildren("menuGroup")
  menuGroups: QueryList<MenuGroupComponent>;

  @Output()
  show: EventEmitter<GraphMetadata> = new EventEmitter();

  @Output()
  hide: EventEmitter<GraphMetadata> = new EventEmitter();

  constructor(public graphTypes: GraphTypesService) {
    this.groups = this.graphTypes.groups;
  }

  onShow(item: GraphMetadata) {
    this.show.emit(item);
  }

  onHide(item: GraphMetadata) {
    this.hide.emit(item);
  }

  toggleAll(event: Event) {
    if ((event.target as HTMLInputElement).checked) {
      this.menuGroups.forEach(g => g.showGroup());
    } else {
      this.menuGroups.forEach((g => g.hideGroup()));
    }
  }

  calculateChecked() {
    this.menuGroups.forEach(g => g.calculateChecked());
    this.checked = this.groups.map(g => g.checked).reduce((p, c) => p && c);
  }
}
