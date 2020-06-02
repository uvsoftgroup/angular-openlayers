import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeoMapPortalComponent } from './geo-map-portal.component';

describe('GeoMapPortalComponent', () => {
  let component: GeoMapPortalComponent;
  let fixture: ComponentFixture<GeoMapPortalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeoMapPortalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeoMapPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
