import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EbsFormComponent } from './ebs-form.component';

describe('EbsFormComponent', () => {
  let component: EbsFormComponent;
  let fixture: ComponentFixture<EbsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EbsFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EbsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
