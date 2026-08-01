import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { PostCreateDto, Post } from '../../types/post.interface';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  #http = inject(HttpClient);
  baseApiUrl = 'https://icherniakov.ru/yt-course';

  createPost(payload: PostCreateDto) {
    return this.#http.post<Post>(`${this.baseApiUrl}/post/`, payload);
  }
}
