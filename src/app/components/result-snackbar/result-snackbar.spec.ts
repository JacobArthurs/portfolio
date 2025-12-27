import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultSnackbar } from './result-snackbar';

describe('ResultSnackbar', () => {
  let component: ResultSnackbar;
  let fixture: ComponentFixture<ResultSnackbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultSnackbar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultSnackbar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
