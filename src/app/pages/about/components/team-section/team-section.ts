import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TEAM_MEMBERS } from '@core/data/about-page.data';

/**
 * Team section for the About page.
 * Displays team member cards with gradient avatars and descriptions.
 */
@Component({
  selector: 'app-team-section',
  imports: [],
  templateUrl: './team-section.html',
  styleUrl: './team-section.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamSection {
  protected readonly teamMembers = TEAM_MEMBERS;
}
