import * as fs from 'fs';
import {Plugin} from './plugin';
import * as PythonShell from 'python-shell';
import {PluginInfo} from './pluginInfo';
import {isNullOrUndefined} from 'util';

export class PluginService {
  private readonly _path: string;
  private _infoCache: { [key: string]: PluginInfo } = {};

  public constructor(path: string) {
    this._path = path;

  }

  private get infoCache(): { [key: string]: PluginInfo } {
    return this._infoCache;
  }

  private isPluginInfoCached(pluginName: string) {
    return !isNullOrUndefined(this.infoCache[pluginName]);
  }

  private addPluginInfoToCache(pluginName: string, info: PluginInfo) {
    this.infoCache[pluginName] = info;
  }

  private getCachedPluginInfo(pluginName: string): PluginInfo {
    return this.infoCache[pluginName];
  }

  createOrUpdate(plugin: Plugin, callback: (success: boolean) => void) {
    this.initDirectory(success => {
      if (!success) {
        callback(false);
      }
      const path = this.createPathFromName(plugin.title);
      fs.writeFile(path, plugin.code, err => {
        if (err) {
          console.log(err);
          callback(false);
        }
        console.log('Succesfully saved plugin to' + path);
        callback(true);
      });
    });
  }

  private initDirectory(callback: (success: boolean) => void) {
    fs.exists(this._path, exists => {
      if (!exists) {
        fs.mkdir(this._path, err => {
          if (err) {
            console.log(err);
            callback(false);
          }
          callback(true);
        });
      }
      callback(true);
    });
  }

  list(callback: (plugins: string[]) => void) {
    console.log('loading plugins from ' + this._path);
    fs.readdir(this._path, (err, files) => {
      console.log('read plugins from ' + this._path);
      if (err) {
        console.error(err);
        callback([]); // TODO
      } else {
        callback(files.map(f => f.substring(0, f.indexOf('.py'))));
      }
    });
  }

  load(name: string, callback: (plugin?: Plugin) => void) {
    const path = this.createPathFromName(name);
    fs.readFile(path, (err, data) => {
      if (err) {
        console.log(err);
        callback();
      } else {
        callback(new Plugin(name, data.toString()));
      }
    });
  }

  getInfo(pluginName: string, callback: (pluginInfo?: PluginInfo) => void) {
    const path = this.createPathFromName(pluginName);

    if (this.isPluginInfoCached(pluginName)) {
      callback(this.getCachedPluginInfo(pluginName));
    } else {
      this.execute(pluginName, 'info', {}, null, (result) => {

        if (result == null) {
          console.log('Execute of info returned empty result.');
          callback(null);
        }

        console.log(result[0]);

        const data = result[0];
        const info = PluginInfo.fromData(data);
        this.addPluginInfoToCache(pluginName, info);
        callback(info);
      });
    }
  }

  delete(name: string, callback: (success) => void) {
    fs.unlink(this.createPathFromName(name), err => {
      callback(!err);
    });
  }

  private createPathFromName(name: string) {
    return this._path + '/' + name + '.py';
  }

  execute(name: string,
          action: string,
          options: object /*JSON*/,
          imagePaths: string[],
          callback: (result?: any/*JSON*/, err?: Error) => void) {
    options['pluginName'] = name;
    options['action'] = action;

    if (isNullOrUndefined(imagePaths) && action === 'info') {
      console.log(`Applying plugin "${name}" with action "${action}" to ${imagePaths}`);
      console.log(`options: ${JSON.stringify(options)}`);
      this.callPython(options, callback);
    } else {
      if (isNullOrUndefined(imagePaths)) {
        callback(null, new Error('Image paths undefined!'));
        return;
      }

      this.getInfo(name, pluginInfo => {
        if (pluginInfo.supportBatch) {
          options['imagePaths'] = imagePaths;
          this.callPython(options, callback);
        } else {
          imagePaths.forEach(path => {
            options['imagePath'] = path;
            this.callPython(options, callback);
          });
        }
      });
    }
  }

  private callPython(options: Object, callback: (result?: any, error?: Error) => void) {
    const pyOptions = {
      mode: 'json',
      args: [JSON.stringify(options)],
      scriptPath: './plugins/'
    };
    PythonShell.run('../src/python/PluginLoader.py', pyOptions, (err, results) => {
      if (err) {
        console.error(err);
        callback(null, err);
      }
      callback(results);
    });
  }
}
