import {PluginOption} from './pluginOption';
export class PluginInfo {
  public static fromData(data: any): PluginInfo {
    const options: PluginOption[] = [];
    data.options.forEach(option => options.push(new PluginOption(option.key,
      option.description,
      option.type,
      option.dropdownOptions,
      option.min,
      option.max,
      option.value))
    );

    const info: PluginInfo = new PluginInfo(
      data.title,
      data.description,
      data.type,
      options);

    return info;
  }

  public constructor(
    public readonly title: string,
    public readonly description: string,
    public readonly type: string[],
    public readonly options: PluginOption[]
  ) {}
}
