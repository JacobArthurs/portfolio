import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReverseAnimatedText } from './reverse-animated-text';

describe('ReversedAnimatedText', () => {
  let component: ReverseAnimatedText;
  let fixture: ComponentFixture<ReverseAnimatedText>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReverseAnimatedText]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReverseAnimatedText);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
