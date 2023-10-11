import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomDashboardModalComponent } from './custom-dashboard-modal.componet';

describe('FormDeleteModalComponent', () => {
  let component: CustomDashboardModalComponent;
  let fixture: ComponentFixture<CustomDashboardModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomDashboardModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomDashboardModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
