import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EbsFileUploadPopupComponent } from './ebs-file-upload-popup.component';

describe('EbsFileUploadPopupComponent', () => {
  let component: EbsFileUploadPopupComponent;
  let fixture: ComponentFixture<EbsFileUploadPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EbsFileUploadPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EbsFileUploadPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
