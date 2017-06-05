import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {PluginOption} from '../../../api/pluginOption';
@Component({
  selector: 'app-plugin-option',
  templateUrl: './dynamic-form-plugin-option.component.html'
})
export class DynamicFormPluginOptionComponent {
  @Input() option: PluginOption;
  @Input() form: FormGroup;

  get isValid() {
    return this.form.controls[this.option.key].valid;
  }
}
