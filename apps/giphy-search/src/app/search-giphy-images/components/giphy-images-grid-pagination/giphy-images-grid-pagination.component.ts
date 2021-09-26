import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  SearchGiphyImagesStateModelSearchParams,
  SearchGiphyImagesStateModelSearchResult,
} from '../../state/search-giphy-images.state-model';

@Component({
  selector: 'gs-giphy-images-grid-pagination',
  templateUrl: './giphy-images-grid-pagination.component.html',
  styleUrls: ['./giphy-images-grid-pagination.component.scss'],
})
export class GiphyImagesGridPaginationComponent {
  @Input() params?: SearchGiphyImagesStateModelSearchParams | null;
  @Input() result?: SearchGiphyImagesStateModelSearchResult | null;

  @Output() previousButtonClick = new EventEmitter<void>();
  @Output() nextButtonClick = new EventEmitter<void>();

  onPreviousButtonClick() {
    this.previousButtonClick.emit();
  }

  onNextButtonClick() {
    this.nextButtonClick.emit();
  }
}
