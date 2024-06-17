import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TextResultPage } from './text.result.page';

describe('TextResultPage', () => {
  let component: TextResultPage;
  let fixture: ComponentFixture<TextResultPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TextResultPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
