import { Injectable } from '@angular/core';
import { SettingsService } from './settings.service';

@Injectable({ providedIn: 'root' })
export class SoundService {
  private audioContext: AudioContext | null = null;
  private stopAudio: HTMLAudioElement | null = null;

  constructor(private settingsService: SettingsService) {}

  playStop(): void {
    if (!this.settingsService.soundEnabled()) return;
    if (this.stopAudio) {
      this.stopAudio.pause();
      this.stopAudio.currentTime = 0;
    }
    this.stopAudio = new Audio('sounds/StartbuttonSound.m4a');
    this.stopAudio.play().catch(() => {});
  }

  private getContext(): AudioContext {
    if (!this.audioContext) {
      this.audioContext = new AudioContext();
    }
    return this.audioContext;
  }

  private noiseBuffer: AudioBuffer | null = null;

  private getNoiseBuffer(ctx: AudioContext): AudioBuffer {
    if (!this.noiseBuffer) {
      const bufferSize = Math.ceil(ctx.sampleRate * 0.04);
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      this.noiseBuffer = buffer;
    }
    return this.noiseBuffer;
  }

  private playClick(ctx: AudioContext, time: number): void {
    const source = ctx.createBufferSource();
    source.buffer = this.getNoiseBuffer(ctx);

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 350;
    filter.Q.value = 3;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.9, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.035);

    source.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    source.start(time);
    source.stop(time + 0.05);
  }

  private bezierY(t: number, y1: number, y2: number): number {
    return 3 * (1 - t) * (1 - t) * t * y1
         + 3 * (1 - t) * t * t * y2
         + t * t * t;
  }

  private bezierX(t: number, x1: number, x2: number): number {
    return 3 * (1 - t) * (1 - t) * t * x1
         + 3 * (1 - t) * t * t * x2
         + t * t * t;
  }

  private invertBezier(x1: number, y1: number, x2: number, y2: number, progress: number): number {
    let lo = 0, hi = 1;
    for (let i = 0; i < 30; i++) {
      const mid = (lo + hi) / 2;
      if (this.bezierY(mid, y1, y2) < progress) lo = mid;
      else hi = mid;
    }
    return this.bezierX((lo + hi) / 2, x1, x2);
  }

  stopAll(): void {
    if (this.stopAudio) {
      this.stopAudio.pause();
      this.stopAudio = null;
    }
    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
      this.noiseBuffer = null;
    }
  }

  playRattle(durationMs: number, anzahlSegmente: number, totalDegrees: number, currentAngle: number): void {
    if (!this.settingsService.soundEnabled()) return;
    if (anzahlSegmente <= 0) return;

    const ctx = this.getContext();
    const now = ctx.currentTime;
    const duration = durationMs / 1000;

    const degreesPerTick = 360 / anzahlSegmente;
    // Der Zeiger steht bei 90° (3-Uhr). Übergänge passieren wenn R % degreesPerTick == 90 % degreesPerTick.
    const indicatorOffset = 90 % degreesPerTick;
    const currentOffset = currentAngle % degreesPerTick;
    let firstTickAt = (indicatorOffset - currentOffset + degreesPerTick) % degreesPerTick;
    if (firstTickAt === 0) firstTickAt = degreesPerTick;

    for (let degrees = firstTickAt; degrees < totalDegrees; degrees += degreesPerTick) {
      const progress = degrees / totalDegrees;
      const timeFraction = this.invertBezier(0.25, 0.1, 0.1, 1, progress);
      this.playClick(ctx, now + timeFraction * duration);
    }
  }
}
