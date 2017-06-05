export class PluginOption {
  public constructor(
    public readonly title: string,
    public readonly key: string,
    public readonly description: string,
    public readonly inputType: string,
    public readonly dropdownOptions: string[],
    public readonly min: number,
    public readonly max: number,
    public readonly defaultValue: string
  ) {}
}

/**
 * Plugin Option for Python plugins.
 * Usage:
 *
 * title: a title which is displayed in the ui.
 * key: a key that describes the option.
 * description: a short description which is displayed to the user.
 * inputType: one of ['text', 'number', 'dropdown']
 * dropdownOptions: the options when inputType is 'dropdown'
 * min: minimum value if inputType is 'number'
 * max: maximum value if inputType is 'number'
 * defaultValue: the default value to display in the ui
 */
