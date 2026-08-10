import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawStyles } from './draw-styles';

describe('DrawStyles', () => {
  let component: DrawStyles;
  let fixture: ComponentFixture<DrawStyles>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrawStyles],
    }).compileComponents();

    fixture = TestBed.createComponent(DrawStyles);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
