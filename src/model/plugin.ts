export class Plugin {
  readonly title: string;
  readonly code: string;

  public constructor(title: string, code: string) {
    this.title = title;
    this.code = code;
  }
}
