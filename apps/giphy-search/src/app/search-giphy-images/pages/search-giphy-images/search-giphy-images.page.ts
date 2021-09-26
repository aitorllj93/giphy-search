import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { SearchGiphyImages } from '../../state/search-giphy-images.actions';
import { SearchGiphyImagesState } from '../../state/search-giphy-images.state';
import {
  SearchGiphyImagesStateModelSearchParams,
  SearchGiphyImagesStateModelSearchResult,
  SearchGiphyImagesStateModelState,
} from '../../state/search-giphy-images.state-model';

@Component({
  selector: 'gs-search-giphy-images',
  templateUrl: './search-giphy-images.page.html',
  styleUrls: ['./search-giphy-images.page.scss'],
})
export class SearchGiphyImagesPage {
  @Select(SearchGiphyImagesState.state) readonly state$!: Observable<SearchGiphyImagesStateModelState>;
  @Select(SearchGiphyImagesState.params) readonly params$!: Observable<SearchGiphyImagesStateModelSearchParams>;
  @Select(SearchGiphyImagesState.result) readonly result$!: Observable<SearchGiphyImagesStateModelSearchResult>;

  readonly states = SearchGiphyImagesStateModelState;

  constructor(private store: Store) {}

  onSearchSubmit({ tags }: { tags: string[] }) {
    this.store.dispatch(new SearchGiphyImages.SearchSubmitted(tags));
  }

  onPaginationNextButtonClick() {
    this.store.dispatch(new SearchGiphyImages.PaginationNextButtonClicked());
  }

  onPaginationPreviousButtonClick() {
    this.store.dispatch(new SearchGiphyImages.PaginationPreviousButtonClicked());
  }
}
