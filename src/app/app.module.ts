import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {FileBrowserComponent} from './file-browser/file-browser.component';
import {ImgSelectionComponent} from './img-selection/img-selection.component';
import {PluginSelectorComponent} from './plugin/plugin-selector/plugin-selector.component';
import {PluginSettingsComponent} from './plugin/plugin-settings/plugin-settings.component';
import {PreviewComponent} from './preview/preview.component';
import {PluginComponent} from './plugin/plugin.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {TreeModule} from 'angular-tree-component';
import {FileSystemService} from './files-system-service';
import {PluginService} from './services/plugin.service';
import {DynamicFormPluginOptionComponent} from './plugin/plugin-settings/dynamic-form-plugin-option.component';

@NgModule({
  declarations: [
    AppComponent,
    FileBrowserComponent,
    ImgSelectionComponent,
    PluginSelectorComponent,
    PluginSettingsComponent,
    DynamicFormPluginOptionComponent,
    PreviewComponent,
    PluginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    FlexLayoutModule,
    TreeModule,
    ReactiveFormsModule
  ],
  providers: [FileSystemService, PluginService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
