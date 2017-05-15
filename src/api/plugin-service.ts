import * as fs from 'fs';
import {Plugin} from './plugin';

export class PluginService {
  private readonly _path: string;

  public constructor(path: string) {
    this._path = path;

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

  delete(name: string, callback: (success) => void) {
    fs.unlink(this.createPathFromName(name), err => {
      callback(!err);
    });
  }

  private createPathFromName(name: string) {
    return this._path + '/' + name + '.py';
  }
}
