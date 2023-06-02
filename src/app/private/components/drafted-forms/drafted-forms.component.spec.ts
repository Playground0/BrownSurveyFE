import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DraftedFormsComponent } from './drafted-forms.component';

describe('DraftedFormsComponent', () => {
  let component: DraftedFormsComponent;
  let fixture: ComponentFixture<DraftedFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DraftedFormsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DraftedFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
