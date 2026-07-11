import {
  Directive,
  EventEmitter,
  HostBinding,
  HostListener,
  Output,
} from '@angular/core';

@Directive({
  selector: '[dragAndDrop]',
})
export class DragAndDropDirective {
  @Output() fileDropped = new EventEmitter<File>();

  @HostBinding('class.drag-over-input')
  isDragOver = false;

  @HostListener('dragover', ['$event'])
  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();

    this.isDragOver = true;
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();

    this.isDragOver = false;
  }

  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();

    this.isDragOver = false;
    this.fileDropped.emit(event.dataTransfer?.files[0]);
  }
}
