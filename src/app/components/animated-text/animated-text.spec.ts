import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimatedText } from './animated-text';

describe('AnimatedText', () => {
  let component: AnimatedText;
  let fixture: ComponentFixture<AnimatedText>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimatedText]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimatedText);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
