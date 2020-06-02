import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlotMapComponent } from './plot-map.component';

describe('PlotMapComponent', () => {
  let component: PlotMapComponent;
  let fixture: ComponentFixture<PlotMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlotMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlotMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
