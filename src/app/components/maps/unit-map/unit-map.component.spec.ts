import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitMapComponent } from './unit-map.component';

describe('UnitMapComponent', () => {
  let component: UnitMapComponent;
  let fixture: ComponentFixture<UnitMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnitMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
