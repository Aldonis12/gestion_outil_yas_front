import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteCandidatComponent } from './site-candidat.component';

describe('SiteCandidatComponent', () => {
  let component: SiteCandidatComponent;
  let fixture: ComponentFixture<SiteCandidatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SiteCandidatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SiteCandidatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
