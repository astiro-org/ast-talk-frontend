import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';
import { SubscriberCardComponent } from './subscriber-card/subscriber-card.component';
import { ProfileService } from '../../services/profile/profile.service';
import { AsyncPipe } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { ImgUrlPipe } from '../../helpers/pipes/img-url.pipe';

@Component({
  selector: 'app-sidebar',
  imports: [
    SvgIconComponent,
    RouterLink,
    SubscriberCardComponent,
    AsyncPipe,
    ImgUrlPipe,
    RouterLinkActive
],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  profileService = inject(ProfileService);

  subscribers$ = this.profileService.getSubscribersShortList();

  me = this.profileService.me;

  menuItems = [
    { icon: 'home', label: 'Моя страница', link: 'profile/me' },
    { icon: 'chat', label: 'Чаты', link: 'chats' },
    { icon: 'search', label: 'Поиск', link: 'search' },
  ];

  ngOnInit() {
    // firstValueFrom чтобы не делать подписку/отписку
    firstValueFrom(this.profileService.getMe());
  }
}
