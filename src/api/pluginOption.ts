export class PluginOption {
  public constructor(
    public readonly key: string,
    public readonly datatype: string,
    public readonly min: number,
    public readonly max: number,
    public readonly defaultValue: string
  ) {}
}
