import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DragAndDropFeatureComponent } from './drag-and-drop-feature.component';

describe('DragAndDropFeatureComponent', () => {
  let component: DragAndDropFeatureComponent;
  let fixture: ComponentFixture<DragAndDropFeatureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DragAndDropFeatureComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DragAndDropFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
