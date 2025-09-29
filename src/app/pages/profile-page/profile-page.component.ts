import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toObservable } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
import { ProfileService } from '../../services/profile/profile.service';
import { ProfileHeaderComponent } from '../../common-ui/profile-header/profile-header.component';
import { SvgIconComponent } from '../../common-ui/svg-icon/svg-icon.component';
import { ImgUrlPipe } from '../../helpers/pipes/img-url.pipe';
import { ProfileSkillsComponent } from "../../common-ui/profile-skills/profile-skills.component";
import { PostFeedComponent } from "./post-feed/post-feed.component";

@Component({
  selector: 'app-profile-page',
  imports: [
    ProfileHeaderComponent,
    AsyncPipe,
    SvgIconComponent,
    RouterLink,
    ImgUrlPipe,
    ProfileSkillsComponent,
    PostFeedComponent
],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
})
export class ProfilePageComponent {
  profileService = inject(ProfileService);
  route = inject(ActivatedRoute);

  me$ = toObservable(this.profileService.me);
  subscribers$ = this.profileService.getSubscribersShortList(4);

  profile$ = this.route.params.pipe(
    switchMap(({ id }) => {
      if (id === 'me') {
        return this.me$;
      }
      return this.profileService.getAccount(id);
    })
  );
}
