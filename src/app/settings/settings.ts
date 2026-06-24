import { Component, signal } from '@angular/core';
import { SettingsService } from '../settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.html',
  styleUrl: './settings.css',
})
export class Settings {
  offen = signal(false);

  constructor(readonly settingsService: SettingsService) {}

  toggleOffen() {
    this.offen.update(v => !v);
  }
}
