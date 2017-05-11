import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import { FileBrowserComponent } from './file-browser/file-browser.component';
import { ImgSelectionComponent } from './img-selection/img-selection.component';
import { PluginSelectorComponent } from './plugin/plugin-selector/plugin-selector.component';
import { PluginSettingsComponent } from './plugin/plugin-settings/plugin-settings.component';
import { PreviewComponent } from './preview/preview.component';
import { PluginComponent } from './plugin/plugin.component';

@NgModule({
  declarations: [
    AppComponent,
    FileBrowserComponent,
    ImgSelectionComponent,
    PluginSelectorComponent,
    PluginSettingsComponent,
    PreviewComponent,
    PluginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
