import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-calculator-hero-section',
  imports: [RouterLink, NgOptimizedImage],
  templateUrl: './calculator-hero-section.html',
  styleUrl: './calculator-hero-section.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalculatorHeroSection {}
