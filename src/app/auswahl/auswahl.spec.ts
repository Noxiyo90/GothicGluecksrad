import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Auswahl } from './auswahl';
import {screen} from '@testing-library/angular';

describe('Auswahl', () => {
  let component: Auswahl;
  let fixture: ComponentFixture<Auswahl>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Auswahl]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Auswahl);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Gothic Charakterseite soll angezeigt werden', () => {
    screen.getByText('Dein Gothic-Charakter')
    screen.getByPlaceholderText('Name')
    screen.getByPlaceholderText('Herkunft')
    screen.getByPlaceholderText('Fraktion/Gilde')
    screen.getByPlaceholderText('Stärke')
    screen.getByPlaceholderText('Geschick')
    screen.getByPlaceholderText('Magiebegabung')
    screen.getByPlaceholderText('Magiekreis')
    screen.getByPlaceholderText('Alter')
    screen.getByPlaceholderText('Nahkampf?')
    screen.getByPlaceholderText('Fernkampf?')
    screen.getByPlaceholderText('Göttergabe')
    screen.getByPlaceholderText('Gott')
    screen.getByPlaceholderText('Mission/Ziel')
  });
});
