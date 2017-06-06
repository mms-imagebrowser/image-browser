import {PluginOption} from './pluginOption';
export class PluginInfo {
  public static fromData(data: any): PluginInfo {
    const options: PluginOption[] = [];
    data.options.forEach(option => options.push(new PluginOption(option.title,
      option.key,
      option.description,
      option.inputType,
      option.dropdownOptions,
      option.min,
      option.max,
      option.defaultValue))
    );

    const info: PluginInfo = new PluginInfo(
      data.pluginName,
      data.title,
      data.description,
      data.pluginType,
      data.supportSingleImage,
      data.supportBatch,
      options);

    return info;
  }

  public constructor(
    public readonly pluginName: string,
    public readonly title: string,
    public readonly description: string,
    public readonly pluginType: string[],
    public readonly supportSingleImage: boolean,
    public readonly supportBatch: boolean,
    public readonly options: PluginOption[]
  ) {}
}
