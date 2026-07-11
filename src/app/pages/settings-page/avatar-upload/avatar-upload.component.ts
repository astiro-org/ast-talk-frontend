import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SvgIconComponent } from '../../../common-ui/svg-icon/svg-icon.component';
import { DragAndDropDirective } from '../../../common-ui/directives/drag-and-drop.directive';

@Component({
  selector: 'app-avatar-upload',
  imports: [SvgIconComponent, DragAndDropDirective, FormsModule],
  templateUrl: './avatar-upload.component.html',
  styleUrl: './avatar-upload.component.scss',
})
export class AvatarUploadComponent {
  preview = signal<string>('/assets/images/avatar-placeholder.png');

  avatar: File | null = null;

  fileBrowserHandler(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    this.processFile(file);
  }

  onFileDropped(file: File) {
    this.processFile(file);
  }

  processFile(file: File | undefined) {
    if (!file || !file.type.match('image')) {
      return;
    }

    const reader = new FileReader();

    reader.onload = (event) => {
      this.preview.set(
        event.target?.result?.toString() ||
          '/assets/images/avatar-placeholder.png',
      );
    };

    reader.readAsDataURL(file);
    this.avatar = file;
  }
}
