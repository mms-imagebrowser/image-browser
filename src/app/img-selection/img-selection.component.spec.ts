import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgSelectionComponent } from './img-selection.component';

describe('ImgSelectionComponent', () => {
  let component: ImgSelectionComponent;
  let fixture: ComponentFixture<ImgSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImgSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImgSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
