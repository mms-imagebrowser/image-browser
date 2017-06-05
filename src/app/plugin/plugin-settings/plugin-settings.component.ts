import {Component, Input, OnInit} from '@angular/core';
import {PluginInfo} from '../../../api/pluginInfo';
import {FormControl, FormGroup} from '@angular/forms';
@Component({
  selector: 'app-plugin-settings',
  templateUrl: './plugin-settings.component.html',
  styleUrls: ['./plugin-settings.component.css']
})
export class PluginSettingsComponent implements OnInit {

  @Input()
  set pluginInfo(pi: PluginInfo) {
    this._pluginInfo = pi;
    this.form = this.formGroupFromOptions();
  }

  get pluginInfo(): PluginInfo {
    return this._pluginInfo;
  }

  private _pluginInfo: PluginInfo;
  form: FormGroup;

  constructor() {
  }

  ngOnInit() {
    this.form = this.formGroupFromOptions();
  }

  formGroupFromOptions(): FormGroup {
    const group: any = {};

    if (this.pluginInfoIsSet()) {
      this.pluginInfo.options.forEach(option => {
        group[option.key] = /*option.required ? new FormControl(option.defaultValue || '', Validators.required)
         :*/ new FormControl(option.defaultValue || '');
      });
    }
    const asdf = new FormGroup(group);
    console.log(asdf);
    return asdf;
  }

  pluginInfoIsSet(): boolean {
    return this.pluginInfo !== null && this.pluginInfo !== undefined;
  }

  onSubmit() {
    console.log('plugin to be executed');
    console.log(this.form.value);
  }

}
