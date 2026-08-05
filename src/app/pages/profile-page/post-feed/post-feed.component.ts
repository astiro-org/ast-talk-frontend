import { Component, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { PostInputComponent } from '../post-input/post-input.component';
import { PostComponent } from '../post/post.component';
import { PostService } from '../../../services/profile/post.service';

@Component({
  selector: 'app-post-feed',
  imports: [PostInputComponent, PostComponent],
  templateUrl: './post-feed.component.html',
  styleUrl: './post-feed.component.scss',
})
export class PostFeedComponent {
  postService = inject(PostService);
  feed = this.postService.posts;

  constructor() {
    firstValueFrom(this.postService.fetchPosts());
  }
}
