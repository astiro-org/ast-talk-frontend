import { Component, Input } from '@angular/core';
import { Profile } from '../../types/profile.interface';
import { ImgUrlPipe } from '../../helpers/pipes/img-url.pipe';
import { ProfileSkillsComponent } from '../profile-skills/profile-skills.component';

@Component({
  selector: 'app-profile-card',
  standalone: true,
  imports: [ImgUrlPipe, ProfileSkillsComponent],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss',
})
export class ProfileCardComponent {
  @Input() profile!: Profile;
}
