import { Component, OnInit } from '@angular/core';
import {PluginService} from '../services/plugin.service';
import {PluginInfo} from '../../api/pluginInfo';

@Component({
  selector: 'app-plugin',
  templateUrl: './plugin.component.html',
  styleUrls: ['./plugin.component.css']
})
export class PluginComponent implements OnInit {

  private selectedPlugin: PluginInfo;

  constructor(private pluginService: PluginService) { }

  ngOnInit() {
  }

  pluginSelected(pluginName: string) {
    console.log('pluginInfo selected: ' + pluginName);
    this.pluginService.selectPlugin(pluginName);
    this.pluginService.getSelectedPlugin().subscribe(
      pluginInfo => {
        this.selectedPlugin = pluginInfo;
        console.log('selected Plugin: ');
        console.log(pluginInfo);
      }
    );
  }
}
