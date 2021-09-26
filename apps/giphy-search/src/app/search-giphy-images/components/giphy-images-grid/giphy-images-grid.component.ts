import { Component, Input } from '@angular/core';
import { SearchGiphyImagesStateModelSearchResult } from '../../state/search-giphy-images.state-model';

@Component({
  selector: 'gs-giphy-images-grid',
  templateUrl: './giphy-images-grid.component.html',
  styleUrls: ['./giphy-images-grid.component.scss'],
})
export class GiphyImagesGridComponent {
  @Input() result?: SearchGiphyImagesStateModelSearchResult | null;
}
