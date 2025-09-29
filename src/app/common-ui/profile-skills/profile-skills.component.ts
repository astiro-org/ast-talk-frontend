import { Component, input } from '@angular/core';
import { Profile } from '../../types/profile.interface';

@Component({
  selector: 'app-profile-skills',
  imports: [],
  templateUrl: './profile-skills.component.html',
  styleUrl: './profile-skills.component.scss',
})
export class ProfileSkillsComponent {
  skills = input<Pick<Profile, 'stack'>['stack']>();
}
