import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawModifyVectorFeatureComponent } from './draw-modify-vector-feature.component';

describe('DrawModifyVectorFeatureComponent', () => {
  let component: DrawModifyVectorFeatureComponent;
  let fixture: ComponentFixture<DrawModifyVectorFeatureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrawModifyVectorFeatureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawModifyVectorFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
