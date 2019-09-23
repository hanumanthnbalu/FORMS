import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrayformsComponent } from './arrayforms.component';

describe('ArrayformsComponent', () => {
  let component: ArrayformsComponent;
  let fixture: ComponentFixture<ArrayformsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArrayformsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArrayformsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
