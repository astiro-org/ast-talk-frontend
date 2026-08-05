import { Component, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Post } from '../../../types/post.interface';
import { AvatarCircleComponent } from '../../../common-ui/avatar-circle/avatar-circle.component';
import { SvgIconComponent } from '../../../common-ui/svg-icon/svg-icon.component';

@Component({
  selector: 'app-post',
  imports: [AvatarCircleComponent, DatePipe, SvgIconComponent],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent {
  post = input<Post>();
}
