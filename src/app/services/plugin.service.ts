import {Injectable} from '@angular/core';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {Http} from '@angular/http';
import {PluginInfo} from '../../api/pluginInfo';

const host = 'http://localhost:3000';
const pluginListRoute = '/api/plugins/';
const pluginRoute = '/api/plugins/';

@Injectable()
export class PluginService {

  private pluginNames: ReplaySubject<string[]> = new ReplaySubject<string[]>();
  private selectedPlugin: ReplaySubject<PluginInfo> = new ReplaySubject<PluginInfo>();

  constructor(private http: Http) {
    this.selectedPlugin.next(null);
    this.updateData();
  }

  private getPluginListUrl(): string {
    return host + pluginListRoute;
  }

  private getPluginInfoUrl(pluginName: string): string {
    return host + pluginRoute + pluginName + '/info';
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

    this.http.get(this.getPluginInfoUrl(pluginName))
      .map(data => data.json())
      .subscribe(
        pluginInfoData => {
          const pluginInfo: PluginInfo = PluginInfo.fromData(pluginInfoData);
          this.selectedPlugin.next(pluginInfo);
        }
      );
  }

  getSelectedPlugin(): ReplaySubject<PluginInfo> {
    return this.selectedPlugin;
  }

  getPluginNames(): ReplaySubject<string[]> {
    return this.pluginNames;
  }

}
