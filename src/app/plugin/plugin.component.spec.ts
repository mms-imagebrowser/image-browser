import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PluginComponent} from './plugin.component';
import {PluginSelectorComponent} from './plugin-selector/plugin-selector.component';
import {PluginSettingsComponent} from './plugin-settings/plugin-settings.component';

describe('PluginComponent', () => {
  let component: PluginComponent;
  let fixture: ComponentFixture<PluginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PluginComponent, PluginSelectorComponent, PluginSettingsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PluginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
