import {Injectable} from '@angular/core';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {Http} from '@angular/http';
import {Plugin} from '../../model/plugin';

const host = 'http://localhost:3000';
const pluginListRoute = '/api/plugins/';
const pluginRoute = '/api/plugins/';

@Injectable()
export class PluginService {

  private pluginNames: ReplaySubject<string[]> = new ReplaySubject<string[]>();
  private selectedPlugin: ReplaySubject<Plugin> = new ReplaySubject<Plugin>();

  constructor(private http: Http) {
    this.selectedPlugin.next(null);
    this.updateData();
  }

  private getPluginListUrl(): string {
    return host + pluginListRoute;
  }

  private getPluginUrl(pluginName: string): string {
    return host + pluginRoute + pluginName;
  }

  updateData() {
    this.http.get(this.getPluginListUrl())
      .map(data => data.json())
      .subscribe(
        pluginNames => {
          this.pluginNames.next(pluginNames);
        });
  }

  selectPlugin(pluginName: string) {
    // todo
    // if (pluginName not in pluginNames)
    //    return

    this.selectedPlugin.next(null);

    this.http.get(this.getPluginUrl(pluginName))
      .map(data => data.json())
      .subscribe(
        pluginData => {
          const plugin: Plugin = new Plugin(pluginData.title, pluginData.code);
          this.selectedPlugin.next(plugin);
        }
      );
  }

  getSelectedPlugin(): ReplaySubject<Plugin> {
    return this.selectedPlugin;
  }

  getPluginNames(): ReplaySubject<string[]> {
    return this.pluginNames;
  }

}
