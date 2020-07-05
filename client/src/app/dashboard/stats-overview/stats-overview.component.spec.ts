import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsOverviewComponent } from './stats-overview.component';

describe('StatsOverviewComponent', () => {
  let component: StatsOverviewComponent;
  let fixture: ComponentFixture<StatsOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatsOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
