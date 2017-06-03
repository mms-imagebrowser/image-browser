import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {PluginService} from '../../services/plugin.service';

@Component({
  selector: 'app-plugin-selector',
  templateUrl: './plugin-selector.component.html',
  styleUrls: ['./plugin-selector.component.css']
})
export class PluginSelectorComponent implements OnInit {

  @Output() selectedPluginEmitter: EventEmitter<string> = new EventEmitter();
  private pluginNames: string[] = [];

  constructor(pluginDataService: PluginService) {
    pluginDataService.getPluginNames().subscribe((pluginNames: string[]) => {
      this.pluginNames = pluginNames;
    });
  }

  ngOnInit() {
  }

  setSelectedPlugin(selectedPlugin: string) {
    this.selectedPluginEmitter.emit(selectedPlugin);
  }

}
