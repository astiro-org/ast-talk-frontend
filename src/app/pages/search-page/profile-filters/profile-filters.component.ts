import { Component, inject, OnDestroy } from '@angular/core';
// import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, startWith, Subscription, switchMap } from 'rxjs';
import { ProfileService } from '../../../services/profile/profile.service';

@Component({
  selector: 'app-profile-filters',
  imports: [ReactiveFormsModule],
  templateUrl: './profile-filters.component.html',
  styleUrl: './profile-filters.component.scss',
})
export class ProfileFiltersComponent implements OnDestroy {
  fb = inject(FormBuilder);
  profileService = inject(ProfileService);

  searchForm = this.fb.group({
    firstName: [''],
    lastName: [''],
    stack: [''],
  });

  searchFormSub: Subscription;

  constructor() {
    this.searchFormSub = this.searchForm.valueChanges
      .pipe(
        startWith({}),
        debounceTime(300),
        switchMap((formValue) => {
          return this.profileService.filterProfiles(formValue);
        }),
        // NOTE 1й вариант - устраняем утечку памяти (Ангуляр 17+)
        // takeUntilDestroyed(), // чистим слушателей при уничтожении компонента
      )
      .subscribe();
  }

  ngOnDestroy() {
    // NOTE 2й вариант - устраняем утечку памяти через хук и дополнительную переменную
    this.searchFormSub.unsubscribe();
  }
}
