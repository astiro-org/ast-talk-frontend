import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { type Profile } from '../../types/profile.interface';
import { type Pageble } from '../../types/pageble.interface';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  http = inject(HttpClient);
  baseApiUrl = 'https://icherniakov.ru/yt-course';

  me = signal<Profile | null>(null);

  getTestsAccounts() {
    return this.http.get<Profile[]>(`${this.baseApiUrl}/account/test_accounts`);
  }

  getMe() {
    return this.http
      .get<Profile>(`${this.baseApiUrl}/account/me`)
      .pipe(tap((res) => this.me.set(res)));
  }

  getAccount(id: string) {
    return this.http.get<Profile>(`${this.baseApiUrl}/account/${id}`);
  }

  getSubscribersShortList(count = 3) {
    return (
      this.http
        .get<Pageble<Profile>>(`${this.baseApiUrl}/account/subscribers/`)
        // 0 item - это тест юзер
        .pipe(
          map((res) =>
            res.items
              .filter((user) => user.username !== 'test_user_ws')
              .slice(0, count)
          )
        )
    );
  }

  patchProfile(profile: Partial<Profile>) {
    return this.http.patch<Profile>(`${this.baseApiUrl}/account/me`, profile);
  }

  uploadAvatar(file: File) {
    const formData = new FormData();
    formData.append('image', file);
    return this.http.post(`${this.baseApiUrl}/account/upload_image`, formData);
  }
}
