import { Component, OnInit } from '@angular/core';
import {PluginService} from '../services/plugin.service';
import {Plugin} from '../../api/plugin';

@Component({
  selector: 'app-plugin',
  templateUrl: './plugin.component.html',
  styleUrls: ['./plugin.component.css']
})
export class PluginComponent implements OnInit {

  private selectedPlugin: Plugin;

  constructor(private pluginService: PluginService) { }

  ngOnInit() {
  }

  pluginSelected(pluginName: string) {
    console.log('plugin selected: ' + pluginName);
    this.pluginService.selectPlugin(pluginName);
    this.pluginService.getSelectedPlugin().subscribe(
      plugin => this.selectedPlugin = plugin
    );
  }
}
