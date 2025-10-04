import { Component, effect, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProfileService } from '../../services/profile/profile.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-settings-page',
  imports: [ReactiveFormsModule],
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.scss',
})
export class SettingsPageComponent {
  fb = inject(FormBuilder);
  profileService = inject(ProfileService);

  form = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    username: [
      {
        value: '',
        disabled: true,
      },
      Validators.required,
    ],
    description: [''],
    stack: [''],
  });

  constructor() {
    effect(() => {
      this.form.patchValue({
        ...this.profileService.me(),
        // @ts-ignore TODO
        stack: this.mergeStack(this.profileService.me()?.stack),
      });
    });
  }

  onSave() {
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();

    if (this.form.invalid) return;

    firstValueFrom(
      // @ts-ignore TODO
      this.profileService.patchProfile({
        ...this.form.value,
        // @ts-ignore
        stack: this.splitStack(this.form.value.stack),
      })
    );
  }

  splitStack(stack: string | null | string[]): string[] {
    if (Array.isArray(stack)) return stack;
    if (!stack) return [];
    return stack.split(',');
  }

  mergeStack(stack: string | null | string[]): string {
    if (!stack) return '';
    if (Array.isArray(stack)) return stack.join(',');
    return stack;
  }
}
