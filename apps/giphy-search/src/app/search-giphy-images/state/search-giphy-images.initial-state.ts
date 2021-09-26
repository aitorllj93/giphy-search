import { SearchGiphyImagesStateModel, SearchGiphyImagesStateModelState } from './search-giphy-images.state-model';

export const searchGiphyImagesInitialState: SearchGiphyImagesStateModel = {
  searchParams: {
    tags: [],
    limit: 9,
    offset: 0,
  },
  searchResult: {
    gifs: [],
    totalCount: 0,
    error: undefined,
  },
  state: SearchGiphyImagesStateModelState.Idle,
};
