import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinimaxComponent } from './minimax';

describe('Minimax', () => {
  let component: MinimaxComponent;
  let fixture: ComponentFixture<MinimaxComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MinimaxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MinimaxComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
