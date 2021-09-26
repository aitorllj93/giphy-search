// An angular component with an input to search giphy images
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Control, FormControl, FormGroup, Validators } from '@ng-stack/forms';

export interface GiphyImagesSearchbarModel {
  tags: string[];
}

// NOTE: We need to create a custom model for the form as the typed form detects Arrays as FormArray but we want tags to be a single FormControl
export interface GiphyImagesSearchbarFormModel {
  tags: Control<string[]>;
}

@Component({
  selector: 'gs-giphy-images-searchbar',
  templateUrl: './giphy-images-searchbar.component.html',
  styleUrls: ['./giphy-images-searchbar.component.scss'],
})
export class GiphyImagesSearchbarComponent {
  @Input() tags?: string[] = [];

  @Output() submitButtonClick = new EventEmitter<GiphyImagesSearchbarModel>();

  form = new FormGroup<GiphyImagesSearchbarFormModel>({
    tags: new FormControl<string[]>([], [Validators.required]),
  });

  onSubmitButtonClick() {
    if (!this.form.valid) {
      throw new Error('Form is invalid');
    }

    this.submitButtonClick.emit(this.form.value);
  }
}
