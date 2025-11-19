import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Gluecksrad } from './gluecksrad';
import {screen} from '@testing-library/angular';

describe('Gluecksrad', () => {
  let component: Gluecksrad;
  let fixture: ComponentFixture<Gluecksrad>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Gluecksrad]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Gluecksrad);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Glücksrad wird angezeigt', () => {
    screen.getByText('Drehen')

  });
});

