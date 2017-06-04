import {PluginOption} from './pluginOption';
export class PluginInfo {

  public constructor(
    public readonly title: string,
    public readonly description: string,
    public readonly type: string[],
    public readonly options: PluginOption[]
  ) {}
}
