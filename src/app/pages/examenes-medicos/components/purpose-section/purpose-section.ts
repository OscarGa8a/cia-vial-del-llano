import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

/** Introduces the medical exam service for licence requests. */
@Component({
  selector: 'app-medical-exams-purpose-section',
  imports: [NgOptimizedImage],
  templateUrl: './purpose-section.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MedicalExamsPurposeSection {
  protected readonly referenceImagePublicId = 'certificado_exams_z25lwz';
}
