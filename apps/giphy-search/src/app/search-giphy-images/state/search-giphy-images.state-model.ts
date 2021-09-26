import { IGif } from '@giphy/js-types';

export interface SearchGiphyImagesStateModel {
  searchParams: SearchGiphyImagesStateModelSearchParams;
  searchResult: SearchGiphyImagesStateModelSearchResult;
  state: SearchGiphyImagesStateModelState;
}

export interface SearchGiphyImagesStateModelSearchParams {
  tags: string[];
  offset: number;
  limit: number;
}

export interface SearchGiphyImagesStateModelSearchResult {
  gifs: IGif[];
  totalCount: number;
  error?: Error;
}

export enum SearchGiphyImagesStateModelState {
  Idle = 'Idle',
  Searching = 'Searching',
  SearchSucceeded = 'SearchSucceeded',
  SearchFailed = 'SearchFailed',
}
