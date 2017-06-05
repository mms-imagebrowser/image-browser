import {Component, Input, OnInit} from '@angular/core';
import {PluginInfo} from '../../../api/pluginInfo';

@Component({
  selector: 'app-plugin-settings',
  templateUrl: './plugin-settings.component.html',
  styleUrls: ['./plugin-settings.component.css']
})
export class PluginSettingsComponent implements OnInit {

  @Input() plugin: PluginInfo;

  constructor() { }

  ngOnInit() {
  }

}
