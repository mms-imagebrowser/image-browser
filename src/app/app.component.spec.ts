import {async, TestBed} from '@angular/core/testing';

import {AppComponent} from './app.component';
import {FileBrowserComponent} from './file-browser/file-browser.component';
import {PreviewComponent} from './preview/preview.component';
import {ImgSelectionComponent} from './img-selection/img-selection.component';
import {PluginComponent} from './plugin/plugin.component';
import {PluginSelectorComponent} from './plugin/plugin-selector/plugin-selector.component';
import {PluginSettingsComponent} from './plugin/plugin-settings/plugin-settings.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        FileBrowserComponent,
        PreviewComponent,
        ImgSelectionComponent,
        PluginComponent,
        PluginSelectorComponent,
        PluginSettingsComponent
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should render div with class row', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('div').className).toContain('row');
  }));
});
