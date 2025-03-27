import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableauEbsComponent } from './tableau-ebs.component';

describe('TableauEbsComponent', () => {
  let component: TableauEbsComponent;
  let fixture: ComponentFixture<TableauEbsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableauEbsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableauEbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
