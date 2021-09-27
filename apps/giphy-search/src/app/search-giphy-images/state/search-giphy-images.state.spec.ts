import { GifsResult } from '@giphy/js-fetch-api';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';
import { NgxsModule, Store } from '@ngxs/store';
import { MockProvider } from 'ng-mocks';
import { of, Subject, throwError } from 'rxjs';
import { SearchGiphyImagesService } from '../services/search-giphy-images.service';
import { SearchGiphyImages } from './search-giphy-images.actions';
import { searchGiphyImagesInitialState } from './search-giphy-images.initial-state';
import { SearchGiphyImagesState } from './search-giphy-images.state';
import { SearchGiphyImagesStateModelState } from './search-giphy-images.state-model';

describe('SearchGiphyImagesState', () => {
  let store: Store;
  let spectator: SpectatorService<SearchGiphyImagesState>;
  let searchGiphyImagesService: SearchGiphyImagesService;

  const createService = createServiceFactory({
    imports: [NgxsModule.forRoot([SearchGiphyImagesState])],
    service: SearchGiphyImagesState,
    providers: [
      MockProvider(SearchGiphyImagesService, {
        searchGiphyImagesByTags: jest.fn(() => new Subject<GifsResult>()),
      }),
    ],
  });

  beforeEach(() => {
    spectator = createService();
    store = spectator.inject(Store);
    searchGiphyImagesService = spectator.inject(SearchGiphyImagesService);
  });

  describe('Given a success GIPHY response', () => {
    const tags = ['text', 'text2'];
    const options = { limit: 9, offset: 0 };
    const gifsResult: GifsResult = {
      data: Array(9).fill({}),
      pagination: {
        count: 9,
        offset: 0,
        total_count: 20,
      },
      meta: {
        msg: '',
        response_id: '',
        status: 200,
      },
    };

    beforeEach(() => {
      searchGiphyImagesService.searchGiphyImagesByTags = jest.fn(() => of(gifsResult));
    });

    describe('When is in initial state', () => {
      it('should return the initial state', () => {
        expect(store.selectSnapshot(SearchGiphyImagesState)).toEqual(searchGiphyImagesInitialState);
      });
    });

    describe('When SearchSubmitted action is dispatched', () => {
      beforeEach(async () => {
        await store.dispatch(new SearchGiphyImages.SearchSubmitted(tags)).toPromise();
      });

      it('Then store should include the results', () => {
        expect(searchGiphyImagesService.searchGiphyImagesByTags).toBeCalledWith(tags, options);

        const state = store.selectSnapshot(SearchGiphyImagesState.state);
        expect(state).toBe(SearchGiphyImagesStateModelState.SearchSucceeded);

        const paramsState = store.selectSnapshot(SearchGiphyImagesState.params);
        expect(paramsState.tags).toEqual(tags);
        expect(paramsState.limit).toBe(options.limit);
        expect(paramsState.offset).toEqual(gifsResult.pagination.offset);

        const resultState = store.selectSnapshot(SearchGiphyImagesState.result);
        expect(resultState.gifs).toEqual(gifsResult.data);
        expect(resultState.error).toBeUndefined();
        expect(resultState.totalCount).toEqual(gifsResult.pagination.total_count);
      });

      describe('And PaginationNextButtonClicked action is dispatched', () => {
        const nextGifsResult: GifsResult = {
          ...gifsResult,
          pagination: {
            ...gifsResult.pagination,
            offset: gifsResult.pagination.offset + gifsResult.pagination.count,
          },
        };

        beforeEach(async () => {
          searchGiphyImagesService.searchGiphyImagesByTags = jest.fn(() => of(nextGifsResult));
          await store.dispatch(new SearchGiphyImages.PaginationNextButtonClicked()).toPromise();
        });

        it('Then store should include the results', () => {
          expect(searchGiphyImagesService.searchGiphyImagesByTags).toBeCalledWith(tags, {
            limit: options.limit,
            offset: nextGifsResult.pagination.offset,
          });

          const state = store.selectSnapshot(SearchGiphyImagesState.state);
          expect(state).toBe(SearchGiphyImagesStateModelState.SearchSucceeded);

          const paramsState = store.selectSnapshot(SearchGiphyImagesState.params);
          expect(paramsState.tags).toEqual(tags);
          expect(paramsState.limit).toBe(options.limit);
          expect(paramsState.offset).toEqual(nextGifsResult.pagination.offset);

          const resultState = store.selectSnapshot(SearchGiphyImagesState.result);
          expect(resultState.gifs).toEqual(nextGifsResult.data);
          expect(resultState.error).toBeUndefined();
          expect(resultState.totalCount).toEqual(nextGifsResult.pagination.total_count);
        });

        describe('And PaginationPreviousButtonClicked action is dispatched', () => {
          const previousGifsResult: GifsResult = {
            ...nextGifsResult,
            pagination: {
              ...nextGifsResult.pagination,
              offset: nextGifsResult.pagination.offset - nextGifsResult.pagination.count,
            },
          };

          beforeEach(async () => {
            searchGiphyImagesService.searchGiphyImagesByTags = jest.fn(() => of(previousGifsResult));
            await store.dispatch(new SearchGiphyImages.PaginationPreviousButtonClicked()).toPromise();
          });

          it('Then store should include the results', () => {
            expect(searchGiphyImagesService.searchGiphyImagesByTags).toBeCalledWith(tags, {
              limit: options.limit,
              offset: previousGifsResult.pagination.offset,
            });

            const state = store.selectSnapshot(SearchGiphyImagesState.state);
            expect(state).toBe(SearchGiphyImagesStateModelState.SearchSucceeded);

            const paramsState = store.selectSnapshot(SearchGiphyImagesState.params);
            expect(paramsState.tags).toEqual(tags);
            expect(paramsState.limit).toBe(options.limit);
            expect(paramsState.offset).toEqual(previousGifsResult.pagination.offset);

            const resultState = store.selectSnapshot(SearchGiphyImagesState.result);
            expect(resultState.gifs).toEqual(previousGifsResult.data);
            expect(resultState.error).toBeUndefined();
            expect(resultState.totalCount).toEqual(previousGifsResult.pagination.total_count);
          });
        });
      });
    });
  });

  describe('Given an error GIPHY response', () => {
    const tags = ['text', 'text2'];
    const options = { limit: 9, offset: 0 };
    const gifsResult = new Error('Error fetching API');

    beforeEach(() => {
      searchGiphyImagesService.searchGiphyImagesByTags = jest.fn(() => throwError(gifsResult));
    });

    describe('When is in initial state', () => {
      it('should return the initial state', () => {
        expect(store.selectSnapshot(SearchGiphyImagesState)).toEqual(searchGiphyImagesInitialState);
      });
    });

    describe('When SearchSubmitted action is dispatched', () => {
      beforeEach(async () => {
        await store.dispatch(new SearchGiphyImages.SearchSubmitted(tags)).toPromise();
      });

      it('Then store should include the error', () => {
        expect(searchGiphyImagesService.searchGiphyImagesByTags).toBeCalledWith(tags, options);

        const state = store.selectSnapshot(SearchGiphyImagesState.state);
        expect(state).toBe(SearchGiphyImagesStateModelState.SearchFailed);

        const paramsState = store.selectSnapshot(SearchGiphyImagesState.params);
        expect(paramsState.tags).toEqual(tags);
        expect(paramsState.limit).toBe(options.limit);
        expect(paramsState.offset).toBe(0);

        const resultState = store.selectSnapshot(SearchGiphyImagesState.result);
        expect(resultState.error).toEqual(gifsResult);
        expect(resultState.totalCount).toBe(0);
      });
    });
  });

  // #endregion actions
});
