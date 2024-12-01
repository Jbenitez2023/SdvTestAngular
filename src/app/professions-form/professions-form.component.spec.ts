import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionsFormComponent } from './professions-form.component';

describe('ProfessionsFormComponent', () => {
  let component: ProfessionsFormComponent;
  let fixture: ComponentFixture<ProfessionsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfessionsFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfessionsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
