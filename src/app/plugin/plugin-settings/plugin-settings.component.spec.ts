import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PluginSettingsComponent } from './plugin-settings.component';

describe('PluginSettingsComponent', () => {
  let component: PluginSettingsComponent;
  let fixture: ComponentFixture<PluginSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PluginSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PluginSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
