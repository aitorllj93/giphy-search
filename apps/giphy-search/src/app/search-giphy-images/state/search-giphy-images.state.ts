import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { patch } from '@ngxs/store/operators';
import { catchError, switchMap } from 'rxjs/operators';
import { SearchGiphyImagesService } from '../services/search-giphy-images.service';
import { SearchGiphyImages } from './search-giphy-images.actions';
import { searchGiphyImagesInitialState } from './search-giphy-images.initial-state';
import { SearchGiphyImagesStateModel, SearchGiphyImagesStateModelState } from './search-giphy-images.state-model';

@State<SearchGiphyImagesStateModel>({
  name: 'searchGiphyImages',
  defaults: JSON.parse(JSON.stringify(searchGiphyImagesInitialState)),
})
@Injectable()
export class SearchGiphyImagesState {
  @Selector([SearchGiphyImagesState])
  static state(searchGiphyImagesState: SearchGiphyImagesStateModel) {
    return searchGiphyImagesState.state;
  }

  @Selector([SearchGiphyImagesState])
  static params(searchGiphyImagesState: SearchGiphyImagesStateModel) {
    return searchGiphyImagesState.searchParams;
  }

  @Selector([SearchGiphyImagesState])
  static result(searchGiphyImagesState: SearchGiphyImagesStateModel) {
    return searchGiphyImagesState.searchResult;
  }

  constructor(private searchGiphyImagesService: SearchGiphyImagesService) {}

  @Action(SearchGiphyImages.SearchSubmitted)
  searchSubmited(
    { setState, getState, dispatch }: StateContext<SearchGiphyImagesStateModel>,
    { payload }: SearchGiphyImages.SearchSubmitted,
  ) {
    setState(
      patch<SearchGiphyImagesStateModel>({
        state: SearchGiphyImagesStateModelState.Searching,
        searchParams: patch<SearchGiphyImagesStateModel['searchParams']>({
          tags: payload,
          offset: 0,
        }),
        searchResult: {
          gifs: [],
          error: undefined,
          totalCount: 0,
        },
      }),
    );

    const { tags, limit, offset } = getState().searchParams;

    return this.searchGiphyImagesService.searchGiphyImagesByTags(tags, { limit, offset }).pipe(
      switchMap((result) => dispatch(new SearchGiphyImages.SearchSucceeded(result))),
      catchError((error) => dispatch(new SearchGiphyImages.SearchFailed(error))),
    );
  }

  @Action(SearchGiphyImages.SearchSucceeded)
  searchSucceeded({ setState }: StateContext<SearchGiphyImagesStateModel>, { payload }: SearchGiphyImages.SearchSucceeded) {
    setState(
      patch<SearchGiphyImagesStateModel>({
        state: SearchGiphyImagesStateModelState.SearchSucceeded,
        searchParams: patch<SearchGiphyImagesStateModel['searchParams']>({
          offset: payload.pagination.offset,
        }),
        searchResult: {
          gifs: payload.data,
          error: undefined,
          totalCount: payload.pagination.total_count,
        },
      }),
    );
  }

  @Action(SearchGiphyImages.SearchFailed)
  searchFailed({ setState }: StateContext<SearchGiphyImagesStateModel>, { payload }: SearchGiphyImages.SearchFailed) {
    setState(
      patch<SearchGiphyImagesStateModel>({
        state: SearchGiphyImagesStateModelState.SearchFailed,
        searchParams: patch<SearchGiphyImagesStateModel['searchParams']>({
          offset: 0,
        }),
        searchResult: {
          gifs: [],
          error: payload,
          totalCount: 0,
        },
      }),
    );
  }
}
