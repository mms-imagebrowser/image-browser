export class PluginExecutionParams {
  constructor(private readonly pluginName: string,
              private readonly args: { [key: string]: any },
              private readonly imgPaths: string[]) {
  }
}
