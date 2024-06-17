import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnalyzeResultPage } from './analyze.result.page';

describe('AnalyzeResultPage', () => {
  let component: AnalyzeResultPage;
  let fixture: ComponentFixture<AnalyzeResultPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyzeResultPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
