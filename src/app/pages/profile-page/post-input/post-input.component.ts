import { Component, inject, Renderer2 } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { AvatarCircleComponent } from '../../../common-ui/avatar-circle/avatar-circle.component';
import { SvgIconComponent } from '../../../common-ui/svg-icon/svg-icon.component';
import { PostService } from '../../../services/profile/post.service';
import { ProfileService } from '../../../services/profile/profile.service';

@Component({
  selector: 'app-post-input',
  imports: [AvatarCircleComponent, FormsModule, NgIf, SvgIconComponent],
  templateUrl: './post-input.component.html',
  styleUrl: './post-input.component.scss',
})
export class PostInputComponent {
  r2 = inject(Renderer2);
  postService = inject(PostService);
  profile = inject(ProfileService).me;

  postText: string = '';

  onTextAreaInput(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;

    this.r2.setStyle(textarea, 'height', 'auto');
    this.r2.setStyle(textarea, 'height', textarea.scrollHeight + 'px');
  }

  onCreatePost() {
    if (!this.postText) {
      return;
    }

    firstValueFrom(
      this.postService.createPost({
        title: 'Заголовок поста',
        content: this.postText,
        authorId: this.profile()!.id,
      }),
    );
  }
}
